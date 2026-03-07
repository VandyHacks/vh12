import { pressStart2P } from "@/components/Fonts";
import { connectToDatabase } from "@/database/mongoose";
import { Applicant, Discord as DiscordModel } from "@/database/schemas";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Discord() {

    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session) redirect(`/sign-in?callback=${encodeURIComponent("/discord")}`);

    await connectToDatabase();
    const accepted = Boolean(await Applicant.exists({ email: session.user.email, accepted: true }));
    const isInDiscord = Boolean(await DiscordModel.exists({ email: session.user.email }));

    if (!accepted) {
        return (
            <div className={`h-full flex items-center justify-center px-6 ${pressStart2P.className}`}>
                <div className="flex flex-col items-center gap-6 max-w-xl w-full text-center">
                    <div className="flex flex-col items-center gap-2">
                        <h1 className="text-[28px] sm:text-[36px] uppercase header-text-shadow text-white">vandyhacks xii</h1>
                    </div>
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-stone-600 to-transparent" />
                    <p className="text-[11px] sm:text-[13px] text-stone-300 leading-5 mb-2">
                        Please apply first and wait to be accepted before accessing the discord or ensure you are signed in with the email you applied with.
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
    else {
        if (isInDiscord) {
            redirect("/discord/success")
        }
        else {
            redirect(process.env.NODE_ENV === "development" ? `https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fdiscord%2Fcallback&scope=identify` : `https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&response_type=code&redirect_uri=https%3A%2F%2Fvandyhacks.org%2Fapi%2Fdiscord%2Fcallback&scope=identify`);
        }
    }

}