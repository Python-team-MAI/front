import { Button } from "@heroui/button";
import React from "react";

const EmailPage = async () => {
	return (
		<div className="flex justify-center items-center flex-1 min-h-[80vh]">
			<div className="px-[10vw] max-md:px-2">
				<div className="flex flex-col gap-3 justify-center items-center my-44 p-5 rounded-lg">
					<p className="text-2xl text-center font-bold">Вы успешно авторизировались!</p>
					<p className="text-2xl text-center font-bold">Добро пожаловать!</p>
					<p className="text-xl text-center">Заходите и будьте в курсе жизни МАИ!</p>

					<Button as="a" size="lg" fullWidth color="primary" href="https://t.me/rutaskmanager_bot">
						К Вашему Ассистенту
					</Button>
				</div>
			</div>
		</div>
	);
};

export default EmailPage;
