import "./globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`antialiased`}
            >
                <div className="h-screen w-full" style={{ backgroundImage: "url(stars_random_full.png)", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
                    {children}
                </div>
            </body>
        </html>
    );
}
