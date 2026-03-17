import "dotenv/config"
import nodemailer from "nodemailer"
import { connectToDatabase } from "../database/mongoose"
import { Applicant, Discord } from "../database/schemas"

const generateHtml = (name: string) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #676767; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .logo-container { text-align: center; padding: 40px 0; }
        .logo { width: 150px; height: auto; }
        .content { font-size: 16px; }
        .highlight { font-weight: bold; color: #000000; }
        .footer { margin-top: 20px; font-size: 14px; }
        .ps { margin-top: 20px; font-size: 12px; color: #555555; }
        a { color: #007bff; text-decoration: none; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo-container">
            <img src="cid:vandyhacksLogo" alt="VandyHacks Logo" class="logo">
        </div>
        
        <div class="content">
            <p>Hi ${name}!</p>

            <p>Congratulations! You're invited to be a part of <span class="highlight">VandyHacks XII!</span> We enjoyed reading your application and would love to see your ideas come to life during our event on <span class="highlight">March 21st-22nd!</span></p>

            <p>Please <span class="highlight">join our <a target="_blank" href="https://discord.gg/xMCptYbM9A">discord server</a> and verify</span> to confirm your attendance by <span class="highlight">March 20th, 11:59 PM CST.</span></p>

            <p>If you have any questions or concerns, check out our <a target="_blank" href="http://vandyhacks.org#faq">FAQ</a> or reach out to us at <a href="mailto:info@vandyhacks.org">info@vandyhacks.org</a>.</p>
        </div>

        <div class="footer">
            Cheers,<br>
            <strong>The VandyHacks Team</strong>
        </div>

        <div class="ps">
            P.S. And of course, make sure to stay up-to-date by following us on <a target="_blank" href="https://www.instagram.com/vandyhacks">Instagram</a>!
        </div>
    </div>
</body>
</html>
`;

const transporter = nodemailer.createTransport({
    host: "email-smtp.us-east-2.amazonaws.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    }
});

async function getAcceptances() {
    await connectToDatabase();
    const acceptances = await Applicant.find({
        accepted: true,
        $or: [
            { emailSent: false },
            { emailSent: { $exists: false } }
        ]
    });
    return acceptances;
}

async function getAcceptancesNotOnDiscord() {
    await connectToDatabase();
    const accepted = await Applicant.find({ accepted: true, emailSent: true });
    const discordEmails = new Set((await Discord.find({}, { email: 1 })).map((d: any) => d.email));

    const notOnDiscord = accepted.filter((a: any) => !discordEmails.has(a.email));
    return notOnDiscord;
}

async function sendEmails(users: { email: string, name: string }[]) {
    console.log(`Sending to ${users.length} users.`)
    const results = await Promise.allSettled(users.map(async (user) => {
        try {
            const result = await transporter.sendMail({
                from: "VandyHacks <info@vandyhacks.org>",
                to: user.email,
                subject: "[ACTION REQUIRED] Congratulations! Welcome to VandyHacks XII.",
                html: generateHtml(user.name),
                attachments: [
                    {
                        filename: "vhlogo.png",
                        path: "scripts/vhlogo.png",
                        cid: "vandyhacksLogo"
                    }
                ]
            });
            await Applicant.updateOne({ email: user.email }, { emailSent: true });
            return { user, response: result.response };
        } catch (err) {
            await Applicant.updateOne({ email: user.email }, { emailSent: false });
            throw err;
        }
    }));
    for (const [i, result] of results.entries()) {
        if (result.status === "fulfilled") {
            console.log(`Success ${users[i].name}: ${result.value.response}`);
        } else {
            console.error(`Failed ${users[i].name} (${users[i].email}): ${result.reason}`);
        }
    }
}


async function main() {

    const acceptances = await getAcceptances();
    // const users = acceptances.map(a => ({
    //     email: a.preferredEmail || a.email,
    //     name: a.preferredName || a.name
    // }));
    // console.log(users);
    const users = [];
    users.push({ name: "Alex", email: "gunsbestkid@gmail.com" });
    users.push({ name: "Noah", email: "noah.g.lisin@vanderbilt.edu" });
    await sendEmails(users);
    process.exit(0);
}

main();
