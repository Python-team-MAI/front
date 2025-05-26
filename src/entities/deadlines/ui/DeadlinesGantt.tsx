import { calculateTimeRange } from "@/shared/lib/utils/deadlines/calculateTimeRange";
import { getDeadlineStatus } from "@/shared/lib/utils/deadlines/getDeadlineStatus";
import { ScrollArea } from "@/shared/ui/ScrollArea";
import { TabsContent } from "@/shared/ui/Tabs";
import { Card, CardHeader } from "@heroui/card";
import { format, isToday, parseISO } from "date-fns";
import { Deadline } from "../model/types/Deadline";
import { FC } from "react";

interface Props {
	deadlines: Deadline[];
}

export const DeadlinesGantt: FC<Props> = ({ deadlines }) => {
	const { minDate, maxDate } = calculateTimeRange(deadlines);

	const totalDays = Math.ceil((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));

	return (
		<TabsContent value="gantt">
			<Card>
				<CardHeader>
					<div className="flex flex-col align-start">
						<p className="text-xl font-bold">Deadline Timeline</p>
						<p className="text-sm text-gray-500">Visual representation of all deadlines</p>
					</div>
				</CardHeader>
				<div className="p-4">
					<ScrollArea className="h-[500px] w-full">
						<div className="w-full min-w-[800px]">
							{/* Header - Days */}
							<div className="flex border-b">
								<div className="w-1/4 p-3 font-medium">Deadline</div>
								<div className="w-3/4 flex">
									{Array.from({ length: totalDays }).map((_, idx) => {
										const date = new Date(minDate);
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

							{/* Gantt rows */}
							{deadlines.map((deadline, idx) => {
								const startDate = deadline.date_from ? parseISO(deadline.date_from) : parseISO(deadline.date_to);
								const endDate = parseISO(deadline.date_to);

								const startDayIndex = Math.floor((startDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
								const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

								const { color } = getDeadlineStatus(deadline.date_to);

								return (
									<div key={idx} className={`flex border-b h-16`}>
										<div className="w-1/4 p-3 flex flex-col justify-center items-center">
											<p className="font-medium truncate">{deadline.name}</p>
											<p className="text-xs text-gray-500 truncate">{deadline.lesson}</p>
										</div>
										<div className="w-3/4 flex relative py-2">
											<div
												className={`absolute h-8 rounded-md ${color} flex items-center justify-center text-xs px-2 overflow-hidden`}
												style={{
													left: `calc(${(startDayIndex / totalDays) * 100}% + 5px)`,
													width: `calc(${(duration / totalDays) * 100}% - 10px)`,
													minWidth: "20px",
												}}
											>
												{duration > 3 ? deadline.name : ""}
											</div>
											{Array.from({ length: totalDays }).map((_, dayIdx) => (
												<div
													key={dayIdx}
													style={{ borderColor: "rgba(255,255,255, 0.5)" }}
													className="flex-1 border-r h-full"
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
