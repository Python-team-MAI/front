import dynamic from "next/dynamic";

export const DeadlineCreateModal = dynamic(() => import("./DeadlineCreateModal"), {
	ssr: false,
});
