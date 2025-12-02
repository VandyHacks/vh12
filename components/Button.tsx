import { pressStart2P } from "@/app/layout";
import { cn } from "@/lib/utils";
import { animate } from "motion";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

export default function Button({ text, onClick, animate = false }: { text: string, onClick?: () => Promise<void> | void, animate?: boolean }) {

    const [clicked, setClicked] = useState<boolean>(false);

    const clickedRef = useRef<boolean>(false);

    const onClick_ = async () => {

        if (clickedRef.current) return;
        clickedRef.current = true;
        if (animate)
            setClicked(true);
        if (onClick) {
            await onClick();
        }

    };

    const variants: any = {
        initial: {
            y: 4,
            opacity: 0
        },
        animate: {
            y: -7,
            opacity: 1,
            transition: {
                y: {
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 1.25,
                    ease: "circInOut"
                }
            },
        }
    };

    return (
        <div onClick={onClick_} className="pointer-events-auto relative w-[300px] mx-auto md:w-[400px] lg:w-[450px]">
            <AnimatePresence>
                {
                    clicked ? 
                    <motion.div
                        animate="animate"
                        initial="initial"
                        transition={{
                            staggerChildren: 0.25
                        }}
                        key="loader"
                        className="flex flex-row gap-2 items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                        <motion.div variants={variants} className="w-[10px] h-[10px] rounded-full bg-[#9245C9]"></motion.div>
                        <motion.div variants={variants} className="w-[10px] h-[10px] rounded-full bg-[#9245C9]"></motion.div>
                        <motion.div variants={variants} className="w-[10px] h-[10px] rounded-full bg-[#9245C9]"></motion.div>
                        <motion.div variants={variants} className="w-[10px] h-[10px] rounded-full bg-[#9245C9]"></motion.div>
                    </motion.div>
                        :
                    <motion.p 
                        key="text" 
                        className={cn(`${pressStart2P.className} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#AA52E9] text-nowrap`, text.length > 10 ? "text-[clamp(13px,1.8vw,20px)]" : "text-[clamp(15px,2vw,25px)] ")}
                        exit={{
                            opacity: 0
                        }}
                        initial={{
                            opacity: 1
                        }}
                    >
                        {text}
                    </motion.p>
                }
            </AnimatePresence>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 459 70" fill="none">
                <g filter="url(#filter0_dd_112_36)">
                    <mask id="path-1-outside-1_112_36" maskUnits="userSpaceOnUse" x="0" y="0" width="455" height="66" fill="black">
                        <rect fill="white" width="455" height="66" />
                        <path d="M428.751 2V8.10547H436.827V16.5H444.007V23.5996H444.054V25.6582H452.083V41.8574H444.054V48.3662H436.396V57.0352H428.737V63.2266H413.421V63.0234H40.6484V63.2266H25.332V57.1211H17.2559V48.7266H10.0762V41.627H10.0293V39.5684H2V23.3691H10.0293V16.8604H17.6875V8.19141H25.3457V2H428.751Z" />
                    </mask>
                    <path d="M428.751 2V8.10547H436.827V16.5H444.007V23.5996H444.054V25.6582H452.083V41.8574H444.054V48.3662H436.396V57.0352H428.737V63.2266H413.421V63.0234H40.6484V63.2266H25.332V57.1211H17.2559V48.7266H10.0762V41.627H10.0293V39.5684H2V23.3691H10.0293V16.8604H17.6875V8.19141H25.3457V2H428.751Z" fill="white" />
                    <path d="M428.751 2H430.751V0H428.751V2ZM428.751 8.10547H426.751V10.1055H428.751V8.10547ZM436.827 8.10547H438.827V6.10547H436.827V8.10547ZM436.827 16.5H434.827V18.5H436.827V16.5ZM444.007 16.5H446.007V14.5H444.007V16.5ZM444.007 23.5996H442.007V25.5996H444.007V23.5996ZM444.054 23.5996H446.054V21.5996H444.054V23.5996ZM444.054 25.6582H442.054V27.6582H444.054V25.6582ZM452.083 25.6582H454.083V23.6582H452.083V25.6582ZM452.083 41.8574V43.8574H454.083V41.8574H452.083ZM444.054 41.8574V39.8574H442.054V41.8574H444.054ZM444.054 48.3662V50.3662H446.054V48.3662H444.054ZM436.396 48.3662V46.3662H434.396V48.3662H436.396ZM436.396 57.0352V59.0352H438.396V57.0352H436.396ZM428.737 57.0352V55.0352H426.737V57.0352H428.737ZM428.737 63.2266V65.2266H430.737V63.2266H428.737ZM413.421 63.2266H411.421V65.2266H413.421V63.2266ZM413.421 63.0234H415.421V61.0234H413.421V63.0234ZM40.6484 63.0234V61.0234H38.6484V63.0234H40.6484ZM40.6484 63.2266V65.2266H42.6484V63.2266H40.6484ZM25.332 63.2266H23.332V65.2266H25.332V63.2266ZM25.332 57.1211H27.332V55.1211H25.332V57.1211ZM17.2559 57.1211H15.2559V59.1211H17.2559V57.1211ZM17.2559 48.7266H19.2559V46.7266H17.2559V48.7266ZM10.0762 48.7266H8.07617V50.7266H10.0762V48.7266ZM10.0762 41.627H12.0762V39.627H10.0762V41.627ZM10.0293 41.627H8.0293V43.627H10.0293V41.627ZM10.0293 39.5684H12.0293V37.5684H10.0293V39.5684ZM2 39.5684H0V41.5684H2V39.5684ZM2 23.3691V21.3691H0V23.3691H2ZM10.0293 23.3691V25.3691H12.0293V23.3691H10.0293ZM10.0293 16.8604V14.8604H8.0293V16.8604H10.0293ZM17.6875 16.8604V18.8604H19.6875V16.8604H17.6875ZM17.6875 8.19141V6.19141H15.6875V8.19141H17.6875ZM25.3457 8.19141V10.1914H27.3457V8.19141H25.3457ZM25.3457 2V0H23.3457V2H25.3457ZM428.751 2H426.751V8.10547H428.751H430.751V2H428.751ZM428.751 8.10547V10.1055H436.827V8.10547V6.10547H428.751V8.10547ZM436.827 8.10547H434.827V16.5H436.827H438.827V8.10547H436.827ZM436.827 16.5V18.5H444.007V16.5V14.5H436.827V16.5ZM444.007 16.5H442.007V23.5996H444.007H446.007V16.5H444.007ZM444.007 23.5996V25.5996H444.054V23.5996V21.5996H444.007V23.5996ZM444.054 23.5996H442.054V25.6582H444.054H446.054V23.5996H444.054ZM444.054 25.6582V27.6582H452.083V25.6582V23.6582H444.054V25.6582ZM452.083 25.6582H450.083V41.8574H452.083H454.083V25.6582H452.083ZM452.083 41.8574V39.8574H444.054V41.8574V43.8574H452.083V41.8574ZM444.054 41.8574H442.054V48.3662H444.054H446.054V41.8574H444.054ZM444.054 48.3662V46.3662H436.396V48.3662V50.3662H444.054V48.3662ZM436.396 48.3662H434.396V57.0352H436.396H438.396V48.3662H436.396ZM436.396 57.0352V55.0352H428.737V57.0352V59.0352H436.396V57.0352ZM428.737 57.0352H426.737V63.2266H428.737H430.737V57.0352H428.737ZM428.737 63.2266V61.2266H413.421V63.2266V65.2266H428.737V63.2266ZM413.421 63.2266H415.421V63.0234H413.421H411.421V63.2266H413.421ZM413.421 63.0234V61.0234H40.6484V63.0234V65.0234H413.421V63.0234ZM40.6484 63.0234H38.6484V63.2266H40.6484H42.6484V63.0234H40.6484ZM40.6484 63.2266V61.2266H25.332V63.2266V65.2266H40.6484V63.2266ZM25.332 63.2266H27.332V57.1211H25.332H23.332V63.2266H25.332ZM25.332 57.1211V55.1211H17.2559V57.1211V59.1211H25.332V57.1211ZM17.2559 57.1211H19.2559V48.7266H17.2559H15.2559V57.1211H17.2559ZM17.2559 48.7266V46.7266H10.0762V48.7266V50.7266H17.2559V48.7266ZM10.0762 48.7266H12.0762V41.627H10.0762H8.07617V48.7266H10.0762ZM10.0762 41.627V39.627H10.0293V41.627V43.627H10.0762V41.627ZM10.0293 41.627H12.0293V39.5684H10.0293H8.0293V41.627H10.0293ZM10.0293 39.5684V37.5684H2V39.5684V41.5684H10.0293V39.5684ZM2 39.5684H4V23.3691H2H0V39.5684H2ZM2 23.3691V25.3691H10.0293V23.3691V21.3691H2V23.3691ZM10.0293 23.3691H12.0293V16.8604H10.0293H8.0293V23.3691H10.0293ZM10.0293 16.8604V18.8604H17.6875V16.8604V14.8604H10.0293V16.8604ZM17.6875 16.8604H19.6875V8.19141H17.6875H15.6875V16.8604H17.6875ZM17.6875 8.19141V10.1914H25.3457V8.19141V6.19141H17.6875V8.19141ZM25.3457 8.19141H27.3457V2H25.3457H23.3457V8.19141H25.3457ZM25.3457 2V4H428.751V2V0H25.3457V2Z" fill="#8E63FF" mask="url(#path-1-outside-1_112_36)" />
                </g>
                <defs>
                    <filter id="filter0_dd_112_36" x="0" y="0" width="458.083" height="69.2266" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dx="4" dy="4" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0.572549 0 0 0 0 0.270588 0 0 0 0 0.788235 0 0 0 1 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_112_36" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dx="3" dy="3" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0.278431 0 0 0 0 0.2 0 0 0 0 0.682353 0 0 0 1 0" />
                        <feBlend mode="normal" in2="effect1_dropShadow_112_36" result="effect2_dropShadow_112_36" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_112_36" result="shape" />
                    </filter>
                </defs>
            </svg>
        </div>
    );
}