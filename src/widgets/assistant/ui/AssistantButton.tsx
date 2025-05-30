"use client";
import { Modal, ModalContent, useDisclosure } from "@heroui/react";
import React from "react";
import { Bot } from "lucide-react";
import { AssistantWidget } from "./AssistantWidget";

export const AssistantButton = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<Modal onOpenChange={onOpenChange} isOpen={isOpen}>
				<ModalContent className="max-w-[80vw] h-[70vh]">
					<AssistantWidget />
				</ModalContent>
			</Modal>
			<div
				onClick={onOpen}
				className="sticky flex justify-center items-center left-5 bottom-5 w-16 cursor-pointer h-16 rounded-full bg-blue-400"
			>
				<Bot size={40} />
			</div>
		</>
	);
};
