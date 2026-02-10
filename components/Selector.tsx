import { motion } from "motion/react";
import { ReactNode } from "react";
import { Controller } from "react-hook-form";

export default function Selector({ name, label, options, control, error, required = true, fieldRef, multiple = false, textWrap = false, _rules }: { name: string, label: string | ReactNode, options: string[], control: any, fieldRef: any, error?: any, multiple?: boolean, required?: boolean, textWrap?: boolean, _rules?: any }) {
    
    const rules = _rules || {
        required: required ? typeof label !== "string" || (label.length > 30 || label.includes("?") ? "Please select an answer." : `${label} is required.`) : false, 
        validate: multiple ? (val: any) => val && val.length > 0 || `${label} is required.` : undefined
    }
    
    return (
        <div ref={fieldRef} className="flex flex-col items-center text-center text-sm md:text-lg">
            <div className={textWrap ? "" : "text-nowrap"}>
                {label}{required && <span className="text-red-500 relative -translate-y-[3px] inline-block flex-inline">{"*"}</span>}
            </div>
            <Controller name={name} control={control} rules={rules} render={({ field }) => {

                const value = field.value ?? (multiple ? [] : "");

                const handleClick = (item: string) => {
                    if (multiple) {
                        const arr = Array.isArray(value) ? value : [];
                        if (arr.includes(item)) {
                            field.onChange(arr.filter((v: string) => v !== item));
                        } else {
                            field.onChange([...arr, item]);
                        }
                    } else {
                        field.onChange(item);
                    }
                };

                const isSelected = (item: string) => multiple ? (Array.isArray(value) && value.includes(item)) : value === item;

                return <div className="flex flex-row gap-3 flex-wrap justify-center items-center mt-2">
                    {
                        options.map((item) => {
                            return (
                                <motion.div 
                                    key={item} 
                                    onClick={() => handleClick(item)} 
                                    className="px-4 active:translate-y-0.5 cursor-pointer text-[10px] md:text-[15px] py-3 text-black cursor-pointer shadow-[6px_6px_0px_0px_#000]"
                                    animate={{
                                        backgroundColor: isSelected(item) ? "#9fcaffff" : "#e7e5e4"
                                    }}
                                    transition={{
                                        duration: 0.3
                                    }}
                                    initial={{
                                        backgroundColor: "#e7e5e4"
                                    }}
                                >
                                    {item}
                                </motion.div>
                            );
                        })
                    }
                </div>
            }}/>
            {
                error && <p className="text-[11px] text-red-500 mt-2.5 ml-1">{error.message}</p>
            }
        </div>
    );
}