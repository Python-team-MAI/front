import { Dispatch, FC, SetStateAction, useState } from "react";
import { Text } from "@react-three/drei";
import { Office } from "../../model/types/pathTypes";
import { getContrastingColor } from "@/shared/lib/colors/getContrastingColor";
import { Euler } from "three";
import { ThreeIcon } from "@/shared/ui/ThreeIcon";
import { lightenHexColor } from "@/shared/lib/colors/lightenHexColor";
import { ModalData } from "../Map";

interface Props {
	offices: Office[];
	mode: "2d" | "3d";
	setModalData: Dispatch<SetStateAction<ModalData>>;
}

export const OfficeDrawer: FC<Props> = ({ offices, mode, setModalData }) => {
	const [targetMesh, setTargetMesh] = useState<number>();

	return offices.map((office, i) => (
		<mesh
			key={JSON.stringify(office.name + i)}
			position={
				mode === "3d"
					? [office.coords[0], office.coords[1] + office.width / 2, office.coords[2]]
					: [office.coords[0], 0, office.coords[2]]
			}
			castShadow
			onClick={() => setModalData({ isOpen: true, office_id: office.id })}
			onPointerOut={() => setTargetMesh(undefined)}
			onPointerOver={() => setTargetMesh(i)}
		>
			{office.type === "stairs" && (
				<ThreeIcon
					icon={"/icons/stairs-fill.svg"}
					position={mode === "3d" ? [-0.24, office.coords[1] + office.width / 2 + 0.1, -0.24] : [-0.24, 0.1, -0.24]}
					color={getContrastingColor(office.color)}
					scale={0.02}
					rotation={new Euler(-Math.PI / 2, 0, 0)}
				/>
			)}
			{office.type === "elevator" && (
				<ThreeIcon
					icon={"/icons/elevator.svg"}
					position={mode === "3d" ? [-0.175, office.coords[1] + office.width / 2 + 0.1, -0.175] : [-0.175, 0.1, -0.175]}
					color={getContrastingColor(office.color)}
					scale={0.0007}
					rotation={new Euler(-Math.PI / 2, 0, 0)}
				/>
			)}

			{office.type !== "stairs" && office.type !== "elevator" && (
				<Text
					position={mode === "3d" ? [0, office.coords[1] + office.width / 2 + 0.1, 0] : [0, 0.1, 0]}
					fontSize={0.2}
					color={getContrastingColor(office.color)}
					rotation={new Euler(-Math.PI / 2, 0, 0)}
					anchorX="center"
					anchorY="middle"
				>
					{office.name}
				</Text>
			)}
			<boxGeometry
				args={mode === "3d" ? [office.length, office.width, office.height] : [office.length, 0, office.height]}
			/>
			<meshStandardMaterial color={i == targetMesh ? lightenHexColor(office.color, 70) : office.color} />
		</mesh>
	));
};
