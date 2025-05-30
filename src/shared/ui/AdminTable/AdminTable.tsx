"use client";

import { useState, useEffect } from "react";
import {
	Button,
	Input,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
	Spinner,
	Select,
	SelectItem,
} from "@heroui/react";
import { axiosInstance } from "@/shared/lib/api/axios";
import { useTheme } from "next-themes";

interface TableItem {
	id: number;
	[key: string]: unknown;
}

interface Column {
	key: string;
	label: string;
	type?: "text" | "number" | "date" | "select" | "boolean";
	options?: { value: string; label: string }[];
	render?: (value: unknown, item: TableItem) => React.ReactNode;
	relation?: {
		endpoint: string;
		displayField: string;
	};
}

interface AdminTableProps {
	title: string;
	endpoint: string;
	columns: Column[];
	createFields?: Column[];
	updateFields?: Column[];
}

export function AdminTable({ title, endpoint, columns, createFields, updateFields }: AdminTableProps) {
	const [data, setData] = useState<TableItem[]>([]);
	const { theme } = useTheme();
	const [loading, setLoading] = useState(true);
	const [selectedItem, setSelectedItem] = useState<TableItem | null>(null);
	const [formData, setFormData] = useState<Record<string, unknown>>({});
	const [relatedData, setRelatedData] = useState<TableItem | null>(null);
	const [loadingRelated, setLoadingRelated] = useState(false);
	const [relatedColumn, setRelatedColumn] = useState<Column | null>(null);
	const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
	const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
	const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
	const { isOpen: isRelatedOpen, onOpen: onRelatedOpen, onClose: onRelatedClose } = useDisclosure();

	const handleRelatedClose = () => {
		onRelatedClose();
		setRelatedData(null);
		setRelatedColumn(null);
	};

	const fetchData = async () => {
		try {
			setLoading(true);
			const response = await axiosInstance.get(endpoint);
			setData(response.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [endpoint]);

	const handleCreate = async () => {
		try {
			await axiosInstance.post(endpoint, formData);
			onCreateClose();
			setFormData({});
			fetchData();
		} catch (error) {
			console.error("Error creating item:", error);
		}
	};

	const handleUpdate = async () => {
		try {
			await axiosInstance.patch(`${endpoint}/${selectedItem?.id}`, formData);
			onEditClose();
			setFormData({});
			setSelectedItem(null);
			fetchData();
		} catch (error) {
			console.error("Error updating item:", error);
		}
	};

	const handleDelete = async () => {
		try {
			await axiosInstance.delete(`${endpoint}/${selectedItem?.id}`);
			onDeleteClose();
			setSelectedItem(null);
			fetchData();
		} catch (error) {
			console.error("Error deleting item:", error);
		}
	};

	const openEditModal = (item: TableItem) => {
		setSelectedItem(item);
		setFormData(item);
		onEditOpen();
	};

	const openDeleteModal = (item: TableItem) => {
		setSelectedItem(item);
		onDeleteOpen();
	};

	const fetchRelatedData = async (column: Column, value: unknown) => {
		if (!column.relation || !value) return;

		setLoadingRelated(true);
		setRelatedColumn(column);

		try {
			const response = await axiosInstance.get(`${column.relation.endpoint}/${value}`);
			setRelatedData(response.data);
			onRelatedOpen();
		} catch (error) {
			console.error("Error fetching related data:", error);
		} finally {
			setLoadingRelated(false);
		}
	};

	const renderFormField = (field: Column) => {
		switch (field.type) {
			case "boolean":
				return (
					<label key={field.key} className="flex items-center space-x-2">
						<input
							type="checkbox"
							checked={!!formData[field.key] || false}
							onChange={(e) => setFormData({ ...formData, [field.key]: e.target.checked })}
							className="rounded"
						/>
						<span>{field.label}</span>
					</label>
				);
			case "select":
				return (
					<div key={field.key}>
						<label className="block text-sm font-medium mb-1">{field.label}</label>
						<Select
							value={(formData[field.key] as string) || ""}
							onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
							className="w-full p-2 border rounded"
						>
							<SelectItem key="">Выберите...</SelectItem>
							{field.options
								? field.options.map((option) => <SelectItem key={option.value}>{option.label}</SelectItem>)
								: null}
						</Select>
					</div>
				);
			case "date":
				return (
					<Input
						key={field.key}
						type="datetime-local"
						label={field.label}
						value={(formData[field.key] as string) || ""}
						onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
					/>
				);
			case "number":
				return (
					<Input
						key={field.key}
						type="number"
						label={field.label}
						value={(formData[field.key] as string) || ""}
						onChange={(e) => setFormData({ ...formData, [field.key]: parseInt(e.target.value) })}
					/>
				);
			default:
				return (
					<Input
						key={field.key}
						label={field.label}
						value={(formData[field.key] as string) || ""}
						onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
					/>
				);
		}
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<Spinner size="lg" />
			</div>
		);
	}

	return (
		<div className={theme === "dark" ? "dark" : "light"}>
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h1>
				{createFields && (
					<Button color="primary" onPress={onCreateOpen}>
						Добавить
					</Button>
				)}
			</div>

			<div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
						<thead className="bg-gray-50 dark:bg-gray-700">
							<tr>
								{columns.map((column) => (
									<th
										key={column.key}
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
									>
										{column.label}
									</th>
								))}
								<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
									Действия
								</th>
							</tr>
						</thead>
						<tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
							{data.map((item) => (
								<tr key={item.id}>
									{columns.map((column) => (
										<td
											key={column.key}
											className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
										>
											{column.relation && item[column.key] ? (
												<button
													onClick={() => fetchRelatedData(column, item[column.key])}
													className="text-blue-600 hover:text-blue-800 underline cursor-pointer"
												>
													{item[column.key] as string}
												</button>
											) : column.render ? (
												column.render(item[column.key], item)
											) : (
												(item[column.key] as string)
											)}
										</td>
									))}
									<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
										{updateFields && (
											<Button
												size="sm"
												color="primary"
												variant="light"
												onPress={() => openEditModal(item)}
												className="mr-2"
											>
												Изменить
											</Button>
										)}
										<Button size="sm" color="danger" variant="light" onPress={() => openDeleteModal(item)}>
											Удалить
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Create Modal */}
			<Modal isOpen={isCreateOpen} onClose={onCreateClose}>
				<ModalContent>
					<ModalHeader>Добавить {title}</ModalHeader>
					<ModalBody>
						<div className="space-y-4">{createFields?.map((field) => renderFormField(field))}</div>
					</ModalBody>
					<ModalFooter>
						<Button color="danger" variant="light" onPress={onCreateClose}>
							Отмена
						</Button>
						<Button color="primary" onPress={handleCreate}>
							Создать
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			{/* Edit Modal */}
			<Modal isOpen={isEditOpen} onClose={onEditClose}>
				<ModalContent>
					<ModalHeader>Изменить {title}</ModalHeader>
					<ModalBody>
						<div className="space-y-4">{updateFields?.map((field) => renderFormField(field))}</div>
					</ModalBody>
					<ModalFooter>
						<Button color="danger" variant="light" onPress={onEditClose}>
							Отмена
						</Button>
						<Button color="primary" onPress={handleUpdate}>
							Сохранить
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			{/* Delete Modal */}
			<Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
				<ModalContent>
					<ModalHeader>Удалить {title}</ModalHeader>
					<ModalBody>
						<p>Вы уверены, что хотите удалить этот элемент?</p>
					</ModalBody>
					<ModalFooter>
						<Button color="danger" variant="light" onPress={onDeleteClose}>
							Отмена
						</Button>
						<Button color="danger" onPress={handleDelete}>
							Удалить
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			{/* Related Data Modal */}
			<Modal isOpen={isRelatedOpen} onClose={handleRelatedClose} size="lg">
				<ModalContent>
					<ModalHeader>{relatedColumn?.label} - Детали</ModalHeader>
					<ModalBody>
						{loadingRelated ? (
							<div className="flex justify-center items-center h-32">
								<Spinner size="lg" />
							</div>
						) : relatedData ? (
							<table className="space-y-2">
								{Object.entries(relatedData).map(([key, value]) => (
									<div key={key} className="flex">
										<span className="font-semibold min-w-[150px]">{key}:</span>
										<span>{value !== null && value !== undefined && value !== "" ? String(value) : "null"}</span>
									</div>
								))}
							</table>
						) : (
							<p className="text-gray-500 dark:text-gray-400">Данные не найдены</p>
						)}
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onPress={handleRelatedClose}>
							Закрыть
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
}
