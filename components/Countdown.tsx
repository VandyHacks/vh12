'use client'

import { useAnimate } from "motion/react";
import { useEffect, useRef, useState } from "react";

const COUNTDOWN_FROM = "2026-03-24";
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const useTimer = (unit: "Day" | "Hour" | "Minute" | "Second") => {
    const [ref, animate] = useAnimate();

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const timeRef = useRef<number>(0);

    const getTimeValue = () => {
        const end = new Date(COUNTDOWN_FROM);
        const now = new Date();
        const distance = +end - +now;

        if (unit === "Day") return Math.floor(distance / DAY);
        if (unit === "Hour") return Math.floor((distance % DAY) / HOUR);
        if (unit === "Minute") return Math.floor((distance % HOUR) / MINUTE);
        return Math.floor((distance % MINUTE) / SECOND);
    };

    const [time, setTime] = useState<number>(getTimeValue());

    useEffect(() => {
        timeRef.current = time;
    }, [time]);

    useEffect(() => {

        const handle = async () => {
            const newTime = getTimeValue();

            if (newTime !== timeRef.current) {
                if (ref.current) await animate(ref.current, { y: ["0%", "-50%"], opacity: [1, 0] }, { duration: 0.35 });
                timeRef.current = newTime;
                setTime(newTime);
                if (ref.current) await animate(ref.current, { y: ["50%", "0%"], opacity: [0, 1] }, { duration: 0.35 });
            }
        };

        intervalRef.current = setInterval(() => { void handle(); }, 1000);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };

    }, [animate, ref]);

    return { ref, time };
};

const CountdownItem = ({ unit, text }: { unit: string, text: string }) => {

    const { ref, time } = useTimer(unit as "Day" | "Hour" | "Minute" | "Second");
    return (
        <div>
            <p ref={ref} className="text-[30px] md:text-[60px]">{time}</p>
            <p className="text-[15px] md:text-[30px]">{text}</p>
        </div>
    );

}

export default function Countdown() {

    return (
        <div style={{ lineHeight: "normal" }} className="flex justify-center items-center text-white text-center uppercase gap-[15px] md:gap-[30px]">
            <CountdownItem unit="Day" text="DAYS"/>
            <p className="text-[15px] md:text-[32px]">:</p>
            <CountdownItem unit="Hour" text="HOURS"/>
            <p className="text-[15px] md:text-[32px]">:</p>
            <CountdownItem unit="Minute" text="MINUTES"/>
            <p className="text-[15px] md:text-[32px]">:</p>
            <CountdownItem unit="Second" text="SECONDS"/>
        </div>  
    );

}