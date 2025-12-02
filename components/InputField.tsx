import { HTMLInputTypeAttribute } from "react";
import { cn } from "@/lib/utils"

export default function InputField({ name, label, placeholder, type, register, error, validation, disabled, value, textWrap = false }: { name: string, label: string, placeholder?: string, type: HTMLInputTypeAttribute, register: any, error?: any, validation?: any, disabled?: boolean, value?: string, textWrap?: boolean}) {
    return (
        <div className={cn("flex flex-col col-span-1 w-full items-center text-center text-xs md:text-lg", textWrap ? "" : "text-nowrap")}>
            <label htmlFor={name} className="">
                {label}{(validation && "required" in validation) && <span className="text-red-500 relative -translate-y-[3px] inline-block flex-inline">{"*"}</span>}
            </label>
            <input type={type} id={name} placeholder={placeholder} disabled={disabled} autoComplete="off" value={value} className={cn("w-full mt-2 text-black bg-stone-200 border-4 border-black px-4 py-3 focus:outline-none shadow-[6px_6px_0px_0px_#000]", disabled ? "opacity-50 cursor-not-allowed" : "")} {...register(name, validation)} />
            {
                error && <p className="text-[10px] text-red-500 mt-2 ml-1">{error.message}</p>
            }
        </div>
    )
}