import { HTMLInputTypeAttribute } from "react";
import { cn } from "@/lib/utils"

export default function InputField({ name, label, placeholder, type, register, error, validation, disabled, value }: { name: string, label: string, placeholder?: string, type: HTMLInputTypeAttribute, register: any, error?: any, validation?: any, disabled?: boolean, value?: string}) {
    return (
        <div className="flex flex-col items-center text-center">
            <label htmlFor={name} className="ml-1">
                {label}{validation && <span className="text-red-500">{"*"}</span>}
            </label>
            <input type={type} id={name} placeholder={placeholder} disabled={disabled} autoComplete="off" value={value} className={cn("w-full mt-2 text-black bg-white border-4 border-black px-4 py-3 focus:outline-none shadow-[6px_6px_0px_0px_#000]", disabled ? "opacity-50 cursor-not-allowed" : "")} {...register(name, validation)} />
            {
                error && <p className="text-sm text-red-500 mt-2 ml-1">{error.message}</p>
            }
        </div>
    )
}