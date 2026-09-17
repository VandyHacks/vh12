'use client'

import Countdown from "@/components/Countdown";
import { motion } from "motion/react";
import { pressStart2P, vt323 } from "@/components/Fonts";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import bg from "@/public/stars_random_full.png";
import Lenis from "lenis";
import { FAQ_ELEMENTS } from "@/lib/constants";
import FAQElement from "@/components/FAQElement";
import { Globe, Instagram, Mail } from "lucide-react";

export default function Home() {
	useEffect(() => {
		console.log(
			"%c🐞 Found a bug? Please send a message to dev@vandyhacks.org describing the issue!",
			"color: white; font-size: 16px; font-weight: bold; padding: 4px;"
		);
	}, []);

	const isMobile = () => {
		if (typeof window !== "undefined") {
			return window.matchMedia("(max-width: 900px) or (max-height: 500px)").matches;
		}
		return false;
	};
	const [mobile, setMobile] = useState<boolean>(isMobile());

	useEffect(() => {
		const onResize = () => setMobile(isMobile());
		const lenis = new Lenis({ autoRaf: true });
		window.addEventListener("resize", onResize);

		if (window.location.hash) {
			const el = document.querySelector(window.location.hash);
			if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
		}

		return () => {
			window.removeEventListener("resize", onResize);
			lenis.destroy();
		};
	}, []);

	return (
		<div>
			<div
				style={{ lineHeight: "normal", backgroundImage: `url(${bg.src})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
				className="pt-12 pb-8 h-screen lg:pt-25 lg:pb-25 h-full auto-rows-fr relative grid sm-landscape-grid place-items-center z-1"
			>
				<div className={`${vt323.className} opacity-0 lg:opacity-100 absolute bottom-[1px] w-full text-center text-[15px] md:text-[25px] bg-[linear-gradient(0deg,rgba(146,69,201,0.20)_14.58%,rgba(146,69,201,0.40)_100%)] text-transparent bg-clip-text inline-block`}>
					Unleash your creativity at our hackathon—step in like a player, imagine wildly, and build what you wish existed.
					Team up, level up, and speed-run ideas from sketch to demo. Whether you&apos;re a coder, designer, or storyteller, bring your spark and craft something unforgettable together. Be bold, be playful, be curious.
					This hackathon is your sandbox to prototype dreams, remix tech, and push limits.
				</div>
				<div className={`${vt323.className} sm-landscape-countdown mb-10 flex justify-center items-center flex-col gap-[10px]`}>
					<p className="text-[25px] md:text-[36px] bg-[linear-gradient(90deg,#4733AE_0%,#AA52E9_100%)] text-transparent bg-clip-text inline-block">Hacking starts in!</p>
					<Countdown />
				</div>
				<div className={`${pressStart2P.className} w-full`}>
					<h1 className="text-[30px] text-white relative landscape:translate-y-[10px] sm:text-[50px] mx-8 md:text-[64px] uppercase header-text-shadow mb-[20px] text-center z-3">vandyhacks xiii</h1>
					<h2 className="w-full bg-[linear-gradient(90deg,#4733AE_0%,#9245C9_69.23%,#AA52E9_100%)] leading-normal md:leading-[42px] whitespace-nowrap text-nowrap whitespace-pre text-center text-[9px] md:text-[20px] text-transparent bg-clip-text inline-block">
						{"Vanderbilt`s Collegiate Hackathon\nNashville, TN | March 2027"}
					</h2>
				</div>
				<div className="w-full overflow-hidden">
					<motion.div
						className="w-full pointer-events-none cursor-pointer outline-none active:outline-none"
						initial={{ scale: 1 }}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						transition={{ type: "spring" }}
					>
						<Button text="Applications Open Soon" />
					</motion.div>
				</div>
			</div>

			<div className="h-screen relative">
				<div className="absolute inset-0 bg-cover bg-no-repeat rotate-180" style={{ backgroundImage: `url(${bg.src})` }} />
				<div className={`${pressStart2P.className} absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full px-5 max-w-6xl`}>
					<h1 className="sm:text-[60px] text-[30px] text-center">About</h1>
					<p className="text-center text-[clamp(10px,1vw,13px)] mt-10" style={{ lineHeight: mobile ? "20px" : "42px" }}>
						Code, collaborate, learn, and network at Vanderbilt&apos;s official collegiate hackathon, VandyHacks! This in-person event brings students together for workshops, games, networking, meals, speaker events, and a weekend of building ambitious projects. Whether this is your first hackathon or your thirteenth, we hope to see you at VandyHacks XIII in March 2027. Go Hackers!
					</p>
				</div>
			</div>

			<div id="faq" className="h-screen relative">
				<div className="absolute top-0 w-full h-screen bg-cover bg-no-repeat -z-1" style={{ backgroundImage: `url(${bg.src})` }} />
				<div className="grid grid-rows-[auto_1fr] gap-8 h-full max-w-6xl mx-5 xl:mx-auto pt-10 pb-20">
					<div className="flex flex-col items-center justify-center">
						<p className={`${vt323.className} md:self-start sm:text-[40px] text-[25px] text-nowrap`}>$ cat FAQ.yml</p>
						<p className={`${pressStart2P.className} sm:text-[60px] text-[30px]`}>FAQ</p>
					</div>
					<div className="overflow-y-scroll scrollbar space-y-2 pr-2 max-h-[80vh] scroll-smooth" data-lenis-prevent>
						{FAQ_ELEMENTS.map((val, key) => (
							<FAQElement question={val.question} answer={val.answer} key={key} />
						))}
					</div>
				</div>
			</div>

			<div className="min-h-24 relative overflow-hidden py-5">
				<div className="absolute top-0 w-full h-screen bg-cover bg-no-repeat rotate-180 -z-1" style={{ backgroundImage: `url(${bg.src})` }} />
				<div className="max-w-6xl mx-5 xl:mx-auto flex items-center justify-start min-h-14 gap-5 flex-wrap leading-[10px]">
					<a href="mailto:info@vandyhacks.org" className={`${vt323.className} flex items-center gap-2 text-xl tracking-wider text-blue-300 hover:text-white`}>
						<Mail size={22} /> info@vandyhacks.org
					</a>
					<a aria-label="VandyHacks on Instagram" href="https://www.instagram.com/vandyhacks" target="_blank" rel="noreferrer"><Instagram className="cursor-pointer hover:text-blue-300 transition-colors ease-in-out duration-500" /></a>
					<a aria-label="VandyHacks links" href="https://linktr.ee/vandyhacks" target="_blank" rel="noreferrer"><Globe className="cursor-pointer hover:text-blue-300 transition-colors ease-in-out duration-500" /></a>
					<div className="flex-1" />
					<a target="_blank" rel="noreferrer" href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md" className={`${vt323.className} text-xl tracking-wider text-blue-300`}>MLH Code of Conduct</a>
				</div>
			</div>
		</div>
	);
}
