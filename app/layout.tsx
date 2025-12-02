import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";

export const pressStart2P = Press_Start_2P({
    weight: "400",
    variable: "--font-press-start-2p",
    subsets: ["latin"],
    display: "block"
});

export const vt323 = VT323({
    weight: "400",
    variable: "--font-vt323",
    subsets: ["latin"],
    display: "block"
});


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
