import "dotenv/config";
import { connectToDatabase } from "@/database/mongoose";
import { Applicant, Discord } from "@/database/schemas";
import { google } from "googleapis";

async function main() {
    await connectToDatabase();
    const discords = await Discord.find({});
    const emails = discords.map(d => d.email);

    const applicants = await Applicant.find(
        { email: { $in: emails } },
        { name: 1, preferredName: 1, email: 1, phoneNumber: 1 }
    ).sort({ name: 1 });

    const rows = applicants.map(a => [
        a.name,
        a.preferredName || "",
        a.email,
        a.phoneNumber
    ]);

    console.log(`Inserting ${rows.length} rows into sheet.`);

    const auth = new google.auth.GoogleAuth({
        keyFile: "scripts/vandyhacks-xii-25f58dc47710.json",
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const id = "16I8kUPUNbN4d5wDvt815WvUtg4trQWJHLd5NXtcmE6E";

    await sheets.spreadsheets.values.append({
        spreadsheetId: id,
        range: "Applicants!A1",
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: rows,
        },
    });

    console.log("Done.");
    process.exit(0);
}

main();