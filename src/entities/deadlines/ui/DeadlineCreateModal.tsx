"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { CookieManager } from "@/shared/lib/utils/cookie/cookie";
import { USER } from "@/shared/constants/tokens";
import { User } from "@/entities/user";
import { addToast, DateInput } from "@heroui/react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { $fetch } from "@/fetch";
import { Deadline } from "../model/types/Deadline";
import moment from "moment";

interface Props {
	onOpenChange: () => void;
	isOpen: boolean;
	setDeadlines: Dispatch<SetStateAction<Deadline[]>>;
	onClose: () => void;
}

interface CreateDeadline {
	name: string;
	teacher: string;
	author_id: number;
	lesson: string;
	description: string;
}

const DeadlineCreateModal: FC<Props> = ({ isOpen, onOpenChange, setDeadlines, onClose }) => {
	const [fromDate, setFromDate] = useState(parseDate(new Date().toISOString().split("T")[0]));
	const [toDate, setToDate] = useState(parseDate(new Date().toISOString().split("T")[0]));
	const user: User = JSON.parse(CookieManager.get(USER) || "{}");
	const [isLoading, setIsLoading] = useState(false);
	const [deadline, setDeadline] = useState<CreateDeadline>({
		author_id: user.id,
		description: "",
		lesson: "",
		name: "",
		teacher: "",
	});

	const setInputProps = <T extends keyof CreateDeadline>(key: T) => {
		const value = deadline[key] as CreateDeadline[T];
		const onChange = (e: ChangeEvent<HTMLInputElement>) => {
			setDeadline((prev) => ({ ...prev, [key]: e.target.value }));
		};

		return { value, onChange };
	};

	const onCreate = async () => {
		if (Object.entries(deadline).filter(Boolean).length < 5) {
			addToast({ color: "danger", title: "Заполните все поля!" });
			return;
		}
		if (!toDate) {
			addToast({ color: "danger", title: "Заполните все поля!" });
			return;
		}

		try {
			setIsLoading(true);
			const res = await $fetch<false>("/deadlines/personal", {
				method: "POST",
				data: {
					...deadline,
					date_from: fromDate.toDate(getLocalTimeZone()).toISOString(),
					date_to: toDate.toDate(getLocalTimeZone()).toISOString(),
				},
			});

			if (res.status >= 200 && res.status < 300) {
				console.log(res.data);
				setDeadlines((prev) => [
					...prev,
					{
						...res.data,
						date_to: moment(res.data.date_to).add(3, "hour").toISOString(),
						date_from: moment(res.data.date_from).add(3, "hour").toISOString(),
					},
				]);
				setDeadline({
					author_id: user.id,
					description: "",
					lesson: "",
					name: "",
					teacher: "",
				});
				setFromDate(parseDate(new Date().toISOString().split("T")[0]));
				setToDate(parseDate(new Date().toISOString().split("T")[0]));
				addToast({ color: "success", title: "Успешно добавлен!" });
			}
		} catch (e) {
			addToast({ color: "danger", title: "Ошибка!" });
			console.log(e);
		} finally {
			onClose();
			setIsLoading(false);
		}
	};

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				<div className="p-4">
					<ModalHeader>
						<p>Создание дедлайна</p>
					</ModalHeader>
					<ModalBody>
						<div className="flex flex-col gap-2">
							<Input label="Название" {...setInputProps("name")} />
							<Input label="Предмет" {...setInputProps("lesson")} />
							<Input label="Описание" {...setInputProps("description")} />
							<Input label="Препод" {...setInputProps("teacher")} />
							{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
							{/* @ts-ignore */}
							<DateInput label="От (?)" value={fromDate} onChange={setFromDate} />
							{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
							{/* @ts-ignore */}
							<DateInput label="До" value={toDate} onChange={setToDate} />
						</div>
						<Button isLoading={isLoading} onPress={onCreate} color="primary">
							Создать
						</Button>
					</ModalBody>
				</div>
			</ModalContent>
		</Modal>
	);
};

export default DeadlineCreateModal;
