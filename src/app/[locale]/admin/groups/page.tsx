"use client";

import { AdminTable } from "@/shared/ui/AdminTable";

export default function AdminGroupsPage() {
	const columns = [
		{ key: "id", label: "ID" },
		{ key: "name", label: "Название" },
		{
			key: "created_at",
			label: "Создана",
			render: (value: unknown) => {
				if (typeof value === "string") {
					return new Date(value).toLocaleDateString("ru-RU");
				}
				return "";
			},
		},
		{
			key: "updated_at",
			label: "Обновлена",
			render: (value: unknown) => {
				if (typeof value === "string") {
					return new Date(value).toLocaleDateString("ru-RU");
				}
				return "";
			},
		},
	];

	const createFields = [{ key: "name", label: "Название", type: "text" as const }];

	const updateFields = [{ key: "name", label: "Название", type: "text" as const }];

	return (
		<AdminTable
			title="Группы"
			endpoint="/groups"
			columns={columns}
			createFields={createFields}
			updateFields={updateFields}
		/>
	);
}
