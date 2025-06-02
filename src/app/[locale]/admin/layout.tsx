import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "@/shared/constants/tokens";
import { Link } from "@/navigation";

interface AdminLayoutProps {
	children: ReactNode;
	params: Promise<{ locale: string }>;
}

interface JWTPayload {
	role?: string;
}

export default async function AdminLayout({ children, params }: AdminLayoutProps) {
	const cookieStore = await cookies();
	const token = cookieStore.get(ACCESS_TOKEN);
	const { locale } = await params;

	if (!token) {
		redirect(`/${locale || "ru"}/login`);
	}

	try {
		const decoded = jwtDecode<JWTPayload>(token.value);
		if (decoded.role !== "admin") {
			redirect(`/${locale || "ru"}`);
		}
	} catch {
		redirect(`/${locale || "ru"}/login`);
	}

	return (
		<div className="min-h-screen">
			<div className="flex">
				<aside className="w-64 min-h-screen">
					<div className="p-6">
						<h2 className="text-2xl font-bold">Админ панель</h2>
					</div>
					<nav className="mt-6">
						<Link href={`/admin/users`} className="block px-6 py-3 ">
							Пользователи
						</Link>
						<Link href={`/admin/chats`} className="block px-6 py-3 ">
							Чаты
						</Link>
						<Link href={`/admin/messages`} className="block px-6 py-3 ">
							Сообщения
						</Link>
						<Link href={`/admin/groups`} className="block px-6 py-3 ">
							Группы
						</Link>
						<Link href={`/admin/offices`} className="block px-6 py-3 ">
							Офисы
						</Link>
						<Link href={`/admin/nodes`} className="block px-6 py-3 ">
							Узлы карты
						</Link>
						<Link href={`/admin/assistant-messages`} className="block px-6 py-3 ">
							Сообщения ассистента
						</Link>
						<Link href={`/admin/assistant-chats`} className="block px-6 py-3 ">
							Чаты ассистента
						</Link>
						<Link href={`/admin/deadlines`} className="block px-6 py-3 ">
							Дедлайны
						</Link>
						<Link href={`/admin/snapshots`} className="block px-6 py-3 ">
							Снапшоты
						</Link>
						{/* <Link
							href={`/admin/assistant-indexes`}
							className="block px-6 py-3 "
						>
							Индексы ассистента
						</Link> */}
					</nav>
				</aside>

				<main className="flex-1 p-8">{children}</main>
			</div>
		</div>
	);
}
