import type { LinkItem } from "@/data/profile";

type LinkCardProps = LinkItem & {
  count: number;
  onClick: () => void;
};

export default function LinkCard({ title, url, count, onClick }: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="relative block w-full rounded-2xl border border-card-border bg-card px-16 py-4 text-center text-base font-medium tracking-tight shadow-[0_1px_2px_rgb(var(--shadow)/0.05),0_8px_24px_-14px_rgb(var(--shadow)/0.25)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-card-hover hover:shadow-[0_1px_2px_rgb(var(--shadow)/0.06),0_12px_28px_-14px_rgb(var(--shadow)/0.32)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/40 active:translate-y-0 active:scale-[0.99] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:py-[1.125rem]"
    >
      {title}
      <span className="absolute top-1/2 right-5 -translate-y-1/2 text-xs font-normal text-muted tabular-nums">
        {count.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
