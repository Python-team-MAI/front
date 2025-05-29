import { IBuildingGraph, INode, IVerticalConnection } from "../types/pathTypes";

type GraphNode = INode & { edges: Map<string, number> };
type Graph = Map<string, GraphNode>;

export class NavigationSystem {
	graph: Graph = new Map();
	private verticalConnections: IVerticalConnection[] = [];

	constructor(buildingData: IBuildingGraph) {
		this.buildGraph(buildingData);

		this.graph.forEach((node, id) => {
			if (!node.connections && !this.isVerticalNode(id)) {
				console.warn(`Node ${id} has no connections`);
			}
		});
	}

	private isVerticalNode(id: string): boolean {
		return this.verticalConnections.some((conn) => conn.nodes.includes(id));
	}

	private buildGraph(data: IBuildingGraph): void {
		data.floors.forEach((floor) => {
			floor.nodes.forEach((node) => {
				this.graph.set(node.pid_name, {
					...node,
					edges: new Map(),
				});
			});
		});

		data.floors.forEach((floor) => {
			floor.nodes.forEach((node) => {
				node.connections?.forEach((connId) => {
					const targetNode = this.graph.get(connId);

					if (targetNode && targetNode.floor === node.floor) {
						const distance = this.calculateDistance(node.pid_name, connId);
						this.graph.get(node.pid_name)?.edges.set(connId, distance);
					} else {
						console.warn(`Invalid horizontal connection from ${node.pid_name} to ${connId}`);
					}
				});
			});
		});

		data.verticalConnections.forEach((conn) => {
			conn.nodes.forEach((nodeId, index) => {
				if (index > 0) {
					const prevNodeId = conn.nodes[index - 1];
					this.addVerticalConnection(prevNodeId, nodeId, conn.weight);
					this.addVerticalConnection(nodeId, prevNodeId, conn.weight);
				}
			});
		});
	}

	private addVerticalConnection(fromId: string, toId: string, weight: number): void {
		const fromNode = this.graph.get(fromId);
		const toNode = this.graph.get(toId);

		if (fromNode && toNode) {
			fromNode.edges.set(toId, weight);
			toNode.edges.set(fromId, weight);
		}
	}

	private calculateDistance(fromId: string, toId: string): number {
		const from = this.graph.get(fromId);
		const to = this.graph.get(toId);

		if (!from || !to) {
			throw new Error(`Node not found: ${fromId} -> ${toId}`);
		}

		return Math.hypot(to.x - from.x, to.y - from.y);
	}

	public async findPath(startId: string, endId: string): Promise<string[]> {
		const start = this.graph.get(startId);
		const end = this.graph.get(endId);
		if (!start || !end) throw new Error("Invalid start or end node");

		const openSet = new Set<string>([startId]);
		const cameFrom = new Map<string, string>();
		const gScore = new Map<string, number>([[startId, 0]]);
		const fScore = new Map<string, number>([[startId, this.heuristic(start, end)]]);

		let iterations = 0;
		const maxIterations = 1000;

		while (openSet.size > 0 && iterations++ < maxIterations) {
			const currentId = this.getLowestFScore(openSet, fScore);

			if (currentId === endId) {
				return this.reconstructPath(cameFrom, currentId);
			}

			openSet.delete(currentId);
			const currentNode = this.graph.get(currentId)!;

			for (const [neighborId, weight] of currentNode.edges) {
				const tentativeGScore = (gScore.get(currentId) ?? Infinity) + weight;

				if (tentativeGScore < (gScore.get(neighborId) ?? Infinity)) {
					cameFrom.set(neighborId, currentId);
					gScore.set(neighborId, tentativeGScore);
					fScore.set(neighborId, tentativeGScore + this.heuristic(this.graph.get(neighborId)!, end));

					if (!openSet.has(neighborId)) {
						openSet.add(neighborId);
					}
				}
			}
		}

		throw new Error(`Path not found after ${iterations} iterations`);
	}

	private getLowestFScore(openSet: Set<string>, fScore: Map<string, number>): string {
		let minScore = Infinity;
		let minNode = "";

		openSet.forEach((id) => {
			const score = fScore.get(id) ?? Infinity;
			if (score < minScore) {
				minScore = score;
				minNode = id;
			}
		});

		if (minNode === "") {
			throw new Error("No nodes in openSet");
		}

		return minNode;
	}

	private heuristic(a: GraphNode, b: GraphNode): number {
		const dx = a.x - b.x;
		const dy = a.y - b.y;
		const dz = (a.floor - b.floor) * 1000;
		return Math.sqrt(dx * dx + dy * dy) + Math.abs(dz);
	}

	private reconstructPath(cameFrom: Map<string, string>, currentId: string): string[] {
		const path = [currentId];
		while (cameFrom.has(currentId)) {
			currentId = cameFrom.get(currentId)!;
			path.unshift(currentId);
		}
		return path;
	}

	public generateInstructions(path: string[]): string[] {
		const instructions: string[] = [];
		let previousDirection: string | null = null;

		for (let i = 0; i < path.length; i++) {
			const currentNode = this.graph.get(path[i])!;
			const nextNode = this.graph.get(path[i + 1]);

			if (!nextNode) {
				instructions.push(`Вы прибыли в ${currentNode.name || "пункт назначения"}`);
				break;
			}

			if (currentNode.floor !== nextNode.floor) {
				const connection = this.verticalConnections.find(
					(conn) => conn.nodes.includes(currentNode.pid_name) && conn.nodes.includes(nextNode.pid_name)
				);

				const action =
					connection?.type === "elevator"
						? `Возьмите лифт ${connection.name} на ${nextNode.floor} этаж`
						: `Поднимитесь по лестнице ${connection?.name || ""} на ${nextNode.floor} этаж`;

				instructions.push(action);
				previousDirection = null;
				continue;
			}

			const direction = this.calculateDirection(currentNode, nextNode);

			if (!previousDirection) {
				instructions.push(`Начните движение ${direction} от ${currentNode.name || "текущей позиции"}`);
			} else if (direction !== previousDirection) {
				instructions.push(`Поверните ${this.getTurn(previousDirection, direction)}`);
			}

			if (i % 3 === 0 && currentNode.landmarks?.length) {
				instructions.push(`Ориентир: ${currentNode.landmarks.join(", ")}`);
			}

			previousDirection = direction;
		}

		return instructions;
	}

	private calculateDirection(from: INode, to: INode): string {
		const dx = to.x - from.x;
		const dy = to.y - from.y;
		const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

		if (angle >= -45 && angle < 45) return "прямо";
		if (angle >= 45 && angle < 135) return "направо";
		if (angle >= -135 && angle < -45) return "налево";
		return "назад";
	}

	private getTurn(from: string, to: string): string {
		const turns: Record<string, string> = {
			"прямо->направо": "направо",
			"прямо->налево": "налево",
			"направо->прямо": "налево",
			"налево->прямо": "направо",
		};
		return turns[`${from}->${to}`] || "в указанном направлении";
	}
}
