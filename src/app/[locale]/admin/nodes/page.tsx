"use client";

import { AdminTable } from "@/shared/ui/AdminTable";

export default function AdminNodesPage() {
	const columns = [
		{ key: "id", label: "ID" },
		{ key: "name", label: "Название" },
		{ key: "pid_name", label: "PID имя" },
		{ key: "type", label: "Тип" },
		{ key: "floor", label: "Этаж" },
		{ key: "x", label: "X" },
		{ key: "y", label: "Y" },
		{ key: "z", label: "Z" },
		{
			key: "connections",
			label: "Соединения",
			render: (value: unknown) => {
				if (Array.isArray(value)) {
					return value.join(", ");
				}
				return "";
			},
		},
		{
			key: "landmarks",
			label: "Ориентиры",
			render: (value: unknown) => {
				if (Array.isArray(value)) {
					return value.join(", ");
				}
				return "";
			},
		},
		{
			key: "created_at",
			label: "Создан",
			render: (value: unknown) => {
				if (typeof value === "string") {
					return new Date(value).toLocaleDateString("ru-RU");
				}
				return "";
			},
		},
	];

	const createFields = [
		{ key: "name", label: "Название", type: "text" as const },
		{ key: "pid_name", label: "PID имя", type: "text" as const },
		{ key: "type", label: "Тип", type: "text" as const },
		{ key: "floor", label: "Этаж", type: "number" as const },
		{ key: "x", label: "X", type: "number" as const },
		{ key: "y", label: "Y", type: "number" as const },
		{ key: "z", label: "Z", type: "number" as const },
	];

	const updateFields = [
		{ key: "name", label: "Название", type: "text" as const },
		{ key: "pid_name", label: "PID имя", type: "text" as const },
		{ key: "type", label: "Тип", type: "text" as const },
		{ key: "floor", label: "Этаж", type: "number" as const },
		{ key: "x", label: "X", type: "number" as const },
		{ key: "y", label: "Y", type: "number" as const },
		{ key: "z", label: "Z", type: "number" as const },
	];

	return (
		<AdminTable
			title="Узлы карты"
			endpoint="/nodes/nodes"
			columns={columns}
			createFields={createFields}
			updateFields={updateFields}
		/>
	);
}
