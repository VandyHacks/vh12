'use client'

import Button from "@/components/Button";
import StarBackground from "@/components/StarBackground";
import { oauthClient } from "@/lib/auth/client";
import { motion } from "motion/react";

export default function SignIn() {

    const onClick = async () => {
        try {
            await oauthClient.signIn.social({
                provider: "google",
                callbackURL: "/register"
            });
        } catch (err: unknown) {

        }
    }
    
    return (
        <div className="overflow-hidden relative h-full">
            <motion.div
                className="cursor-pointer w-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
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
                <Button text="Sign in with Google" animate={true} onClick={onClick}/>
            </motion.div>
        </div>
    );
}