import { TabsContent } from "@/shared/ui/Tabs";
import { Card } from "@heroui/card";
import { Badge } from "@heroui/badge";
import { CalendarDays } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";
import { Deadline } from "../model/types/Deadline";
import { getDateLabel } from "@/shared/lib/utils/deadlines/getDateLabel";
import { DeadlineCard } from "./DeadlineCard";

interface Props {
	groupedDeadlines: [string, Deadline[]][];
	setDeadlines: Dispatch<SetStateAction<Deadline[]>>;
}

export const DeadlinesList: FC<Props> = ({ groupedDeadlines, setDeadlines }) => {
	return (
		<TabsContent value="list">
			{groupedDeadlines.length === 0 ? (
				<Card className="py-10 text-center">
					<p>No deadlines found.</p>
				</Card>
			) : (
				groupedDeadlines.map(([date, items]) => (
					<div key={date} className="mb-8">
						<div className="flex items-center gap-2 mb-4">
							<CalendarDays className="h-5 w-5 text-muted-foreground" />
							<h2 className="text-xl font-semibold">{getDateLabel(date)}</h2>
							<Badge variant="shadow">
								{items.length} {items.length === 1 ? "deadline" : "deadlines"}
							</Badge>
						</div>

						<div className="grid gap-4">
							{items.map((deadline) => (
								<DeadlineCard setDeadlines={setDeadlines} deadline={deadline} key={deadline.id} />
							))}
						</div>
					</div>
				))
			)}
		</TabsContent>
	);
};
