'use client'

import Countdown from "@/components/Countdown";
import { motion, useScroll } from "motion/react";
import { pressStart2P, vt323 } from "@/components/Fonts"
import { useRouter } from "next/navigation";
import Button from "@/components/Button"
import { useEffect, useState } from "react";
import Background from "@/components/Background";
import bg from "@/public/stars_random_full.png"
import bg1 from "@/public/about_background.png"
import Lenis from 'lenis'
import StarBackground from "@/components/StarBackground";

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
			return window.matchMedia("(max-width: 767px)").matches;
		}
		return false;
	}
	const [mobile, setMobile] = useState<boolean>(isMobile());

	useEffect(() => {
		const onResize = () => setMobile(isMobile());
		window.addEventListener("resize", onResize);
		const lenis = new Lenis({
			autoRaf: true,
		});
		return () => window.removeEventListener("resize", onResize);
	}, []);


	return (
		<div className="relative">
			<StarBackground/>
			<div style={{ lineHeight: "normal" }} className="pt-12 bg-transparent pb-8 h-screen lg:pt-25 lg:pb-25 h-screen auto-rows-fr relative grid sm-landscape-grid place-items-center z-1">
				<Background/>
				<div className={`${vt323.className} sm-landscape-text absolute bottom-0 w-full text-center text-[15px] md:text-[25px] bg-[linear-gradient(0deg,rgba(146,69,201,0),rgba(146,69,201,0.40)_100%)] text-transparent bg-clip-text inline-block`}>
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
						{"Vanderbilt`s Collegiate Hackathon\nNashville, TN | Mar. 23-24"}
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
			<div className="min-h-screen relative mt-2 bg-transparent flex flex-col">
				<div className={`${pressStart2P.className} width-full flex-1 flex justify-center items-center lg:items-end sm-landscape-text-container h-full mx-5 sm:mx-20`}>
					<div>
						<h1 className="sm:text-[60px] text-[30px] text-center">About</h1>
						<p className="text-center text-[clamp(10px,1vw,13px)] mt-10 leading-[20px] sm:leading-[42px]">Code, collaborate, learn, and network at Vanderbilt's official collegiate hackathon, VandyHacks! As one of the largest hackathons in the south, this in-person event includes both student and company-led workshops, a career fair, games, events, full two-day catering, internship panels, speaker events, and the premier 24-hour hackathon with thousand of dollars worth of prizes. VandyHacks has had thousands of projects submitted by students over the course of 12 incredible years, and we hope you can join us in this September, 28th-29th. We hope to see you on the racetrack at VandyHacks XI! Go Hackers!</p>
					</div>
				</div>

			</div>
		</div>
	);
}
