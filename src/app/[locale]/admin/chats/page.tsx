"use client";

import { AdminTable } from "@/shared/ui/AdminTable";

export default function AdminChatsPage() {
	const columns = [
		{ key: "id", label: "ID" },
		{ key: "name", label: "Название" },
		{ key: "type", label: "Тип" },
		{
			key: "office_id",
			label: "ID офиса",
			relation: {
				endpoint: "/offices",
				displayField: "name",
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
		{
			key: "updated_at",
			label: "Обновлен",
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
		{ key: "type", label: "Тип", type: "text" as const },
		{ key: "office_id", label: "ID офиса", type: "number" as const },
	];

	const updateFields = [
		{ key: "name", label: "Название", type: "text" as const },
		{ key: "type", label: "Тип", type: "text" as const },
		{ key: "office_id", label: "ID офиса", type: "number" as const },
	];

	return (
		<AdminTable
			title="Чаты"
			endpoint="/chats"
			columns={columns}
			createFields={createFields}
			updateFields={updateFields}
		/>
	);
}
