"use client";
import React, { FC, useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { PathForm } from "./PathForm";
import { DynamicMap, IBuildingGraph, INode, IVerticalConnection, NavigationSystem, Office } from "@/entities/map";
import { Modal, ModalContent, ModalBody, ModalHeader, useDisclosure } from "@heroui/modal";
import { ModalData } from "@/entities/map/ui/Map";
import { ChatRoom } from "@/entities/chat/ui/ChatRoom";

interface UniversityMapProps {
	map3: {
		offices: Office[];
		nodes: INode[];
	};
	map4: {
		offices: Office[];
		nodes: INode[];
	};
	verticals: IVerticalConnection[];
	initFloor: Floors;
}

export type Floors = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const UniversityMap: FC<UniversityMapProps> = ({ map3, map4, verticals, initFloor }) => {
	const [floor, setFloor] = useState<Floors>(initFloor);
	const [mode, setMode] = useState<"2d" | "3d">("2d");
	const { offices: offices3, nodes: nodes3 } = map3 as unknown as { offices: Office[]; nodes: INode[] };
	const { offices: offices4, nodes: nodes4 } = map4 as unknown as { offices: Office[]; nodes: INode[] };
	const officesMapper: Record<Floors, Office[]> = {
		1: offices3,
		2: offices3,
		3: offices3,
		4: offices4,
		5: offices4,
		6: offices4,
		7: offices4,
	};
	const nodesMapper: Record<Floors, INode[]> = {
		1: nodes3.map((node) => ({ ...node, floor: 1 })),
		2: nodes3.map((node) => ({ ...node, floor: 2 })),
		3: nodes3,
		4: nodes4,
		5: nodes4.map((node) => ({ ...node, floor: 5 })),
		6: nodes4.map((node) => ({ ...node, floor: 6 })),
		7: nodes4.map((node) => ({ ...node, floor: 7 })),
	};

	const [path, setPath] = useState<string[]>();
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

	const [modalData, setModalData] = useState<ModalData>({ isOpen: false, office_id: 0 });

	useEffect(() => {
		if (modalData.isOpen) {
			onOpen();
		} else {
			onClose();
		}
	}, [modalData, onOpen, onClose]);

	const findPath = async (fromId: string, toId: string) => {
		const buildingGraph: IBuildingGraph = {
			floors: Object.entries(nodesMapper).map(([floor, nodes]) => ({ floor: Number(floor), nodes })),
			verticalConnections: verticals,
		};

		try {
			const navSystem = new NavigationSystem(buildingGraph);
			const path = await navSystem.findPath(fromId, toId);
			setPath(path);
		} catch (error) {
			console.error("Ошибка навигации:", error instanceof Error ? error.message : error);
		}
	};

	return (
		<>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent className="min-w-[80vw]">
					{() => (
						<div >
							<ModalHeader className="flex flex-col gap-1">Чат Аудитории {modalData.office?.name}</ModalHeader>

							<ModalBody>
								<ChatRoom chatId={modalData.office?.chat?.id} office={modalData.office} />
							</ModalBody>
						</div>
					)}
				</ModalContent>
			</Modal>
			<div className="grid grid-cols-[3fr_2fr] max-md:grid-cols-1">
				<div className="relative h-[80vh] max-md:h-[70vh]">
					{officesMapper[floor] && (
						<DynamicMap
							offices={officesMapper[floor]}
							mode={mode}
							path={path}
							nodes={nodesMapper[floor]}
							setModalData={setModalData}
						/>
					)}
					<Button onPress={() => setMode(mode === "2d" ? "3d" : "2d")} className="absolute right-4 top-4 rounded-full">
						{mode === "2d" ? "2D" : "3D"}
					</Button>
				</div>
				<div className="p-2">
					<div className="flex max-md:grid max-md:grid-cols-4 mb-3 gap-1 items-center justify-evenly">
						{([1, 2, 3, 4, 5, 6, 7] as Floors[]).map((num) => (
							<Button
								variant={num === floor ? "faded" : "bordered"}
								className="rounded-full"
								key={num}
								onPress={() => setFloor(num)}
							>
								{num}
							</Button>
						))}
					</div>
					<div className="flex flex-col gap-3">
						<PathForm findPath={findPath} nodeMapper={nodesMapper} />
					</div>
				</div>
			</div>
		</>
	);
};
