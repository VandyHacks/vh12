'use client'

import Button from "@/components/Button";
import { analytics } from "@/database/actions";
import { oauthClient } from "@/lib/auth/client";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

export default function SignIn() {

    const pageLoadID = useRef<string>(crypto.randomUUID());

    const onClick = async () => {
        await analytics("apply_clicked", pageLoadID.current);
        try {
            await oauthClient.signIn.social({
                provider: "google",
                callbackURL: "/register"
            });
        } catch (err: unknown) {

        }
    }

    useEffect(() => {
        analytics("page_view", pageLoadID.current);
    }, [])
    
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