"use client";
import { FC, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { INode } from "@/entities/map";

interface Props {
	nodeMapper: Record<1 | 2, INode[]>;
	findPath: (fromId: string, toId: string) => void;
}

export const PathForm: FC<Props> = ({ nodeMapper, findPath }) => {
	const [from, setFrom] = useState<string>();
	const [to, setTo] = useState<string>();
	const [fromFloor, setFromFloor] = useState<number>(1);
	const [toFloor, setToFloor] = useState<number>(1);
	const t = useTranslations();

	const nodes1 = nodeMapper[fromFloor as 1 | 2];
	const nodes2 = nodeMapper[toFloor as 1 | 2];

	const geoNames1 = useMemo(() => {
		return nodes1.map(({ name }) => name);
	}, [nodes1]);
	const nonCoridorGeoNames1 = useMemo(() => {
		return geoNames1.filter((name) => name !== "Коридор").filter(Boolean);
	}, [geoNames1]);

	const geoNames2 = useMemo(() => {
		return nodes2.map(({ name }) => name);
	}, [nodes2]);
	const nonCoridorGeoNames2 = useMemo(() => {
		return geoNames2.filter((name) => name !== "Коридор").filter(Boolean);
	}, [geoNames2]);

	return (
		<div className="flex flex-col gap-3">
			<div className="grid grid-cols-[5fr_1fr] gap-2 items-center">
				<Select selectedKeys={[String(from)]} onChange={(e) => setFrom(e.target.value)} label={t("from")}>
					{nonCoridorGeoNames1.map((name) => (
						<SelectItem key={name}>{name}</SelectItem>
					))}
				</Select>{" "}
				<Select selectedKeys={[String(fromFloor)]} onChange={(e) => setFromFloor(Number(e.target.value))}>
					{[1, 2, 3, 4, 5, 6, 7].map((num, i) => (
						<SelectItem key={i}>{String(num)}</SelectItem>
					))}
				</Select>
			</div>
			<div className="grid grid-cols-[5fr_1fr] gap-2 items-center">
				<Select selectedKeys={[String(to)]} onChange={(e) => setTo(e.target.value)} label={t("to")}>
					{nonCoridorGeoNames2.map((name) => (
						<SelectItem key={name}>{name}</SelectItem>
					))}
				</Select>
				<Select selectedKeys={[String(toFloor)]} onChange={(e) => setToFloor(Number(e.target.value))}>
					{[1, 2, 3, 4, 5, 6, 7].map((num) => (
						<SelectItem key={String(num)}>{String(num)}</SelectItem>
					))}
				</Select>
			</div>
			<Button
				isDisabled={!from || !to}
				onPress={() =>
					findPath(nodes1.find(({ name }) => name === from)!.pid_name, nodes2.find(({ name }) => name === to)!.pid_name)
				}
				color={"primary"}
			>
				{t("find path")}
			</Button>
		</div>
	);
};
