import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import qs from "qs";
import { auth } from "@/lib/auth/auth";
import { Applicant, Discord } from "@/database/schemas";
import { connectToDatabase } from "@/database/mongoose";

export async function GET(request: NextRequest) {
    const failed = `${request.nextUrl.origin}/discord/failed`;
    const success = `${request.nextUrl.origin}/discord/success`;
    try {
        const session = await auth.api.getSession({
            headers: request.headers,
        });
        if (!session) return NextResponse.redirect(`${failed}?err=not_authenticated`);
        await connectToDatabase();
        const accepted = Boolean(await Applicant.exists({ email: session.user.email, accepted: true }));
        if (!accepted) {
            return NextResponse.redirect(`${failed}?err=not_accepted`);
        }
        const searchParams = request.nextUrl.searchParams;
        const code = searchParams.get("code");
        if (!code) {
            return NextResponse.redirect(`${failed}?err=oauth`);
        }
        const redirectUri = `${request.nextUrl.origin}/api/discord/callback`;
        const tokenRes = await axios.post(
            "https://discord.com/api/oauth2/token",
            qs.stringify({
                client_id: process.env.DISCORD_CLIENT_ID,
                client_secret: process.env.DISCORD_CLIENT_SECRET,
                grant_type: "authorization_code",
                code,
                redirect_uri: redirectUri,
            }),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );
        const accessToken = tokenRes.data.access_token;
        const userRes = await axios.get("https://discord.com/api/users/@me", {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        const userID = userRes.data.id;
        const name = userRes.data.username;
        try {
            const res = await axios.get(
                `https://discord.com/api/v10/guilds/1473915812661428407/members/${userID}`,
                {
                    headers: {
                        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
                    },
                }
            );
        }
        catch (e: unknown) {
            return NextResponse.redirect(`${failed}?err=not_in_server`);
        }
        await axios.put(
            `https://discord.com/api/v10/guilds/1473915812661428407/members/${userID}/roles/1476424988406976553`,
            null,
            {
                headers: {
                    Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
                },
            }
        );
        await Discord.insertOne({ email: session.user.email, userID, name });
        return NextResponse.redirect(success);
    }
    catch (e: unknown) {
        console.error(e);
        return NextResponse.redirect(failed);
    }

}