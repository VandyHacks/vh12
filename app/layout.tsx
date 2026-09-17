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

    const style: React.CSSProperties = {
        display: "block",
        maxWidth: "100px",
        minWidth: "60px",
        position: "fixed",
        right: "15px",
        top: "0",
        width: "5%",
        zIndex: 10000
    };

    return (
        <html lang="en">
            <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
            <body
                className={`antialiased`}
            >
                <a id="mlh-trust-badge" style={style} href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2027-season&utm_content=white" target="_blank" rel="noreferrer"><img src="https://s3.amazonaws.com/logged-assets/trust-badge/2027/mlh-trust-badge-2027-white.svg" alt="Major League Hacking 2027 Hackathon Season" style={{ width: "100%" }} /></a>
                <div className="min-h-screen w-full overflow-x-hidden">
                    {children}
                </div>
            </body>
        </html>
    );
}
