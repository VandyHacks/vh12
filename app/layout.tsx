import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "VandyHacks XIII",
    description: "VandyHacks XIII, Vanderbilt University's student-run collegiate hackathon, returns to Nashville in March 2027.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
            <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
            <body
                className={`antialiased`}
            >
                <div className="min-h-screen w-full overflow-x-hidden">
                    {children}
                </div>
            </body>
        </html>
    );
}
