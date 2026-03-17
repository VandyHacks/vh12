import 'dotenv/config'

import { connectToDatabase } from "../database/mongoose"
import { Applicant } from "../database/schemas"
import { createWriteStream } from "fs";
import { getPrivateResumeLink } from '../lib/aws';

async function main() {
    await connectToDatabase();
    const documents = await Applicant.find({ });
    console.log(documents.length);
    const stream = createWriteStream("applicants.csv", { flags: "w" });
    const keys = Object.keys(documents[0].toObject());
    for (const key of keys) {
        if (key === "__v") continue;
        stream.write(`${key},`)
    }
    stream.write("accept,")
    stream.write("\n");
    for (const document of documents) {
        const docObj = document.toObject();
        const row: string[] = [];
        for (const key of keys) {
            const val = docObj[key];
            if (key === "__v") continue;
            if (Array.isArray(val)) {
                row.push(`"${val.join(",")}"`);
            }
            else if (typeof val === "object") {
                row.push(`"${JSON.stringify(val).replace(/['"]/g, '')}"`);   
            } 
            else if (key === "resume" && val && val !== "") {
                row.push(`${await getPrivateResumeLink(val)}`);
            } 
            else {
                row.push(`"${val}"`);
            }
        }
        stream.write(row.join(",") + "\n");
    }
}

main();