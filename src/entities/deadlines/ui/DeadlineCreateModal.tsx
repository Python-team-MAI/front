"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { CookieManager } from "@/shared/lib/cookie/cookie";
import { USER } from "@/shared/constants/tokens";
import { User } from "@/entities/user";
import { addToast, DatePicker } from "@heroui/react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { $fetch } from "@/fetch";
import { Deadline } from "../model/types/Deadline";

interface Props {
	onOpenChange: () => void;
	isOpen: boolean;
	setDeadlines: Dispatch<SetStateAction<Deadline[]>>;
}

interface CreateDeadline {
	name: string;
	teacher: string;
	author_id: number;
	lesson: string;
	description: string;
}

const DeadlineCreateModal: FC<Props> = ({ isOpen, onOpenChange, setDeadlines }) => {
	const [fromDate, setFromDate] = useState(parseDate(new Date().toISOString().split("T")[0]));
	const [toDate, setToDate] = useState(parseDate(new Date().toISOString().split("T")[0]));
	const user: User = JSON.parse(CookieManager.get(USER) || "{}");
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
		console.log(deadline);
		if (Object.entries(deadline).filter(Boolean).length < 5) {
			addToast({ color: "danger", title: "Заполните все поля!" });
			return;
		}
		if (!toDate) {
			addToast({ color: "danger", title: "Заполните все поля!" });
			return;
		}

		try {
			const res = await $fetch<false>("/deadlines/personal", {
				method: "POST",
				data: {
					...deadline,
					date_from: fromDate.toDate(getLocalTimeZone()).toISOString(),
					date_to: toDate.toDate(getLocalTimeZone()).toISOString(),
				},
			});
			console.log(res.data);

			if (res.status === 200) {
				setDeadlines((prev) => [...prev, res.data]);
			}
		} catch (e) {
			addToast({ color: "danger", title: "Ошибка!" });
			console.log(e);
		}
	};

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				<div className="p-4">
					<ModalHeader>
						<p>Создание ддл</p>
					</ModalHeader>
					<ModalBody>
						<div className="flex flex-col gap-2">
							<Input label="Название" {...setInputProps("name")} />
							<Input label="Предмет" {...setInputProps("lesson")} />
							<Input label="Описание" {...setInputProps("description")} />
							<Input label="Препод" {...setInputProps("teacher")} />
							{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
							{/* @ts-ignore */}
							<DatePicker label="От" value={fromDate} onChange={setFromDate} />
							{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
							{/* @ts-ignore */}
							<DatePicker label="До" value={toDate} onChange={setToDate} />
						</div>
						<Button onPress={onCreate} color="primary">
							Создать
						</Button>
					</ModalBody>
				</div>
			</ModalContent>
		</Modal>
	);
};

export default DeadlineCreateModal;
