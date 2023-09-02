"use client";
import Image from "next/image";

type AvatarProps = {
  src: string | null | undefined;
  size?: number;
};

export default function Avatar({ src, size }: AvatarProps) {
  return (
    <Image
      alt="Avatar"
      className="rounded-full"
      height={size || "30"}
      width={size || "30"}
      src={!src ? `/images/placeholder.jpg` : src}
    />
  );
}
