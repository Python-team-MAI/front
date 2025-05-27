import { FC } from "react";
import { useRouter } from "@/entities/i18n/routing";
import moment from "moment";
import { useTranslations } from "next-intl";
import { getDayOfWeek } from "@/shared/lib/utils/dates/getDayOfWeek";

interface ScheduleMenuProps {
	time: string;
	currentDate: moment.Moment;
	locale: string;
	group: string;
	setDate: (date: moment.Moment) => void;
	ref: React.RefObject<HTMLDivElement | null>;
}

export const ScheduleMenu: FC<ScheduleMenuProps> = ({ time, currentDate, group, setDate, ref }) => {
	const router = useRouter();
	const t = useTranslations();

	return (
		<div
			ref={ref}
			onClick={() => {
				setDate(moment(time, "DD.MM.YYYY"));
				router.replace(`/schedule/?date=${time}&group=${group}`);
			}}
			className={`flex flex-col min-w-14 min-h-14 justify-center items-center rounded-md border ${
				currentDate.format("DD.MM.YYYY") === time ? "border-[--tw-ring-color] border-large" : ""
			}`}
		>
			<p className="text-xs">{t(getDayOfWeek(time))}</p>
			<p className="text-lg">{time.split(".")[0]}</p>
		</div>
	);
};
