"use client";

import { AdminTable } from "@/shared/ui/AdminTable";

const roleOptions = [
	{ value: "admin", label: "Администратор" },
	{ value: "student", label: "Студент" },
	{ value: "head", label: "Староста" },
];

export default function AdminUsersPage() {
	const columns = [
		{ key: "id", label: "ID" },
		{ key: "email", label: "Email" },
		{ key: "first_name", label: "Имя" },
		{ key: "last_name", label: "Фамилия" },
		{
			key: "role",
			label: "Роль",
			render: (value: unknown) => {
				const role = roleOptions.find((r) => r.value === value);
				return role?.label || String(value);
			},
		},
		{
			key: "is_active",
			label: "Активен",
			render: (value: unknown) => (value ? "✓" : "✗"),
		},
		{
			key: "is_verified",
			label: "Подтвержден",
			render: (value: unknown) => (value ? "✓" : "✗"),
		},
		{ key: "course", label: "Курс" },
		{
			key: "group_id",
			label: "ID группы",
			relation: {
				endpoint: "/groups",
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
	];

	const createFields = [
		{ key: "email", label: "Email", type: "text" as const },
		{ key: "password", label: "Пароль", type: "text" as const },
		{ key: "first_name", label: "Имя", type: "text" as const },
		{ key: "last_name", label: "Фамилия", type: "text" as const },
		{ key: "role", label: "Роль", type: "select" as const, options: roleOptions },
		{ key: "course", label: "Курс", type: "number" as const },
		{ key: "group_id", label: "ID группы", type: "number" as const },
		{ key: "institute", label: "Институт", type: "number" as const },
		{ key: "is_active", label: "Активен", type: "boolean" as const },
		{ key: "is_verified", label: "Подтвержден", type: "boolean" as const },
		{ key: "auth_type", label: "Тип авторизации", type: "text" as const },
	];

	const updateFields = [
		{ key: "first_name", label: "Имя", type: "text" as const },
		{ key: "last_name", label: "Фамилия", type: "text" as const },
		{ key: "role", label: "Роль", type: "select" as const, options: roleOptions },
		{ key: "course", label: "Курс", type: "number" as const },
		{ key: "group_id", label: "ID группы", type: "number" as const },
		{ key: "institute", label: "Институт", type: "number" as const },
		{ key: "is_active", label: "Активен", type: "boolean" as const },
		{ key: "is_verified", label: "Подтвержден", type: "boolean" as const },
		{ key: "bio", label: "О себе", type: "text" as const },
	];

	return (
		<AdminTable
			title="Пользователи"
			endpoint="/users"
			columns={columns}
			createFields={createFields}
			updateFields={updateFields}
		/>
	);
}
