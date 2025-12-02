'use client'

import Countdown from "@/components/Countdown";
import { motion } from "motion/react";
import { pressStart2P, vt323 } from "../layout"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {

	const router = useRouter();

	return (
		<>
			<div style={{ lineHeight: "normal" }} className={`${vt323.className} absolute bottom-1 w-full text-center text-[15px] md:text-[30px] bg-[linear-gradient(0deg,rgba(146,69,201,0.20)_14.58%,rgba(146,69,201,0.40)_100%)] text-transparent bg-clip-text inline-block`}>
				Unleash your creativity at our hackathon—step in like a player, imagine wildly, and build what you wish existed.
				Team up, level up, and speed-run ideas from sketch to demo. Whether you`re a coder, designer, or storyteller, bring your spark and craft something unforgettable together. Be bold, be playful, be curious.
				This hackathon is your sandbox to prototype dreams, remix tech, and push limits.
			</div>
			<div style={{ lineHeight: "normal" }} className="w-full h-screen relative">
				<div className={`${vt323.className} absolute top-1/5 -translate-y-1/2 left-1/2 -translate-x-1/2 flex justify-center items-center flex-col gap-[10px]`}>
					<p className="text-[25px] md:text-[36px] bg-[linear-gradient(90deg,#4733AE_0%,#AA52E9_100%)] text-transparent bg-clip-text inline-block">Hacking ends in!</p>
					<p className="text-[37px] md:text-[50px] bg-[linear-gradient(90deg,#731914_0%,#D93025_99.99%)] text-transparent bg-clip-text inline-block">Hurry Up</p>
					<Countdown/>
				</div>
				<div className={`${pressStart2P.className} absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`}>
					<h1 className="text-[30px] sm:text-[50px] md:text-[64px] uppercase header-text-shadow mb-[25px] text-center">vandyhacks xii</h1>
					<div className="w-fit mx-auto">
						<h2 
							className="bg-[linear-gradient(90deg,#4733AE_0%,#9245C9_69.23%,#AA52E9_100%)] leading-normal md:leading-[42px] whitespace-nowrap text-nowrap whitespace-pre text-center text-[9px] md:text-[20px] text-transparent bg-clip-text inline-block"
						>
							{"Vanderbilt`s Collegiate Hackathon\nNashville, TN | Mar. 23-24"}
						</h2>
					</div>
				</div>
				<motion.div 
					className="cursor-pointer max-w-[450px] max-h-[61px] absolute top-2/3 -translate-y-1/2 left-1/2 -translate-x-1/2"
					initial={{
						scale: 1
					}}
					whileHover={{
						scale: 1.05
					}}
					whileTap={{
						scale: 0.95
					}}
					transition={{
						type: "spring"
					}}
					onClick={() => router.push("/sign-in")}
				>
					<Image src="apply_button.svg" alt="Apply button" width={450} height={61} className=""/>
				</motion.div>
			</div>
		</>
	);
}
