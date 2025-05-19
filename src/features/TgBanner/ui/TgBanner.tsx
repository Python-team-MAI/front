import Image from "next/image";
import Link from "next/link";
import React from "react";

export const TgBanner = () => {
  return (
    <Link target="_blank" href={'https://t.me/rutaskmanager_bot'}>
        <Image
        src="/images/banner.png"
        alt="Картинка баннера"
        width={1200}
        height={675}
        className="w-full rounded-3xl"
        />
    </Link>
  );
};
