import type { LinkItem } from "@/data/profile";

export default function LinkCard({ title, url }: LinkItem) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full rounded-2xl border border-zinc-300 bg-white px-5 py-5 text-center text-lg font-medium shadow-md transition hover:-translate-y-0.5 hover:border-zinc-900 hover:shadow-lg active:translate-y-0 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-200"
    >
      {title}
    </a>
  );
}
