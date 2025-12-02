'use client'

import { pressStart2P } from "@/app/layout";
import { useForm } from "react-hook-form";
import InputField from "./InputField";

// shadow-[6px_6px_0px_0px_#000]

export default function Form({ email }: { email: string }) {

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: '',
            preferredName: '',
            investmentGoals: "hello"
        },
        mode: 'onBlur',
    });

    return (
        <div className={`h-full flex items-center flex-col pt-20 overflow-y-scroll ${pressStart2P.className}`}>
            <h1 className="text-[35px] sm:text-[50px] md:text-[64px] uppercase header-text-shadow text-center">vandyhacks xii</h1>
            <h2 className="text-[15px] sm:text-[px] md:text-[30px] uppercase mb-[25px] text-center">register</h2>
            <form className="w-full max-w-2xl mx-auto px-10 sm:px-10 md:px-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField name="name" type="text" label="Full Name" register={register} error={errors.name} validation={{ required: "Name is required.", minLength: { value: 2, message: "Must be at least 2 characters." } }} />
                    <InputField name="preferredName" type="text" label="Preferred Name" register={register} error={errors.preferredName}/>
                </div>
            </form>
        </div>
    );
}