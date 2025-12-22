'use server'

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Form from "@/components/Form";
import { connectToDatabase } from "@/database/mongoose"
import { Applicant } from "@/database/schemas"
import RegisterSuccess from "@/components/RegisterSuccess";

export default async function Register() {

    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session) redirect("/sign-in");

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