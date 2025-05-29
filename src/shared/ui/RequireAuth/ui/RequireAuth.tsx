import { redirect } from "@/navigation";
import { getCurrentUser } from "@/shared/lib/utils/auth/auth";
import { ReactNode } from "react";

export default async function withRequireAuth(children: ReactNode) {
	return async ({ params }: { params: Promise<{ locale: string }> }) => {
		const user = await getCurrentUser();
		const { locale } = await params;

		if (!user) {
			redirect({ href: "/ru/login", locale });
		}

		return children;
	};
}
