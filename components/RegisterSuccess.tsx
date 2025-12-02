import { pressStart2P } from "@/components/Fonts";
import Link from "next/link";

export default function RegisterSuccess({ email }: { email: string }) {
    return (
        <div className={`h-full relative flex items-center flex-col pt-20 pb-20 overflow-y-scroll ${pressStart2P.className}`}>
            <h1 className="text-[35px] sm:text-[50px] md:text-[64px] uppercase header-text-shadow text-center">vandyhacks xii</h1>
            <h2 className="text-[15px] sm:text-[20px] md:text-[30px] text-stone-200 mb-3 uppercase text-center">register</h2>
            <p className="mb-15 text-sm text-stone-200 text-center">Signed in as: {email}</p>
            <p className="absolute top-1/2 left-1/2 w-[80%] -translate-y-1/2 -translate-x-1/2 text-[15px] sm:text-[20px] md:text-[25px] text-center">
                Thank you for applying! We will reach out to you soon.
                <Link href="/" className="underline block text-[10px] sm:text-[15px] md:text-[20px] mt-1">
                    Go Home
                </Link>
            </p>
        </div>
    );
}