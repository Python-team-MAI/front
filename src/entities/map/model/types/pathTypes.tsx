import { ChatRead } from "@/entities/chat/model/types/message";

export interface Office {
	id: number;
	length: number;
	width: number;
	height: number;
	coords: [number, number, number];
	color: string;
	name: string;
	floor: number;
	type?: NodeType;
	desc: string;
	chat?: ChatRead;
}

export type NodeType = "room" | "corridor" | "elevator" | "stairs" | "entrance";

export interface INode {
	// id: number;
	pid_name: string;
	type: NodeType;
	x: number;
	y: number;
	z: number;
	floor: number;
	name?: string;
	landmarks?: string[];
	connections?: string[];
}

export interface IVerticalConnection {
	type: "elevator" | "stairs";
	name: string;
	nodes: string[];
	weight: number;
}

export interface IFloor {
	floor: number;
	nodes: INode[];
}

export interface IBuildingGraph {
	floors: IFloor[];
	verticalConnections: IVerticalConnection[];
}
