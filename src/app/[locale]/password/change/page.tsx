import React from "react";
import { cookies } from "next/headers";
import { ACCESS_TOKEN } from "@/shared/constants/tokens";
import { ChangePasswordContent } from "./content";

const ForgotPasswordPage = async ({ searchParams }: { searchParams: Promise<{ token: string }> }) => {
	const { token } = await searchParams;
	const cookieStore = await cookies();
	const accessToken = cookieStore.get(ACCESS_TOKEN);

	return <ChangePasswordContent accessToken={accessToken!.value} token={token} />;
};

export default ForgotPasswordPage;
