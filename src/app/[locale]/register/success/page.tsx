import { Locale, redirect } from "@/navigation";
import { Button } from "@heroui/button";
import React from "react";

const EmailPage = ({ params }: { params: { locale: Locale } }) => {
	return (
		<div className="flex justify-center items-center flex-1 min-h-[80vh]">
			<div className="px-[10vw] max-md:px-2">
				<div className="flex flex-col gap-3 justify-center items-center my-44 p-5 rounded-lg">
					<p className="text-2xl text-center font-bold">Вы успешно зарегистрировались!</p>
					<p className="text-2xl text-center font-bold">Добро пожаловать!</p>
					<p className="text-xl text-center">Заходите и будьте в курсе жизни МАИ!</p>

					<Button
						size="lg"
						fullWidth
						color="primary"
						onPress={async () => {
							"use server";
							redirect({ href: "/login", locale: params.locale });
						}}
					>
						Авторизация
					</Button>
				</div>
			</div>
		</div>
	);
};

export default EmailPage;
