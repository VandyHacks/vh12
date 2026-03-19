'use server'

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Form from "@/components/Form";
import { connectToDatabase } from "@/database/mongoose"
import { Applicant } from "@/database/schemas"
import RegisterSuccess from "@/components/RegisterSuccess";
import { DateTime } from "luxon";

export default async function Register() {
    
    const now = DateTime.now().setZone('America/Chicago');
    const due = DateTime.fromObject(
        { year: 2026, month: 3, day: 18, hour: 23, minute: 59 },
        { zone: 'America/Chicago' }
    );
    const closed = now > due;

    if (closed) {
        redirect("/");
    }
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session) redirect(`/sign-in?callback=${encodeURIComponent("/register")}`);

    await connectToDatabase();
    const alreadyApplied = Boolean(await Applicant.exists({ email: session.user.email }));

    if (alreadyApplied) {
        return (
            <RegisterSuccess email={session.user.email}/>
        );
    }
    else {
        return (    
            <Form email={session.user.email}/>
        );
    }
}