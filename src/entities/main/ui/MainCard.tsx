import { Card, CardFooter } from "@heroui/card";
import Image from "next/image";
import React from "react";
import { CardProps } from "../model/types/CardProps";


export const MainCard = ({src, alt, text}: CardProps) => {
  return (
    <Card className="flex flex-col items-center cursor-pointer">
      <Image
        className="max-md:w-24"
        unoptimized
        alt={alt}
        src={src}
        width={150}
        height={150}
      />
      <CardFooter className="flex justify-center">{text}</CardFooter>
    </Card>
  );
};
