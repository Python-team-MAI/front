import { getDeadlineStatus } from "@/shared/lib/utils/deadlines/getDeadlineStatus";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { Deadline } from "../model/types/Deadline";
import { Card, CardHeader } from "@heroui/card";
import { Badge } from "@heroui/badge";
import { Avatar } from "@heroui/avatar";
import { getInitials } from "@/shared/lib/utils/deadlines/getInitials";
import { Clock, Delete } from "lucide-react";
import moment from "moment";
import { Button } from "@heroui/button";
import { addToast, Modal, ModalContent, useDisclosure } from "@heroui/react";
import { $fetch } from "@/fetch";

interface Props {
	deadline: Deadline;
	setDeadlines?: Dispatch<SetStateAction<Deadline[]>>;
}

export const DeadlineCard: FC<Props> = ({ deadline, setDeadlines }) => {
	const { status, color } = getDeadlineStatus(deadline.date_to);
	const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
	const [isLoading, setIsLoading] = useState(false);

	const onModalDelete = (ddlId: number) => async () => {
		try {
			setIsLoading(true);
			const res = await $fetch<false>("/deadlines/" + ddlId, { method: "DELETE" });

			if (res.status >= 200 && res.status < 300) {
				setDeadlines?.((prev) => prev.filter(({ id }) => ddlId !== id));
				addToast({ color: "success", title: "Дедлайн удален" });
				onClose();
			}
		} catch (e) {
			console.log(e);
			onClose();
			addToast({ color: "danger", title: "Ошибка" });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			{setDeadlines && (
				<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
					<ModalContent className="">
						<div className="p-4 flex flex-col justify-end w-full h-full">
							<h1 className="text-center p-5 text-2xl font-bold">Вы уверены, что хотите удалить дедлайн?</h1>
							<div className="flex justify-center gap-4 items-end">
								<Button isLoading={isLoading} size="lg" onPress={onClose}>
									Отмена
								</Button>
								<Button isLoading={isLoading} size="lg" color="danger" onPress={onModalDelete(deadline.id)}>
									Удалить
								</Button>
							</div>
						</div>
					</ModalContent>
				</Modal>
			)}
			<Card className="overflow-hidden p-4">
				<div className={`h-1 ${color.split(" ")[0]}`} />
				<CardHeader className="pb-2 flex justify-between">
					<div className="flex justify-center items-start gap-2">
						<div>
							<p className="text-lg font-medium">{deadline.name}</p>
							<p className="text-sm text-gray-500">
								{deadline.lesson} {deadline.group && `- ${deadline.group}`}
							</p>
						</div>
						<Badge className={`${color} text-lg font-medium`}>{status}</Badge>
					</div>
					{setDeadlines && (
						<Button onPress={onOpen} color="danger">
							<Delete />
						</Button>
					)}
				</CardHeader>
				<div className="p-3 pt-0">
					<p className="text-sm mb-4">{deadline.description}</p>

					<div className="flex justify-between items-center">
						<div className="flex items-center gap-2">
							<Avatar className="h-8 w-8">{getInitials(deadline.teacher)}</Avatar>
							<div className="text-sm">
								<p className="font-medium">{deadline.teacher}</p>
								<p className="text-xs text-gray-500">Assigned by ??</p>
							</div>
						</div>

						<div className="flex items-center gap-1 text-sm text-gray-500">
							<Clock className="h-4 w-4" />
							<p>Due {moment(new Date(deadline.date_to)).format("MMM DD, yyyy")}</p>
						</div>
					</div>
				</div>
			</Card>
		</>
	);
};
