"use client";
import { Group, GroupSelector } from "@/entities/group";
import { Drawer, DrawerContent, DrawerHeader } from "@heroui/drawer";
import { useTranslations } from "next-intl";
import { useRouter } from "@/navigation";
import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

interface GroupDrawerProps {
	groups: Group[];
	currentGroup: string;
}

export const GroupsWrapper: FC<{ children: ReactNode }> = ({ children }) => (
	<div className="grid grid-cols-3 gap-2">{children}</div>
);
export const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
	const t = useTranslations();

	return (
		<DrawerContent className="p-2 flex flex-col gap-2">
			<DrawerHeader>{t("groups")}</DrawerHeader>
			{children}
		</DrawerContent>
	);
};

export const GroupDrawer: FC<GroupDrawerProps> = ({ currentGroup: initialGroup, groups }) => {
	const [currentGroup, setCurrentGroup] = useState("");
	const t = useTranslations();
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();
	const searchParams = useSearchParams();
	const ref = useRef<HTMLElement>(null);

	useEffect(() => {
		setCurrentGroup(initialGroup);
	}, [initialGroup]);

	const onGroupChange = (key: string, value: string) => {
		if (key === "group_name") {
			router.replace(`/schedule?group=${value}&date=${searchParams.get("date")}`);
			setIsOpen(false);
		}
	};

	return (
		<>
			<div className="border rounded-lg p-2" onClick={() => setIsOpen(true)}>
				<p className="text-sm">{t("group")}</p>
				<p className="text-lg">{currentGroup}</p>
			</div>
			<Drawer
				ref={ref}
				placement="left"
				isOpen={isOpen}
				isDismissable={false}
				onOpenChange={(isOpen) => setIsOpen(isOpen)}
			>
				<GroupSelector setValue={onGroupChange} groups={groups} GroupsWrapper={GroupsWrapper} Wrapper={Wrapper} />
			</Drawer>
		</>
	);
};
