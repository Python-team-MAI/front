"use client";

import { Canvas } from "@react-three/fiber";
import React, { FC } from "react";
import { MapControls } from "@react-three/drei";
import { INode, Office } from "../model/types/pathTypes";
import { PathDrawer } from "./drawers/PathDrawer";
import { OfficeDrawer } from "./drawers/OfficeDrawer";

interface Props {
	mode: "2d" | "3d";
	offices: Office[];
	nodes: INode[];
	path?: string[];
}

export const Map: FC<Props> = ({ mode, nodes, offices, path }) => {
	return (
		<Canvas camera={{ fov: 45, position: [0, 15, 0] }} shadows>
			<OfficeDrawer mode={mode} offices={offices} />
			{path && <PathDrawer mode={mode} path={path} nodes={nodes} />}
			{mode === "2d" ? (
				<ambientLight intensity={Math.PI / 2} />
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
