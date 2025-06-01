import { Button } from "@heroui/button";
import React from "react";
import Image from "next/image";

const EmailPage = () => {
	return (
		<div className="flex justify-center items-center flex-1 min-h-[80vh]">
			<div className="px-[10vw] max-md:px-2">
				<div className="flex flex-col gap-3 justify-center items-center my-44 p-5 rounded-lg">
					<p className="text-2xl text-center font-bold">Тук-тук... Вам письмо! Заберите и заходите</p>
					<p className="text-xl text-center">Отправили вам письмо с подтверждением почты</p>
					<p className="text-lg text-center">Оставили ссылку к вашей почте:</p>

					<div className="grid grid-cols-3 gap-3">
						<Button as={"a"} size="lg" fullWidth href="https://mail.yandex.ru">
							<Image src="/images/yandex_mail.svg" alt="yandex mail" width={50} height={50} />
						</Button>

						<Button as={"a"} size="lg" fullWidth href="https://mail.google.com">
							<Image src="/images/google_mail.png" alt="google mail" width={40} height={40} />
						</Button>

						<Button as={"a"} size="lg" fullWidth href="https://e.mail.ru">
							<Image src="/images/vk_mail.svg" alt="vk mail" width={75} height={75} />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EmailPage;
