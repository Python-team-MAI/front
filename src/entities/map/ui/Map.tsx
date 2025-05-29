"use client";

import { Canvas } from "@react-three/fiber";
import React, { Dispatch, FC, SetStateAction } from "react";
import { MapControls } from "@react-three/drei";
import { INode, Office } from "../model/types/pathTypes";
import { PathDrawer } from "./drawers/PathDrawer";
import { OfficeDrawer } from "./drawers/OfficeDrawer";

export type ModalData = {
	isOpen: boolean;
	office_id: number;
	office?: Office;
};

interface Props {
	mode: "2d" | "3d";
	offices: Office[];
	nodes: INode[];
	path?: string[];
	setModalData: Dispatch<SetStateAction<ModalData>>;
}

export const Map: FC<Props> = ({ mode, nodes, offices, path, setModalData }) => {
	return (
		<Canvas camera={{ fov: 60 }} shadows>
			<OfficeDrawer setModalData={setModalData} mode={mode} offices={offices} />
			{path && <PathDrawer mode={mode} path={path} nodes={nodes} />}
			{mode === "2d" ? (
				<ambientLight intensity={1.5} />
			) : (
				<>
					<directionalLight color={"#fff"} castShadow intensity={2} position={[-1, -1, -1]} />
					<directionalLight color={"#fff"} castShadow intensity={4} position={[1, 1, 1]} />
				</>
			)}
			<MapControls enableDamping dampingFactor={0.05} maxZoom={1} maxPolarAngle={mode === "2d" ? 0 : Math.PI / 6} />
		</Canvas>
	);
};

export default Map;
