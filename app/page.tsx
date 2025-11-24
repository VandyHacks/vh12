'use client'

import Countdown from "@/components/Countdown";
import { pressStart2P, vt323 } from "./layout";
import { motion } from "motion/react";

export default function Home() {
	return (
		<div className="min-h-screen w-full relative">
			<div style={{ backgroundImage: "url(stars_random_full.png)", backgroundSize: "cover", backgroundRepeat: "no-repeat" }} className="absolute inset-0 -z-1 overflow-hidden"/>
			<div style={{ lineHeight: "normal" }} className={`${vt323.className} absolute bottom-1 w-full text-center text-[30px] bg-[linear-gradient(0deg,rgba(146,69,201,0.20)_14.58%,rgba(146,69,201,0.40)_100%)] text-transparent bg-clip-text inline-block`}>
				Unleash your creativity at our hackathon—step in like a player, imagine wildly, and build what you wish existed.
				Team up, level up, and speed-run ideas from sketch to demo. Whether you`re a coder, designer, or storyteller, bring your spark and craft something unforgettable together. Be bold, be playful, be curious.
				This hackathon is your sandbox to prototype dreams, remix tech, and push limits.
			</div>
			<div style={{ lineHeight: "normal" }} className="w-full h-screen">
				<div className={`${vt323.className} pt-[90px] flex justify-center items-center flex-col gap-[10px] mb-[150px]`}>
					<p className="text-[36px] bg-[linear-gradient(90deg,#4733AE_0%,#AA52E9_100%)] text-transparent bg-clip-text inline-block">Hacking ends in!</p>
					<p className=" text-[50px] bg-[linear-gradient(90deg,#731914_0%,#D93025_99.99%)] text-transparent bg-clip-text inline-block">Hurry Up</p>
					<Countdown/>
				</div>
				<div className={`${pressStart2P.className}`}>
					<h1 className="text-[30px] md:text-[64px] uppercase header-text-shadow mb-[25px] text-center">vandyhacks xii</h1>
					<div className="w-fit mx-auto">
						<h2 
							style={{ lineHeight: "42px" }} 
							className="bg-[linear-gradient(90deg,#4733AE_0%,#9245C9_69.23%,#AA52E9_100%)] whitespace-pre-line text-center text-[12px] md:text-[20px] text-transparent bg-clip-text inline-block"
						>
							{"Vanderbilt`s Collegiate Hackathon\nNashville, TN | Mar. 23-24"}
						</h2>
					</div>
				</div>
				<motion.div 
					className="cursor-pointer max-w-[450px] max-h-[61px] mx-auto mt-[52px]"
					initial={{
						scale: 1
					}}
					whileHover={{
						scale: 1.07
					}}
					whileTap={{
						scale: 0.95
					}}
					transition={{
						type: "spring"
					}}
				>
					<img src="apply_button.svg" width={450} height={61} className=""/>
				</motion.div>
			</div>
		</div>
	);
}
