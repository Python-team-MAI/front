import { Card, CardFooter } from "@heroui/card";
import Image from "next/image";
import React from "react";
import { CardProps } from "../model/types/CardProps";
import Link from "next/link";

export const MainCard = ({ src, alt, text, href }: CardProps) => {
	return (
		<Link href={href} target="_blank">
			<Card className="flex flex-col items-center cursor-pointer">
				<Image className="max-md:w-24" unoptimized alt={alt} src={src} width={150} height={150} />
				<CardFooter className="flex justify-center">{text}</CardFooter>
			</Card>
		</Link>
	);
};
