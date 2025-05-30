"use client";

import { AdminTable } from "@/shared/ui/AdminTable";

export default function AdminAssistantIndexesPage() {
	const columns = [
		{ key: "id", label: "ID" },
		{ key: "name", label: "Название" },
		{ key: "status", label: "Статус" },
		{ key: "snapshot_id", label: "ID снапшота" },
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

	return <AdminTable title="Индексы ассистента" endpoint="/assistant/indexes" columns={columns} />;
}
