import { getDeadlineStatus } from "@/shared/lib/utils/deadlines/getDeadlineStatus";
import { ScrollArea } from "@/shared/ui/ScrollArea";
import { TabsContent } from "@/shared/ui/Tabs";
import { Card, CardHeader } from "@heroui/card";
import { addWeeks, format, isToday, parseISO, startOfWeek, endOfWeek } from "date-fns";
import { Deadline } from "../model/types/Deadline";
import { FC, useState } from "react";
import { Button } from "@heroui/button";

interface Props {
	deadlines: Deadline[];
}

export const DeadlinesGantt: FC<Props> = ({ deadlines }) => {
	const [currentWeek, setCurrentWeek] = useState(new Date());

	const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
	const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 });
	const totalDays = 7;

	const filteredDeadlines = deadlines.filter((deadline) => {
		const deadlineEnd = parseISO(deadline.date_to);
		const deadlineStart = deadline.date_from ? parseISO(deadline.date_from) : deadlineEnd;

		return deadlineStart <= weekEnd && deadlineEnd >= weekStart;
	});

	const getDisplayRange = (deadline: Deadline) => {
		const deadlineEnd = parseISO(deadline.date_to);
		const deadlineStart = deadline.date_from ? parseISO(deadline.date_from) : deadlineEnd;

		return {
			start: deadlineStart < weekStart ? weekStart : deadlineStart,
			end: deadlineEnd > weekEnd ? weekEnd : deadlineEnd,
		};
	};

	return (
		<TabsContent value="gantt">
			<Card>
				<CardHeader className="flex justify-between">
					<div className="flex flex-col align-start">
						<p className="text-xl font-bold">Deadline Timeline</p>
						<p className="text-sm text-gray-500">
							{format(weekStart, "dd MMM yyyy")} - {format(weekEnd, "dd MMM yyyy")}
						</p>
					</div>
					<div className="flex gap-2 mt-2">
						<Button color="secondary" onPress={() => setCurrentWeek(addWeeks(currentWeek, -1))}>
							Previous Week
						</Button>
						<Button color="primary" onPress={() => setCurrentWeek(addWeeks(currentWeek, 1))}>
							Next Week
						</Button>
					</div>
				</CardHeader>
				<div className="p-4">
					<ScrollArea className="h-[500px] w-full">
						<div className="w-full min-w-[800px]">
							<div className="flex border-b">
								<div className="w-1/4 p-3 font-medium">Deadline</div>
								<div className="w-3/4 flex">
									{Array.from({ length: totalDays }).map((_, idx) => {
										const date = new Date(weekStart);
										date.setDate(date.getDate() + idx);
										return (
											<div
												key={idx}
												className={`flex-1 flex flex-col justify-center items-center p-1 text-xs text-center border-r ${
													isToday(date) ? "font-bold" : ""
												}`}
											>
												<p className={isToday(date) ? "" : "opacity-30"}>{format(date, "MMM")}</p>
												<p className={isToday(date) ? "" : "opacity-30"}>{format(date, "d")}</p>
											</div>
										);
									})}
								</div>
							</div>

							{filteredDeadlines.map((deadline, idx) => {
								const { start: displayStart, end: displayEnd } = getDisplayRange(deadline);
								const { color } = getDeadlineStatus(deadline.date_to);

								const startDayIndex = Math.floor((displayStart.getTime() - weekStart.getTime()) / 86400000);

								let durationDays = Math.ceil((displayEnd.getTime() - displayStart.getTime()) / 86400000) + 1;

								if (durationDays > 7) {
									durationDays = 7;
								}

								return (
									<div key={idx} className="flex border-b h-16">
										<div className="w-1/4 p-3 flex flex-col justify-center items-center">
											<p className="font-medium truncate">{deadline.name}</p>
											<p className="text-xs text-gray-500 truncate">{deadline.lesson}</p>
										</div>
										<div className="w-3/4 flex relative py-2">
											<div
												className={`absolute h-8 rounded-md ${color} flex items-center justify-center text-xs px-2 overflow-hidden`}
												style={{
													left: `calc(${(startDayIndex / totalDays) * 100}% + 5px)`,
													width: `calc(${(durationDays / totalDays) * 100}% - 10px)`,
													minWidth: "20px",
												}}
											>
												{durationDays > 3 ? deadline.name : ""}
											</div>
											{Array.from({ length: totalDays }).map((_, dayIdx) => (
												<div
													key={dayIdx}
													style={{ borderColor: "rgba(255,255,255, 0.5)" }}
													className={`flex-1 border-r h-full ${dayIdx === 0 && "border-l"}`}
												></div>
											))}
										</div>
									</div>
								);
							})}
						</div>
					</ScrollArea>
				</div>
			</Card>
		</TabsContent>
	);
};
