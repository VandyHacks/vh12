'use client'

import { oauthClient } from "@/lib/auth/client";
import { motion } from "motion/react";
import { useRef } from "react";
import Button from "./Button";
import { vt323 } from "./Fonts";

export default function SignInPage({ callbackURL }: { callbackURL: string }) {
    
    const pageLoadID = useRef<string>(crypto.randomUUID());

    const onClick = async () => {
        try {
            await oauthClient.signIn.social({
                provider: "google",
                callbackURL
            });
        } catch (err: unknown) {

        }
    }

    return (
        <div className="overflow-hidden relative h-full">
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                <motion.div
                    className="cursor-pointer w-full"
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
                >
                    <Button text="Sign in with Google" animate={true} onClick={onClick} />
                </motion.div>
                {
                    callbackURL === "/discord" && (
                        <div className={`text-center ${vt323.className} mt-2`}>Please use the email you applied with to sign in and<br/> access the discord.</div>
                    )
                }
            </div>
        </div>
    );
}