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
                <div className="min-h-screen w-full overflow-x-hidden">
                    {children}
                </div>
            </body>
        </html>
    );
}
