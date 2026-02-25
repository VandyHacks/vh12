import { pressStart2P } from "@/components/Fonts";
import Link from "next/link";

export default function RegisterSuccess({ email }: { email: string }) {
    return (
        <div className={`h-full flex items-center justify-center px-6 ${pressStart2P.className}`}>
            <div className="flex flex-col items-center gap-6 max-w-xl w-full text-center">
                <div className="flex flex-col items-center gap-2">
                    <h1 className="text-[28px] sm:text-[36px] uppercase header-text-shadow text-white">vandyhacks xii</h1>
                </div>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-stone-600 to-transparent" />
                <p className="text-[11px] sm:text-[13px] text-stone-300 leading-5 mb-2">
                    Thank you for applying! Please monitor the email you applied with for updates.
                </p>
                <div className="mx-3 w-full min-w-0">
                    <p className="text-[10px] text-stone-500 leading-5 truncate">
                        Submitted as: <span className="">{email}</span>
                    </p>
                </div>
                <Link
                    href="/"
                    className="mt-2 uppercase px-8 py-3 bg-stone-200 text-black text-[10px] sm:text-xs active:translate-y-0.5 shadow-[4px_4px_0px_0px_#000] hover:bg-white transition-colors"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}