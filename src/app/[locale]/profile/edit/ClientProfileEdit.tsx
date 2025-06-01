"use client";

import { User } from "@/entities/user";
import { FC, ReactNode } from "react";
// import { $fetch } from '@/fetch'
import React, { useState } from "react";
import { Card } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import { RxAvatar } from "react-icons/rx";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Input, Textarea } from "@heroui/input";
import { Group, GroupSelector } from "@/entities/group";
import { pick } from "@/shared/lib/helpers/pick";
import { $fetch } from "@/fetch";

interface ClientProfileEditProps {
	user: User;
	groups: Group[];
	accessToken: string;
}

export const ClientProfileEdit: FC<ClientProfileEditProps> = ({ groups, user, accessToken }) => {
	const t = useTranslations();
	const router = useRouter();
	const [saving, setSaving] = useState(false);
	const [formData, setFormData] = useState<
		Pick<User, "bio" | "course" | "email" | "first_name" | "group_id" | "institute" | "last_name">
	>(pick(user, ["bio", "course", "email", "first_name", "group_id", "institute", "last_name"]));
	const [error, setError] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			setSaving(true);

			const res = await $fetch<false>("/auth/users/me", {
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json",
				},
				data: formData,
			});

			console.log(accessToken, formData);

			if (res.status >= 300) {
				throw new Error("Failed to update profile");
			}

			router.push("/profile");
			router.refresh();
		} catch (error) {
			console.error("Error updating profile:", error);
			setError(t("updateError"));
		} finally {
			setSaving(false);
		}
	};

	const onChangeGroups = (key: string, value: string) => {
		if (key === "level") {
			return;
		} else if (key === "group_name") {
			setFormData((prev) => ({ ...prev, group_id: value }));
		} else {
			setFormData((prev) => ({ ...prev, [key]: value }));
		}
	};

	return (
		<main className="max-w-6xl mx-auto px-4 py-8">
			<Card className="p-6 mb-6">
				<div className="flex items-center mb-6">
					<Button onPress={() => router.back()} className="mr-4 justify-self-end">
						← {t("back")}
					</Button>
					<h1 className="text-xl justify-self-center font-bold">{t("editProfile")}</h1>
				</div>

				{error && <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">{error}</div>}

				<form onSubmit={handleSubmit}>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
						<div className="md:col-span-2 flex flex-col md:flex-row items-center gap-6">
							<div className="relative">
								<Avatar className="w-32 h-32 rounded-full border-4 border-white shadow">
									{formData.first_name && formData.last_name ? (
										<span className="text-2xl font-bold">
											{formData.first_name[0]}
											{formData.last_name[0]}
										</span>
									) : (
										<RxAvatar className="w-full h-full text-[--foreground]" />
									)}
								</Avatar>
							</div>

							<div className="flex-1">
								<label className="block text-sm font-medium text-gray-700 mb-1">{t("profilePicture")}</label>
								<Button isDisabled type="button" color="secondary" className="mt-2">
									{t("uploadPicture")} [{t("soon")}]
								</Button>
							</div>
						</div>

						<Input
							label={t("first_name")}
							id="first_name"
							name="first_name"
							value={formData.first_name || ""}
							onChange={handleChange}
							required
							className="w-full"
						/>

						<Input
							label={t("last_name")}
							id="last_name"
							name="last_name"
							value={formData.last_name || ""}
							onChange={handleChange}
							required
							className="w-full"
						/>

						<div className="md:col-span-2">
							<Input
								label={t("email")}
								id="email"
								name="email"
								type="email"
								value={formData.email || ""}
								onChange={handleChange}
								required
								className="w-full"
							/>
						</div>

						<div className="md:col-span-2">
							<Textarea
								label={t("bio")}
								id="bio"
								name="bio"
								value={formData.bio || ""}
								onChange={handleChange}
								rows={4}
								className="w-full"
							/>
						</div>
						<GroupSelector
							CourseWrapper={({ children }: { children: ReactNode }) => (
								<div className="grid grid-cols-3 gap-2 md:col-span-2">{children}</div>
							)}
							setValue={onChangeGroups}
							groups={groups}
							GroupsWrapper={({ children }: { children: ReactNode }) => (
								<div className="grid grid-cols-3 gap-2 md:col-span-2">{children}</div>
							)}
						/>
					</div>

					<div className="grid grid-cols-2 gap-2">
						<Button type="button" color="secondary" onPress={() => router.back()} className="px-4 py-2">
							{t("cancel")}
						</Button>
						<Button type="submit" color="primary" isLoading={saving} disabled={saving} className="px-4 py-2">
							{t("saveChanges")}
						</Button>
					</div>
				</form>
			</Card>
		</main>
	);
};
