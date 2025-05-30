"use client";

import { AdminTable } from "@/shared/ui/AdminTable";

export default function AdminAssistantMessagesPage() {
	const columns = [
		{ key: "id", label: "ID" },
		{ key: "text", label: "Текст" },
		{ key: "type", label: "Тип" },
		{
			key: "assistant_chat_id",
			label: "ID чата ассистента",
			relation: {
				endpoint: "/assistant-chats",
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
			key: "created_at",
			label: "Создано",
			render: (value: unknown) => {
				if (typeof value === "string") {
					return new Date(value).toLocaleDateString("ru-RU");
				}
				return "";
			},
		},
		{
			key: "updated_at",
			label: "Обновлено",
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
		{ key: "type", label: "Тип", type: "text" as const },
		{ key: "assistant_chat_id", label: "ID чата ассистента", type: "number" as const },
		{ key: "user_id", label: "ID пользователя", type: "number" as const },
	];

	const updateFields = [
		{ key: "text", label: "Текст", type: "text" as const },
		{ key: "type", label: "Тип", type: "text" as const },
		{ key: "assistant_chat_id", label: "ID чата ассистента", type: "number" as const },
		{ key: "user_id", label: "ID пользователя", type: "number" as const },
	];

	return (
		<AdminTable
			title="Сообщения ассистента"
			endpoint="/assistant-messages"
			columns={columns}
			createFields={createFields}
			updateFields={updateFields}
		/>
	);
}
