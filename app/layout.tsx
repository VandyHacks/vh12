import "./globals.css";

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
        right: "50px",
        top: "0",
        width: "10%",
        zIndex: 10000
    };

    return (
        <html lang="en">
            <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
            <body
                className={`antialiased`}
            >
                <a id="mlh-trust-badge" style={style} href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=white" target="_blank"><img src="https://s3.amazonaws.com/logged-assets/trust-badge/2026/mlh-trust-badge-2026-white.svg" alt="Major League Hacking 2026 Hackathon Season" style={{ width: "100%" }} /></a>
                <div className="min-h-screen w-full overflow-x-hidden">
                    {children}
                </div>
            </body>
        </html>
    );
}
