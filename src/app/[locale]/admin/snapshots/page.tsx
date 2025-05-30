"use client";

import { AdminTable } from "@/shared/ui/AdminTable";

export default function AdminSnapshotsPage() {
	const columns = [
		{ key: "id", label: "ID" },
		{
			key: "is_active",
			label: "Активен",
			render: (value: unknown) => (value ? "✓" : "✗"),
		},
		{ key: "status", label: "Статус" },
		{ key: "index_id", label: "ID индекса" },
		{
			key: "document_paths",
			label: "Пути документов",
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

	return <AdminTable title="Снапшоты" endpoint="/snapshots" columns={columns} />;
}
