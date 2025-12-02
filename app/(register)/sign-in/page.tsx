'use client'

import { oauthClient } from "@/lib/auth/client";

export default function SignIn() {

    const onClick = async () => {
        try {
            const data = await oauthClient.signIn.social({
                provider: "google",
                callbackURL: "/register"
            });
            if (data.error) {
                console.error("OAuth error:", data.error);
            }
        } catch (err: any) {
            console.error("Unexpected sign-in error:", err);
        }
    }
    

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-[300px] h-[100px] bg-white rounded-xl" onClick={onClick}></div>
        </div>
    );
}