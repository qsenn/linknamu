"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type Counts = Record<string, number>;

export default function LinkList({ links }: { links: LinkItem[] }) {
  // 받기 전에는 비어 있어서 모든 카드가 0회로 표시됨
  const [counts, setCounts] = useState<Counts>({});

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/clicks", { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: Counts) => setCounts(data))
      .catch(() => {}); // 실패하면 0회 그대로 둠
    return () => controller.abort();
  }, []);

  function setCount(id: string, update: (count: number) => number) {
    setCounts((prev) => ({ ...prev, [id]: update(prev[id] ?? 0) }));
  }

  function handleClick(id: string) {
    // 화면에는 바로 +1 하고, 서버 응답이 오면 실제 값으로 맞춤
    setCount(id, (count) => count + 1);
    fetch(`/api/clicks/${id}`, { method: "POST", keepalive: true })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { count: number }) => setCount(id, () => data.count))
      .catch(() => setCount(id, (count) => Math.max(0, count - 1)));
  }

  return (
    <ul className="mt-12 flex flex-col gap-4 sm:gap-5">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            {...link}
            count={counts[link.id] ?? 0}
            onClick={() => handleClick(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}
