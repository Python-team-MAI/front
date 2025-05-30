"use client";

import { AdminTable } from "@/shared/ui/AdminTable";

export default function AdminAssistantChatsPage() {
	const columns = [
		{ key: "id", label: "ID" },
		{ key: "name", label: "Название" },
		{
			key: "user_id",
			label: "ID пользователя",
			relation: {
				endpoint: "/users",
				displayField: "email",
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
		{ key: "user_id", label: "ID пользователя", type: "number" as const },
	];

	const updateFields = [
		{ key: "name", label: "Название", type: "text" as const },
		{ key: "user_id", label: "ID пользователя", type: "number" as const },
	];

	return (
		<AdminTable
			title="Чаты ассистента"
			endpoint="/assistant-chats"
			columns={columns}
			createFields={createFields}
			updateFields={updateFields}
		/>
	);
}
