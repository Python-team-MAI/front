"use client";

import React, { useEffect, useRef, useState } from "react";
import { Schedule, ScheduleDayCard, ScheduleMenu } from "@/entities/schedule";
import moment from "moment";
import { useTranslations } from "next-intl";
import { Deadline } from "@/entities/deadlines/model/types/Deadline";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { countDeadlinesForDate } from "@/shared/lib/utils/deadlines/countDeadlinesForDate";

export const ScheduleClient = ({
	schedule,
	groupName,
	date,
	deadlines,
}: {
	schedule: Schedule;
	groupName: string;
	date: string;
	deadlines: Deadline[];
}) => {
	const [currentDate, setCurrentDate] = useState<moment.Moment>(moment(date, "DD.MM.YYYY"));
	const t = useTranslations();
	const scrollDateDiv = useRef<HTMLDivElement | null>(null);
	const scheduleElem = useRef<HTMLDivElement | null>(null);
	const [canScroll, setCanScroll] = useState(true);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { group, ...scheduleDays } = schedule;
	const times = Object.keys(scheduleDays);

	useEffect(() => {
		document.title = `Расписание на ${moment(currentDate, "DD.MM.YYYY").format("DD.MM")}`;
		if (canScroll) {
			setCurrentDate(moment(date, "DD.MM.YYYY"));
			const elemWidth = scheduleElem.current?.getBoundingClientRect().width;
			let distanceIndexes = 0;
			let monthIndexes = 0;
			const dateElementIndex = times.findIndex((time) => time === date);
			if (dateElementIndex !== -1) {
				distanceIndexes = dateElementIndex + 1;
				monthIndexes = moment(times[distanceIndexes], "DD.MM.YYYY").diff(moment(times[0], "DD.MM.YYYY"), "M");
			} else {
				let lastDiff = -Infinity;
				for (let i = 0; i < times.length; i++) {
					const time = moment(times[i], "DD.MM.YYYY");
					const dateMoment = moment(date, "DD.MM.YYYY");
					const difference = time.diff(dateMoment, "d");
					if (lastDiff < 0 && difference >= 0) {
						distanceIndexes = i + 1;
						monthIndexes = moment(times[distanceIndexes], "DD.MM.YYYY").diff(moment(times[0], "DD.MM.YYYY"), "M");

						break;
					} else {
						lastDiff = difference;
					}
				}
			}
			scrollDateDiv.current?.scroll({
				left: (elemWidth || 0) * (distanceIndexes + monthIndexes) * 1.16,
				behavior: "smooth",
			});
		} else {
			setCanScroll(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [date]);

	return (
		<div>
			<div className="flex mb-3 overflow-x-auto scrollbar-hide gap-3" ref={scrollDateDiv}>
				{times.map((time, i) => {
					const dateMoment = moment(time, "DD.MM.YYYY");
					const [deadlinesCount, dayDeadlines] = countDeadlinesForDate(deadlines, dateMoment);

					return (
						<React.Fragment key={time}>
							{moment(times?.[i - 1], "DD.MM.YYYY").get("month") !== moment(time, "DD.MM.YYYY").get("month") && (
								<p className="text-gray-500 text-center" style={{ writingMode: "vertical-lr" }}>
									{t(moment(time, "DD.MM.YYYY").get("month") + "-month")}
								</p>
							)}
							<Popover>
								<PopoverTrigger>
									<div className="relative">
										<ScheduleMenu
											ref={scheduleElem}
											group={groupName}
											locale="ru"
											currentDate={currentDate}
											time={time}
											setDate={(date) => {
												setCurrentDate(date);
												setCanScroll(false);
											}}
										/>
									</div>
								</PopoverTrigger>
								{deadlinesCount > 0 && (
									<PopoverContent className="w-80">
										<div className="space-y-2">
											<h4 className="font-medium leading-none">Дедлайны:</h4>
											{dayDeadlines.map((deadline) => (
												<div key={deadline.id} className="text-sm">
													<p className="font-medium">{deadline.name}</p>
													<p className="text-muted-foreground">
														{deadline.lesson} • {deadline.teacher}
													</p>
													{deadline.date_from && (
														<p className="text-xs text-gray-500">
															{moment(deadline.date_from).format("DD.MM")}-{moment(deadline.date_to).format("DD.MM")}
														</p>
													)}
												</div>
											))}
										</div>
									</PopoverContent>
								)}
							</Popover>
						</React.Fragment>
					);
				})}
			</div>
			{scheduleDays[currentDate.format("DD.MM.YYYY")] ? (
				<div className="space-y-4">
					<ScheduleDayCard
						date={currentDate}
						deadlines={deadlines}
						day={scheduleDays[currentDate.format("DD.MM.YYYY")]}
					/>
				</div>
			) : (
				<div className="flex p-2 justify-center items-center">
					<p className="text-lg">Выходной!</p>
					{countDeadlinesForDate(deadlines, currentDate)[0] > 0 && (
						<div className="ml-4 p-2 bg-yellow-100 rounded">
							{countDeadlinesForDate(deadlines, currentDate)[0]} дедлайн(ов)
						</div>
					)}
				</div>
			)}
		</div>
	);
};
