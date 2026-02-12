'use client'

import Countdown from "@/components/Countdown";
import { motion, useScroll } from "motion/react";
import { pressStart2P, vt323 } from "@/components/Fonts"
import { useRouter } from "next/navigation";
import Button from "@/components/Button"
import { useEffect, useState } from "react";
import Background from "@/components/Background";
import bg from "@/public/stars_random_full.png"
import Lenis from 'lenis'
import { FAQ_ELEMENTS } from "@/lib/constants";
import FAQElement from "@/components/FAQElement";
import { Globe, Instagram } from "lucide-react";

export default function Home() {

	const router = useRouter();
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
	}
	const [mobile, setMobile] = useState<boolean>(isMobile());

	useEffect(() => {
		const onResize = () => setMobile(isMobile());
		const lenis = new Lenis({ autoRaf: true });
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, []);

	return (
		<div className="">
			<div style={{ lineHeight: "normal", backgroundImage: `url(${bg.src})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }} className="pt-12 pb-8 h-screen lg:pt-25 lg:pb-25 h-full auto-rows-fr relative grid sm-landscape-grid place-items-center z-1">
				<Background/>
				<div className={`${vt323.className} opacity-0 lg:opacity-100 absolute bottom-[1px] w-full text-center text-[15px] md:text-[25px] bg-[linear-gradient(0deg,rgba(146,69,201,0.20)_14.58%,rgba(146,69,201,0.40)_100%)] text-transparent bg-clip-text inline-block`}>
					Unleash your creativity at our hackathon—step in like a player, imagine wildly, and build what you wish existed.
					Team up, level up, and speed-run ideas from sketch to demo. Whether you`re a coder, designer, or storyteller, bring your spark and craft something unforgettable together. Be bold, be playful, be curious.
					This hackathon is your sandbox to prototype dreams, remix tech, and push limits.
				</div>
				<div className={`${vt323.className} sm-landscape-countdown mb-10 flex justify-center items-center flex-col gap-[10px]`}>
					<p className="text-[25px] md:text-[36px] bg-[linear-gradient(90deg,#4733AE_0%,#AA52E9_100%)] text-transparent bg-clip-text inline-block">Hacking ends in!</p>
					<p className="text-[37px] md:text-[50px] bg-[linear-gradient(90deg,#731914_0%,#D93025_99.99%)] text-transparent bg-clip-text inline-block">Hurry Up</p>
					<Countdown/>
				</div>
				<div className={`${pressStart2P.className} w-full`}>
					<h1 className="text-[30px] text-white relative landscape:translate-y-[10px] sm:text-[50px] mx-8 md:text-[64px] uppercase header-text-shadow mb-[20px] text-center z-3">vandyhacks xii</h1>
					<h2 
						className="w-full bg-[linear-gradient(90deg,#4733AE_0%,#9245C9_69.23%,#AA52E9_100%)] leading-normal md:leading-[42px] whitespace-nowrap text-nowrap whitespace-pre text-center text-[9px] md:text-[20px] text-transparent bg-clip-text inline-block"
					>
						{"Vanderbilt`s Collegiate Hackathon\nNashville, TN | Mar. 21-22"}
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
						<Button text="Apply Now" animate onClick={() => router.push("/sign-in")} />
					</motion.div>
				</div>
			</div>
			<div className="h-screen relative">
				<div className="absolute inset-0 bg-cover bg-no-repeat rotate-180" style={{ backgroundImage: `url(${bg.src})` }}/>
				<div className={`${pressStart2P.className} absolute top-1/2 -translate-y-1/2 w-full px-5 sm:px-20`}>
					<h1 className="sm:text-[60px] text-[30px] text-center">About</h1>
					<p className="text-center text-[clamp(10px,1vw,13px)] mt-10" style={{ lineHeight: mobile ? "20px" : "42px" }}>
						Code, collaborate, learn, and network at Vanderbilt's official collegiate hackathon, VandyHacks! As one of the largest hackathons in the south, this in-person event includes both student and company-led workshops, a career fair, games, events, full two-day catering, internship panels, speaker events, and the premier 24-hour hackathon with thousand of dollars worth of prizes. VandyHacks has had thousands of projects submitted by students over the course of 12 incredible years, and we hope you can join us in this March, 21th-22th. We hope to see you at VandyHacks XII! Go Hackers!
					</p>
				</div>
			</div>
			<div className="h-screen relative" style={{ backgroundImage: `url(${bg.src})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
				<div className="grid grid-rows-[auto_1fr] gap-2 h-full max-w-6xl mx-5 xl:mx-auto pt-10 pb-20">
					<div className="flex flex-col items-center justify-center">
						<p className={`${vt323.className} md:self-start sm:text-[40px] text-[25px] text-nowrap`}>$ cat FAQ.yml</p>
						<p className={`${pressStart2P.className} sm:text-[60px] text-[30px]`}>FAQ</p>
					</div>
					<div className="overflow-y-scroll scrollbar space-y-2 pr-2 max-h-[80vh] scroll-smooth" data-lenis-prevent>
						{
							FAQ_ELEMENTS.map((val, key) => (
								<FAQElement question={val.question} answer={val.answer} key={key}/>
							))
						}
					</div>
				</div>
			</div>
			<div className="h-20 relative overflow-hidden">
				<div className="absolute top-0 w-full h-screen bg-cover bg-no-repeat rotate-180 -z-1" style={{ backgroundImage: `url(${bg.src})` }} />
				<div className="max-w-6xl px-5 xl:mx-auto flex items-center justify-start h-full gap-5 flex-wrap leading-[10px]">
					<Instagram className="cursor-pointer hover:text-blue-300 transition-colors ease-in-out duration-500" onClick={() => window.open("https://www.instagram.com/vandyhacks", "_blank")?.focus()}/>
					<Globe className="cursor-pointer hover:text-blue-300 transition-colors ease-in-out duration-500" onClick={() => window.open("https://linktr.ee/vandyhacks", "_blank")?.focus()} />
					<div className="flex-1"/>
					<a target="_blank" href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md" className={`${vt323.className} text-xl tracking-wider text-blue-300`}>MLH Code of Conduct</a>
				</div>
			</div>
		</div>
	);
}
