import bg from "@/public/stars_random_full.png"

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div style={{ lineHeight: "normal", backgroundImage: `url(${bg.src})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }} className="h-screen w-full overflow-x-hidden">
            {children}
        </div>
    );
}
