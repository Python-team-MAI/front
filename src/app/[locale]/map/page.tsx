import { INode, Office } from "@/entities/map";
import { UniversityMap } from "@/features/UniversityMap";
import { Floors } from "@/features/UniversityMap/ui/UniversityMap";
import { $fetch } from "@/fetch";
import { Locale, redirect } from "@/navigation";
import { ACCESS_TOKEN } from "@/shared/constants/tokens";
import { cookies } from "next/headers";
import React from "react";

const MapPage = async (props: { searchParams: Promise<{ floor: string }>; params: Promise<{ locale: Locale }> }) => {
	const { floor } = await props.searchParams;
	const { locale } = await props.params;

	if (!Number(floor)) {
		redirect({ href: "/map?floor=1", locale });
	}

	const cookieStore = await cookies();
	const accessToken = cookieStore.get(ACCESS_TOKEN);

	const res3 = await $fetch("/offices/map/floor/" + 3, { headers: { Authorization: `Bearer ${accessToken}` } });
	const map3 = (await res3.json()) as { offices: Office[]; nodes: INode[] };

	const res4 = await $fetch("/offices/map/floor/" + 4, { headers: { Authorization: `Bearer ${accessToken}` } });
	const map4 = (await res4.json()) as { offices: Office[]; nodes: INode[] };

	const verticalsRes = await fetch(`${process.env.NEXT_PUBLIC_STATIC_URL}/all_vertical_connections.json`);
	const verticals = await verticalsRes.json();

	return <UniversityMap initFloor={Number(floor) as Floors} map3={map3} map4={map4} verticals={verticals} />;
};

export default MapPage;
