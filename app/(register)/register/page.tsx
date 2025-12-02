import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { pressStart2P } from "@/app/layout";
import Form from "@/components/Form";

// shadow-[6px_6px_0px_0px_#000]

export default async function Register() {

    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session) redirect("/sign-in");

    return (
        <Form email={session.user.email}/>
    );
}