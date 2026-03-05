import { pressStart2P } from "@/components/Fonts";
import { connectToDatabase } from "@/database/mongoose";
import { Discord } from "@/database/schemas";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DiscordSuccess() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session) redirect("/discord");
    await connectToDatabase();
    const isInDiscord = Boolean(await Discord.exists({ email: session.user.email }));
    if (!isInDiscord) {
        redirect("/discord");
    }
    return (
        <div className={`h-full flex items-center justify-center px-6 ${pressStart2P.className}`}>
            <div className="flex flex-col items-center gap-6 max-w-xl w-full text-center">
                <div className="flex flex-col items-center gap-2">
                    <h1 className="text-[28px] sm:text-[36px] uppercase header-text-shadow text-white">vandyhacks xii</h1>
                </div>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-stone-600 to-transparent" />
                <p className="text-[11px] sm:text-[13px] text-stone-300 leading-5 mb-2">
                    Your discord account was connected! If you haven't received the "Hacker" role after a few minutes, please contact support.
                </p>
                <Link
                    href="/"
                    className="mt-2 uppercase px-8 py-3 bg-stone-200 text-black text-[10px] sm:text-xs active:translate-y-0.5 shadow-[4px_4px_0px_0px_#000] hover:bg-white transition-colors"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}