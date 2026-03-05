import 'dotenv/config';

import { connectToDatabase } from "../database/mongoose"
import { Applicant } from "../database/schemas"

async function main() {
    await connectToDatabase();
    await Applicant.updateMany(
        { authorizeEmails: { $exists: false } },
        { $set: { authorizeEmails: false } }
    );
    console.log("Done.")
}

main()