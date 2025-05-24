"use client";
import React, { useState } from "react";
import testMap1 from "@/public/maps/test_map_1.json";
import testMap2 from "@/public/maps/test_map_2.json";
import vertConnections from "@/public/maps/all_vertical_connections.json";
import { Button } from "@heroui/button";
import { PathForm } from "./PathForm";
import { DynamicMap, IBuildingGraph, INode, IVerticalConnection, NavigationSystem, Office } from "@/entities/map";

export const UniversityMap = () => {
	const [floor, setFloor] = useState<number>(1);
	const [mode, setMode] = useState<"2d" | "3d">("2d");
	const { offices: offices1, nodes: nodes1 } = testMap1 as unknown as { offices: Office[]; nodes: INode[] };
	const { offices: offices2, nodes: nodes2 } = testMap2 as unknown as { offices: Office[]; nodes: INode[] };
	const officesMapper = { 1: offices1, 2: offices2 };
	const nodesMapper = { 1: nodes1, 2: nodes2 };

	const [instructions, setInstructions] = useState<string[]>();
	const [path, setPath] = useState<string[]>();

	const findPath = async (fromId: string, toId: string) => {
		const buildingGraph: IBuildingGraph = {
			floors: [
				{
					floor: 1,
					nodes: nodes1,
				},
				{
					floor: 2,
					nodes: nodes2,
				},
			],
			verticalConnections: vertConnections as IVerticalConnection[],
		};
		try {
			const navSystem = new NavigationSystem(buildingGraph);
			const path = await navSystem.findPath(fromId, toId);
			setPath(path);
			const instructions = navSystem.generateInstructions(path);
			setInstructions(instructions);
		} catch (error) {
			console.error("Ошибка навигации:", error instanceof Error ? error.message : error);
		}
	};

	return (
		<div className="">
			<div className="relative h-[80vh] max-md:h-[70vh]">
				{officesMapper[floor as 1 | 2] && (
					<DynamicMap
						offices={officesMapper[floor as 1 | 2]}
						mode={mode}
						path={path}
						nodes={nodesMapper[floor as 1 | 2]}
					/>
				)}
				<Button onPress={() => setMode(mode === "2d" ? "3d" : "2d")} className="absolute right-4 top-4 rounded-full">
					{mode === "2d" ? "2D" : "3D"}
				</Button>
			</div>
			<div className="p-2">
				<div className="flex max-md:grid max-md:grid-cols-4 mb-3 gap-1 items-center justify-evenly">
					{[1, 2, 3, 4, 5, 6, 7].map((num) => (
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
					{instructions?.map((instr, i) => (
						<p key={i}>{instr}</p>
					))}
				</div>
			</div>
		</div>
	);
};
