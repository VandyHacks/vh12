import { pressStart2P } from "@/components/Fonts";
import { connectToDatabase } from "@/database/mongoose";
import { Discord } from "@/database/schemas";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const ERROR_MESSAGES: Record<string, string> = {
    not_authenticated: "You are not signed in. Please sign in with the email you applied with and try again.",
    not_accepted: "Your application has not been accepted yet. Please wait for an acceptance email before joining the Discord.",
    oauth: "Discord authorization failed. Please try connecting your Discord account again.",
    not_in_server: "You must join the VandyHacks XII Discord server before verifying. Please join the server first, then try again.",
};

const DEFAULT_MESSAGE = "Sorry, something went wrong. Please try again or contact support if the issue persists.";

export default async function DiscordFailed({ searchParams }: { searchParams: Promise<{ err?: string }> }) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session) redirect("/discord");
    await connectToDatabase();
    const isInDiscord = Boolean(await Discord.exists({ email: session.user.email }));
    if (isInDiscord) {
        redirect("/discord/success");
    }
    const { err } = await searchParams;
    const message = (err && ERROR_MESSAGES[err]) || DEFAULT_MESSAGE;
    return (
        <div className={`h-full flex items-center justify-center px-6 ${pressStart2P.className}`}>
            <div className="flex flex-col items-center gap-6 max-w-xl w-full text-center">
                <div className="flex flex-col items-center gap-2">
                    <h1 className="text-[28px] sm:text-[36px] uppercase header-text-shadow text-white">vandyhacks xii</h1>
                </div>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-stone-600 to-transparent" />
                <p className="text-[11px] sm:text-[13px] text-stone-300 leading-5 mb-2">
                    {message}
                </p>
                <div className="flex gap-2 items-center justify-center">
                    <Link
                        href="/"
                        className="mt-2 uppercase px-8 py-3 bg-stone-200 text-black text-[10px] sm:text-xs active:translate-y-0.5 shadow-[4px_4px_0px_0px_#000] hover:bg-white transition-colors"
                    >
                        Go Home
                    </Link>
                    <Link
                        href={`/sign-in?callback=${encodeURIComponent("/discord")}`}
                        className="mt-2 uppercase px-8 py-3 bg-stone-200 text-black text-[10px] sm:text-xs active:translate-y-0.5 shadow-[4px_4px_0px_0px_#000] hover:bg-white transition-colors"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}