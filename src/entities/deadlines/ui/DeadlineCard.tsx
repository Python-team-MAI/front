import { getDeadlineStatus } from "@/shared/lib/utils/deadlines/getDeadlineStatus";
import React, { FC } from "react";
import { Deadline } from "../model/types/Deadline";
import { Card, CardHeader } from "@heroui/card";
import { Badge } from "@heroui/badge";
import { Avatar } from "@heroui/avatar";
import { getInitials } from "@/shared/lib/utils/deadlines/getInitials";
import { format, parseISO } from "date-fns";
import { Clock } from "lucide-react";

interface Props {
	deadline: Deadline;
}

export const DeadlineCard: FC<Props> = ({ deadline }) => {
	const { status, color } = getDeadlineStatus(deadline.date_to);

	return (
		<Card className="overflow-hidden p-4">
			<div className={`h-1 ${color.split(" ")[0]}`} />
			<CardHeader className="pb-2">
				<div className="flex justify-between items-start">
					<div>
						<p className="text-lg font-medium">{deadline.name}</p>
						<p className="text-sm text-gray-500">
							{deadline.lesson} • {deadline.group}
						</p>
					</div>
					<Badge className={color}>{status}</Badge>
				</div>
			</CardHeader>
			<div className="p-4 pt-0">
				<p className="text-sm mb-4">{deadline.description}</p>

				<div className="flex justify-between items-center">
					<div className="flex items-center gap-2">
						<Avatar className="h-8 w-8">{getInitials(deadline.author.first_name, deadline.author.last_name)}</Avatar>
						<div className="text-sm">
							<p className="font-medium">{deadline.teacher}</p>
							<p className="text-xs text-gray-500">
								Assigned by {deadline.author.first_name} {deadline.author.last_name}
							</p>
						</div>
					</div>

					<div className="flex items-center gap-1 text-sm text-gray-500">
						<Clock className="h-4 w-4" />
						<p>Due {format(parseISO(deadline.date_to), "MMM d, yyyy")}</p>
					</div>
				</div>
			</div>
		</Card>
	);
};
