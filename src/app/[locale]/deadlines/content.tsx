"use client";

import { useState } from "react";
import { List, GanttChart } from "lucide-react";
import { Deadline } from "@/entities/deadlines/model/types/Deadline";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/Tabs";
import { groupDeadlinesByDay } from "@/shared/lib/utils/deadlines/groupDeadlinesByDay";
import { DeadlineCreateModal, DeadlinesGantt, DeadlinesHeader, DeadlinesList } from "@/entities/deadlines";
import { useDisclosure } from "@heroui/modal";

export const DeadlinePageContent = (props: { deadlines: Deadline[] }) => {
	const [deadlines, setDeadlines] = useState<Deadline[]>(props.deadlines);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const groupedDeadlines = groupDeadlinesByDay(deadlines);

	return (
		<div className="container mx-auto py-10">
			<DeadlineCreateModal isOpen={isOpen} onOpenChange={onOpenChange} setDeadlines={setDeadlines} />
			<DeadlinesHeader onOpenModal={onOpen} />
			<Tabs defaultValue="list">
				<TabsList className="mb-6">
					<TabsTrigger value="list" className="flex items-center gap-2">
						<List className="h-4 w-4" />
						List View
					</TabsTrigger>
					<TabsTrigger value="gantt" className="flex items-center gap-2">
						<GanttChart className="h-4 w-4" />
						Gantt Chart
					</TabsTrigger>
				</TabsList>
				<DeadlinesList groupedDeadlines={groupedDeadlines} />
				<DeadlinesGantt deadlines={deadlines} />
			</Tabs>
		</div>
	);
};
