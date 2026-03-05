import SignInPage from "@/components/SignInPage";
import { redirect } from "next/navigation";

export default async function SignIn({ searchParams }: { searchParams: Promise<any> }) {
    const params = await searchParams;
    if (!params || typeof params.callback !== "string" || (params.callback !== "/discord" && params.callback !== "/register")) {
        return redirect("/");
    }
    return <SignInPage callbackURL={params.callback}/>
}