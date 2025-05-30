"use client";

import { AdminTable } from "@/shared/ui/AdminTable";

export default function AdminDeadlinesPage() {
	const columns = [
		{ key: "id", label: "ID" },
		{ key: "name", label: "Название" },
		{ key: "lesson", label: "Предмет" },
		{ key: "teacher", label: "Преподаватель" },
		{
			key: "author_id",
			label: "ID автора",
			relation: {
				endpoint: "/users",
				displayField: "email",
			},
		},
		{ key: "description", label: "Описание" },
		{
			key: "date_from",
			label: "Дата начала",
			render: (value: unknown) => {
				if (typeof value === "string") {
					return new Date(value).toLocaleDateString("ru-RU");
				}
				return "";
			},
		},
		{
			key: "date_to",
			label: "Дата окончания",
			render: (value: unknown) => {
				if (typeof value === "string") {
					return new Date(value).toLocaleDateString("ru-RU");
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
		{ key: "lesson", label: "Предмет", type: "text" as const },
		{ key: "teacher", label: "Преподаватель", type: "text" as const },
		{ key: "author_id", label: "ID автора", type: "number" as const },
		{ key: "description", label: "Описание", type: "text" as const },
		{ key: "date_from", label: "Дата начала", type: "date" as const },
		{ key: "date_to", label: "Дата окончания", type: "date" as const },
	];

	const updateFields = [
		{ key: "name", label: "Название", type: "text" as const },
		{ key: "lesson", label: "Предмет", type: "text" as const },
		{ key: "teacher", label: "Преподаватель", type: "text" as const },
		{ key: "description", label: "Описание", type: "text" as const },
		{ key: "date_from", label: "Дата начала", type: "date" as const },
		{ key: "date_to", label: "Дата окончания", type: "date" as const },
	];

	return (
		<AdminTable
			title="Дедлайны"
			endpoint="/deadlines"
			columns={columns}
			createFields={createFields}
			updateFields={updateFields}
		/>
	);
}
