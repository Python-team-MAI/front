"use client";

import { AdminTable } from "@/shared/ui/AdminTable";

export default function AdminOfficesPage() {
	const columns = [
		{ key: "id", label: "ID" },
		{ key: "name", label: "Название" },
		{ key: "desc", label: "Описание" },
		{ key: "type", label: "Тип" },
		{ key: "floor", label: "Этаж" },
		{ key: "color", label: "Цвет" },
		{ key: "length", label: "Длина" },
		{ key: "width", label: "Ширина" },
		{ key: "height", label: "Высота" },
		{
			key: "coords",
			label: "Координаты",
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
		{ key: "desc", label: "Описание", type: "text" as const },
		{ key: "type", label: "Тип", type: "text" as const },
		{ key: "floor", label: "Этаж", type: "number" as const },
		{ key: "color", label: "Цвет", type: "text" as const },
		{ key: "length", label: "Длина", type: "number" as const },
		{ key: "width", label: "Ширина", type: "number" as const },
		{ key: "height", label: "Высота", type: "number" as const },
	];

	const updateFields = [
		{ key: "name", label: "Название", type: "text" as const },
		{ key: "desc", label: "Описание", type: "text" as const },
		{ key: "type", label: "Тип", type: "text" as const },
		{ key: "floor", label: "Этаж", type: "number" as const },
		{ key: "color", label: "Цвет", type: "text" as const },
		{ key: "length", label: "Длина", type: "number" as const },
		{ key: "width", label: "Ширина", type: "number" as const },
		{ key: "height", label: "Высота", type: "number" as const },
	];

	return (
		<AdminTable
			title="Офисы"
			endpoint="/offices"
			columns={columns}
			createFields={createFields}
			updateFields={updateFields}
		/>
	);
}
