import { redirect } from "@/navigation";
import { getCurrentUser } from "@/shared/lib/utils/auth/auth";
import { ReactNode } from "react";

export default async function withRequireAuth(children: ReactNode) {
	return async ({ params }: { params: Promise<{ locale: string }> }) => {
		const user = await getCurrentUser();
		const { locale } = await params;
		console.log(params);

		if (!user) {
			redirect({ href: "/login", locale });
		}

		return children;
	};
}
