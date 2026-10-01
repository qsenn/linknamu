import Image from "next/image";
import type { Profile } from "@/data/profile";

export default function ProfileHeader({ name, bio, image }: Profile) {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="rounded-full bg-white/60 p-1 shadow-[0_2px_4px_rgb(var(--shadow)/0.06),0_16px_40px_-12px_rgb(var(--shadow)/0.35)] ring-1 ring-white/80 dark:bg-white/10 dark:ring-white/10">
        <Image
          src={image}
          alt={`${name} 프로필 사진`}
          width={128}
          height={128}
          priority
          className="size-28 rounded-full bg-white object-cover sm:size-32"
        />
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-tight sm:text-[1.75rem]">
        {name}
      </h1>
      <p className="mt-2 max-w-xs text-[0.9375rem] leading-relaxed break-keep text-muted">
        {bio}
      </p>
    </header>
  );
}
