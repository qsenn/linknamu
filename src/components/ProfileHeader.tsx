import Image from "next/image";
import type { Profile } from "@/data/profile";

export default function ProfileHeader({ name, bio, image }: Profile) {
  return (
    <header className="flex flex-col items-center text-center">
      <Image
        src={image}
        alt={`${name} 프로필 사진`}
        width={208}
        height={208}
        priority
        className="size-40 rounded-full border border-zinc-200 object-cover sm:size-52 dark:border-zinc-800"
      />
      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
        {name}
      </h1>
      <p className="mt-2 text-base text-zinc-500 dark:text-zinc-400">{bio}</p>
    </header>
  );
}
