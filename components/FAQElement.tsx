'use client'

import { motion, AnimatePresence } from "motion/react";
import { vt323 } from "./Fonts";
import { ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQElement({ question, answer }: { question: string | ReactNode, answer: string | ReactNode }) {

    const [opened, setOpened] = useState<boolean>(false);

    return (
        <div className="w-full px-[41px] py-6 bg-[#12192F80] border border-[#FFFFFF1A] rounded-[10px] overflow-hidden">
            <div className="flex items-center justify-between gap-4">
                <div className={`${vt323.className} text-[20px] sm:text-[30px]`}>{question}</div>
                <motion.div
                    animate={{ rotate: opened ? 180 : 0 }}
                    transition={{ type: "spring", bounce: 0.25 }}
                    className="cursor-pointer shrink-0"
                    onClick={() => setOpened(v => !v)}
                >
                    <ChevronDown size={24} />
                </motion.div>
            </div>
            <AnimatePresence>
                {opened && (
                    <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 0.7 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ ease: "easeOut", duration: 0.35 }}
                        className="overflow-hidden"
                    >
                        <div className={`${vt323.className} text-[20px] mt-4`}>{answer}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}