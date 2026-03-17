import bg from "@/public/stars_random_full.png"
import plus from "@/public/plus.svg"
import { vt323, pressStart2P } from "./Fonts";
import Image from "next/image";

type ModuleType = { time: string, name: string };

const scheduleItems: ModuleType[] = [
    { time: "7:45 AM", name: "Check-In" },
    { time: "9:15 AM", name: "Opening Ceremony" },
    { time: "10:45 AM", name: "MLH Workshop: Hacking with Github Copilot" },
    { time: "11:30 AM", name: "Hackathon Begins" },
    { time: "1:00 PM", name: "Lunch" },
    { time: "2:00 PM", name: "Workshop 1: Real Time Applications with Websockets" },
    { time: "3:00 PM", name: "MLH Workshop: Intro to Google AI Studio" },
    { time: "4:00 PM", name: "Social Event 1: Tech Together MeetUp" },
    { time: "5:30 PM", name: "Workshop 2" },
    { time: "7:00 PM", name: "Dinner" },
    { time: "8:00 PM", name: "Social Event 2" },
];

function ScheduleItem({ item }: { item: ModuleType }) {
    return (
        <div className="relative flex items-center gap-3 sm:gap-5">
            <div className="relative shrink-0 w-[80px] sm:w-[110px] text-right">
                <p className={`${vt323.className} text-[18px] sm:text-[26px] bg-[linear-gradient(90deg,#4733AE_0%,#AA52E9_100%)] text-transparent bg-clip-text`}>
                    {item.time}
                </p>
            </div>

            <div className="relative flex flex-col items-center shrink-0">
                <div className="w-[2px] flex-1 bg-gradient-to-b from-transparent to-[#9245C9] min-h-[10px]" />
                <div className="relative z-10">
                    <Image
                        src={plus}
                        alt=""
                        width={16}
                        height={14}
                        className="sm:scale-100 scale-75"
                    />
                </div>
                <div className="w-[2px] flex-1 bg-gradient-to-b from-[#9245C9] to-transparent min-h-[10px]" />
            </div>

            <div className="flex-1 px-4 py-3 sm:px-6 sm:py-4 bg-[#12192F80] transition-all duration-300 ease-in-out hover:scale-101 border border-[#FFFFFF1A] rounded-[10px]">
                <p className={`${vt323.className} text-[20px] sm:text-[28px] text-white`}>
                    {item.name}
                </p>
            </div>
        </div>
    );
}

export default function Schedule() {
    return (
        <div id="schedule" className="h-screen relative" style={{ backgroundImage: `url(${bg.src})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
            <div className="grid grid-rows-[auto_1fr] gap-8 h-full max-w-6xl mx-5 xl:mx-auto pt-10 pb-20">
                <div className="flex flex-col items-center justify-center">
                    <p className={`${vt323.className} md:self-start sm:text-[40px] text-[25px] text-nowrap`}>$ cat SCHEDULE.yml</p>
                    <p className={`${pressStart2P.className} sm:text-[60px] text-[30px]`}>Schedule</p>
                </div>
                <div className="overflow-y-auto overflow-x-hidden scrollbar pr-2 max-h-[75vh]" data-lenis-prevent>
                    <div className="flex flex-col gap-1 sm:gap-2">
                        <p className={`${vt323.className} text-[20px] text-center sm:text-[28px] text-white`}>
                            March 21st
                        </p>
                        {
                            scheduleItems.map((item, index) => (
                                <ScheduleItem key={index} item={item} />
                            ))
                        }
                        <p className={`${vt323.className} text-[20px] text-center sm:text-[28px] text-white`}>
                            March 22nd... TBD
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
