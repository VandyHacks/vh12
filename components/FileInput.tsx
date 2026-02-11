import { HTMLInputTypeAttribute, useState } from "react";
import { cn } from "@/lib/utils"


export default function FileInput({ name, label, placeholder, register, error, validation, disabled, fieldRef, textWrap = false }: { name: string, label: string, placeholder?: string, register: any, fieldRef: any, error?: any, validation?: any, disabled?: boolean, textWrap?: boolean }) {
    
    const [fileName, setFileName] = useState<string>("");
    
    const clip = (name: string, max: number) => {
        return name.length > max ? name.substring(0, max) + "…pdf" : name
    }

    return (
        <div ref={fieldRef} className={cn("flex flex-col col-span-1 w-full items-center text-center text-xs md:text-lg py-2", textWrap ? "" : "text-nowrap")}>
            <label htmlFor={name}>
                {label}{(validation && "required" in validation) && <span className="text-red-500 relative -translate-y-[3px] inline-block">*</span>}
            </label>
            <input accept=".pdf" type="file" id={name} disabled={disabled} className="hidden" {...register(name, {
                ...validation,
                onChange: (e: any) => setFileName(e.target.files?.[0]?.name || "")
            })} />
            <label htmlFor={name} className={cn("w-full overflow-hidden mt-2 cursor-pointer text-black bg-stone-200 border-4 border-black px-4 py-3 shadow-[6px_6px_0px_0px_#000] hover:bg-stone-100 transition-colors duration-150 active:translate-y-0.5", disabled && "opacity-50 cursor-not-allowed")}>
                {fileName ? `${clip(fileName, 25)}` : placeholder || "Upload File"}
            </label>
            {
                error && <p className="text-[10px] text-red-500 mt-2 ml-1">{error.message}</p>
            }
        </div>
    )
}
