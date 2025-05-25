import { $fetch } from "@/fetch";
import { ACCESS_TOKEN } from "@/shared/constants/tokens";
import { cookies } from "next/headers";
import React from "react";
import { User } from "@/entities/user";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Card } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import { RxAvatar } from "react-icons/rx";
import { Button } from "@heroui/button";
import { redirect } from "@/navigation";

const Profile = async ({ params }: { params: Promise<{ locale: string }> }) => {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get(ACCESS_TOKEN)?.value;
	console.log(accessToken);
	const res = await $fetch("/auth/me", { headers: { Authorization: `Bearer ${accessToken}` } });
	const user: User = await res.json();
	console.log(user);
	const t = await getTranslations();
	const { locale } = await params;

	if (!user) {
		notFound();
	}
	const { auth_type, bio, course, email, first_name, group_id, institute, last_name, role } = user;

	return (
		<main className="max-w-6xl mx-auto px-4 py-8">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="md:col-span-1">
					<Card className="p-6 h-full">
						<div className="flex flex-col items-center space-y-4">
							<div className="relative">
								<Avatar className="w-32 h-32 rounded-full border-4 border-white shadow">
									{first_name && last_name ? (
										<span className="text-2xl font-bold">
											{first_name[0]}
											{last_name[0]}
										</span>
									) : (
										<RxAvatar className="w-full h-full text-[--foreground]" />
									)}
								</Avatar>
							</div>

							<div className="text-center">
								<h1 className="text-2xl font-bold">
									{first_name} {last_name}
								</h1>
								<p className="text-gray-500">{email}</p>
								<div className="mt-2 inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
									{t(role)}
								</div>
							</div>

							{bio && (
								<div className="w-full mt-4">
									<h2 className="text-lg font-semibold mb-2">{t("bio")}</h2>
									<p className="text-gray-700">{bio}</p>
								</div>
							)}
						</div>
					</Card>
				</div>

				<div className="md:col-span-2">
					<Card className="p-6 h-full">
						<h2 className="text-xl font-bold mb-6 border-b pb-3">{t("details")}</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{institute && (
								<div>
									<h3 className="text-sm font-medium text-gray-500">{t("institute")}</h3>
									<p className="mt-1 text-lg">{institute}</p>
								</div>
							)}

							{course && (
								<div>
									<h3 className="text-sm font-medium text-gray-500">{t("course")}</h3>
									<p className="mt-1 text-lg">{course}</p>
								</div>
							)}

							{group_id && (
								<div>
									<h3 className="text-sm font-medium text-gray-500">{t("group")}</h3>
									<p className="mt-1 text-lg">{group_id}</p>
								</div>
							)}

							{auth_type && (
								<div>
									<h3 className="text-sm font-medium text-gray-500">{t("authType")}</h3>
									<p className="mt-1 text-lg">{t(`authType ${auth_type}`)}</p>
								</div>
							)}
						</div>

						<div className="mt-8 flex gap-2 items-center">
							<Button
								color="primary"
								onPress={async () => {
									"use server";
									redirect({ href: "/profile/edit", locale });
								}}
								className="px-4 py-2 transition-colors mr-3"
							>
								{t("editProfile")}
							</Button>
							<Button
								onPress={async () => {
									"use server";
									redirect({ href: "/change-password", locale });
								}}
								color="secondary"
								className="px-4 py-2 transition-colors"
							>
								{t("changePassword")}
							</Button>
						</div>
					</Card>
				</div>

				<div className="md:col-span-3">
					<Card className="p-6">
						<h2 className="text-xl font-bold mb-6 border-b pb-3">{t("activity")}</h2>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
							<Card className="p-4 light rounded-lg">
								<span className="text-3xl font-bold text-blue-600">12</span>
								<p className="text-gray-600 mt-2">{t("completedCourses")}</p>
							</Card>

							<Card className="p-4 light rounded-lg">
								<span className="text-3xl font-bold text-green-600">87%</span>
								<p className="text-gray-600 mt-2">{t("averageScore")}</p>
							</Card>

							<Card className="p-4 rounded-lg light">
								<span className="text-3xl font-bold text-purple-600">5</span>
								<p className="text-gray-600 mt-2">{t("activeCourses")}</p>
							</Card>
						</div>
					</Card>
				</div>
			</div>
		</main>
	);
};

export default Profile;
