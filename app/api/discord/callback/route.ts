import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import qs from "qs";
import { google } from "googleapis";
import { auth } from "@/lib/auth/auth";
import { Applicant, Discord } from "@/database/schemas";
import { connectToDatabase } from "@/database/mongoose";

const gAuth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const sheets = google.sheets({ version: "v4", auth: gAuth });

export async function GET(request: NextRequest) {
    const failed = `https://vandyhacks.org/discord/failed`;
    const success = `https://vandyhacks.org/discord/success`;
    try {
        const session = await auth.api.getSession({
            headers: request.headers,
        });
        if (!session) return NextResponse.redirect(`${failed}?err=not_authenticated`, 302);
        await connectToDatabase();
        const accepted = Boolean(await Applicant.exists({ email: session.user.email, accepted: true }));
        if (!accepted) {
            return NextResponse.redirect(`${failed}?err=not_accepted`, 302);
        }
        const searchParams = request.nextUrl.searchParams;
        const code = searchParams.get("code");
        if (!code) {
            return NextResponse.redirect(`${failed}?err=oauth`, 302);
        }
        const redirectUri = "https://vandyhacks.org/api/discord/callback";
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
            await axios.get(
                `https://discord.com/api/v10/guilds/1473915812661428407/members/${userID}`,
                {
                    headers: {
                        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
                    },
                }
            );
        }
        catch (e: unknown) {
            return NextResponse.redirect(`${failed}?err=not_in_server`, 302);
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
        const applicant = await Applicant.findOne(
            { email: session.user.email },
            { name: 1, preferredName: 1, email: 1, phoneNumber: 1 }
        );
        if (applicant) {
            try {
                await sheets.spreadsheets.values.append({
                    spreadsheetId: "16I8kUPUNbN4d5wDvt815WvUtg4trQWJHLd5NXtcmE6E",
                    range: "Applicants!A1",
                    valueInputOption: "USER_ENTERED",
                    requestBody: {
                        values: [[
                            applicant.name,
                            applicant.preferredName || "",
                            applicant.email,
                            applicant.phoneNumber
                        ]],
                    },
                });
            } catch (sheetErr) {
                console.error("Failed to append to Google Sheet:", sheetErr);
            }
        }

        return NextResponse.redirect(success, 302);
    }
    catch (e: unknown) {
        console.error(e);
        return NextResponse.redirect(failed, 302);
    }

}