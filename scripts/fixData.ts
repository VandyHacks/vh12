import 'dotenv/config';

import { connectToDatabase } from "@/database/mongoose";
import { Analytics } from "@/database/schemas"

async function main() {
    await connectToDatabase();
    await Analytics.updateMany(
        { events: "page_view" },
        { $set: { "events.$[elem]": "signin_page_view" } },
        { arrayFilters: [{ elem: "page_view" }] }
    );
}

main()