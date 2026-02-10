import 'dotenv/config';

import { connectToDatabase } from "@/database/mongoose";
import { Analytics } from "@/database/schemas"

async function main() {
    await connectToDatabase();
    {
        const signin = await Analytics.find({ "events": "signin_page_view" });
        const skipped = signin.filter(v => v.events.length == 1);
        const signedIn = signin.filter(v => v.events.length == 2);
        console.log(`Signed in: ${signedIn.length}`)
        console.log(`Skipped: ${skipped.length}\n`)
    }
    {
        const apply = await Analytics.find({ "events": "apply_page_view" });
        const skipped = apply.filter(v => v.events.length == 1);
        const applied = apply.filter(v => v.events.length == 2);
        console.log(`Applied: ${applied.length}`)
        console.log(`Skipped: ${skipped.length}`)
    }
}

main()