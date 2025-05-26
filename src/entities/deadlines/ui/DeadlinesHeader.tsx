import { Button } from "@heroui/button";
import { CalendarDays } from "lucide-react";
import { FC } from "react";

interface Props {
	onOpenModal: () => void;
}

export const DeadlinesHeader: FC<Props> = ({ onOpenModal }) => {
	return (
		<div className="flex justify-between items-center mb-8">
			<h1 className="text-3xl font-bold">Deadlines</h1>
			<Button onPress={onOpenModal} variant="shadow" className="flex items-center gap-2">
				<CalendarDays className="h-4 w-4" />
				Add to Calendar
			</Button>
		</div>
	);
};
