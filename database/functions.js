'use server'

import { connectToDatabase } from "@/database/mongoose"
import { Applicant } from "@/database/schemas"
import { auth } from "@/lib/auth/auth";
import { success } from "better-auth";
import { headers } from "next/headers";

export const submitForm = async (data) => {

    try {

        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session) return { success: false, error: "Authentication error. Please try signing in again." };

        await connectToDatabase();
        const alreadyApplied = Boolean(await Applicant.exists({ email: session.user.email }));
        if (alreadyApplied) return { success: false, error: "You have already applied!" };

        for (const key in data) {
            if (typeof data[key] === "string") {
                data[key].trim();
            }
            else {
                data[key].map(element => element.trim());
            } 
        }
        console.log(data)

        const applicant = new Applicant({
            ...data,
            email: session.user.email
            
        });

        await applicant.save();
        return { success: true };

    }
    catch (e) {
        console.log(e);
        return { success: false };
    }

}