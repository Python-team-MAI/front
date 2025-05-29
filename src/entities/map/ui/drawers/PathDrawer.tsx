import { Line } from "@react-three/drei";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { INode } from "../../model/types/pathTypes";

interface Props {
	path: string[];
	nodes: INode[];
	mode: "2d" | "3d";
}

export const PathDrawer: FC<Props> = ({ path, nodes, mode }) => {
	const [progress, setProgress] = useState(0);
	const progressRef = useRef(0);
	const [animating, setAnimating] = useState(false);

	const routePoints = useMemo(() => {
		const points: THREE.Vector3[] = [];
		path.forEach((nodeId) => {
			const node = nodes.find((n) => n.pid_name === nodeId);
			if (node && Number.isFinite(node.x) && Number.isFinite(node.z)) {
				const y = mode === "2d" ? 0.1 : 1.1;
				points.push(new THREE.Vector3(node.x, y, node.z));
			}
		});
		return points;
	}, [path, nodes, mode]);

	const curve = useMemo(() => {
		if (routePoints.length >= 2) {
			const curve = new THREE.CatmullRomCurve3(routePoints);
			curve.curveType = "centripetal";
			return curve;
		}
		return null;
	}, [routePoints]);

	const smoothPoints = useMemo(() => {
		return curve ? curve.getPoints(Math.max(200, routePoints.length * 40)) : [];
	}, [curve, routePoints.length]);

	useEffect(() => {
		if (smoothPoints.length >= 2) {
			setAnimating(true);
			progressRef.current = 0;
			setProgress(0);
		}
	}, [smoothPoints.length]);

	useFrame((_, delta) => {
		if (animating && progressRef.current < 1) {
			progressRef.current = Math.min(progressRef.current + delta * 0.4, 1);
			setProgress(progressRef.current);
			if (progressRef.current >= 1) {
				setAnimating(false);
			}
		}
	});

	const visiblePoints = useMemo(() => {
		if (smoothPoints.length === 0) return [];
		const count = Math.ceil(progress * smoothPoints.length);
		const safeCount = Math.max(0, Math.min(count, smoothPoints.length));
		return smoothPoints.slice(0, safeCount);
	}, [progress, smoothPoints]);

	if (visiblePoints.length < 2) return null;

	return <Line points={visiblePoints} lineWidth={4} color="red" transparent opacity={progress} />;
};
