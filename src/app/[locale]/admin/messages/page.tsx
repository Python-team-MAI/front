"use client";

import { AdminTable } from "@/shared/ui/AdminTable";

export default function AdminMessagesPage() {
	const columns = [
		{ key: "id", label: "ID" },
		{ key: "text", label: "Текст" },
		{
			key: "chat_id",
			label: "ID чата",
			relation: {
				endpoint: "/chats",
				displayField: "name",
			},
		},
		{
			key: "user_id",
			label: "ID пользователя",
			relation: {
				endpoint: "/users",
				displayField: "email",
			},
		},
		{
			key: "is_deleted",
			label: "Удалено",
			render: (value: unknown) => (value ? "✓" : "✗"),
		},
		{
			key: "is_anonymous",
			label: "Анонимно",
			render: (value: unknown) => (value ? "✓" : "✗"),
		},
		{
			key: "created_at",
			label: "Создано",
			render: (value: unknown) => {
				if (typeof value === "string") {
					return new Date(value).toLocaleDateString("ru-RU");
				}
				return "";
			},
		},
	];

	const createFields = [
		{ key: "text", label: "Текст", type: "text" as const },
		{ key: "chat_id", label: "ID чата", type: "number" as const },
		{ key: "user_id", label: "ID пользователя", type: "number" as const },
		{ key: "is_deleted", label: "Удалено", type: "boolean" as const },
		{ key: "is_anonymous", label: "Анонимно", type: "boolean" as const },
	];

	const updateFields = [
		{ key: "text", label: "Текст", type: "text" as const },
		{ key: "is_deleted", label: "Удалено", type: "boolean" as const },
		{ key: "is_anonymous", label: "Анонимно", type: "boolean" as const },
	];

	return (
		<AdminTable
			title="Сообщения"
			endpoint="/messages"
			columns={columns}
			createFields={createFields}
			updateFields={updateFields}
		/>
	);
}
