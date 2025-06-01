"use client";
import { Modal, ModalContent, useDisclosure } from "@heroui/react";
import React from "react";
import { Bot } from "lucide-react";
import { AssistantWidget } from "./AssistantWidget";
import { usePathname } from "@/navigation";
import { notAuthRoutes } from "@/middleware";

export const AssistantButton = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const pathname = usePathname();

	if (notAuthRoutes.includes(pathname)) {
		return null;
	}

	return (
		<>
			<Modal placement="center" onOpenChange={onOpenChange} isOpen={isOpen}>
				<ModalContent className="max-w-[80vw] h-[80vh]">
					<AssistantWidget />
				</ModalContent>
			</Modal>
			<div
				onClick={onOpen}
				className="fixed z-[49] right-5 bottom-5 flex justify-center items-center w-12 cursor-pointer h-12 rounded-full bg-blue-400"
			>
				<Bot size={32} />
			</div>
		</>
	);
};
