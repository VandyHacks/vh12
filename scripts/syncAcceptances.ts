import 'dotenv/config'

import { connectToDatabase } from "../database/mongoose"
import { Applicant } from "../database/schemas"
import { readFileSync } from "fs";
import { parse } from "csv-parse/sync";

async function main() {
    await connectToDatabase();

    const csv = readFileSync("applicants_accepted.csv", "utf-8");
    const records: Record<string, string>[] = parse(csv, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
    });

    let accepted = 0;
    let skipped = 0;

    for (const row of records) {
        const email = row.email;
        const accept = row.accept?.toLowerCase();

        if (!email) continue;

        if (accept === "y") {
            const result = await Applicant.updateOne(
                { email },
                { $set: { accepted: true } }
            );
            if (result.modifiedCount > 0) {
                console.log(`Accepted: ${email}`);
                accepted++;
            } else {
                console.log(`Already accepted or not found: ${email}`);
                skipped++;
            }
        } else {
            skipped++;
        }
    }

    console.log(`\nDone. Accepted: ${accepted}, Skipped: ${skipped}`);
    process.exit(0);
}

main();