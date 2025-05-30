import { Card } from "@heroui/card";

export default function AdminPage() {
	return (
		<div>
			<h1 className="text-3xl font-bold  mb-8">Панель администратора</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<Card className="p-6">
					<h2 className="text-xl font-semibold  mb-2">Пользователи</h2>
					<p>Управление пользователями системы</p>
				</Card>

				<Card className="p-6">
					<h2 className="text-xl font-semibold  mb-2">Чаты</h2>
					<p>Управление чатами и сообщениями</p>
				</Card>

				<Card className="p-6">
					<h2 className="text-xl font-semibold  mb-2">Группы</h2>
					<p>Управление учебными группами</p>
				</Card>

				<Card className="p-6">
					<h2 className="text-xl font-semibold  mb-2">Офисы</h2>
					<p>Управление офисами и помещениями</p>
				</Card>

				<Card className="p-6">
					<h2 className="text-xl font-semibold  mb-2">Дедлайны</h2>
					<p>Управление дедлайнами и заданиями</p>
				</Card>

				<Card className="p-6">
					<h2 className="text-xl font-semibold  mb-2">Ассистент</h2>
					<p>Управление AI ассистентом</p>
				</Card>
			</div>
		</div>
	);
}
