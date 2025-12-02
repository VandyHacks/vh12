'use client'

import { pressStart2P } from "@/app/layout";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import Selector from "./Selector";
import { submitForm } from "@/database/functions"
import { useRef, useState } from "react";
import {
  GENDER_OPTIONS,
  LEVEL_OF_STUDY_OPTIONS,
  GRADUATION_YEAR_OPTIONS,
  RACE_OPTIONS,
  DIETARY_OPTIONS,
  GAIN_FROM_VANDYHACKS_OPTIONS,
  SHIRT_SIZES,
  YES_NO_OPTIONS,
} from "@/lib/constants";

export default function Form({ email }: { email: string }) {

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onBlur",
        shouldUnregister: true
    });

    const submitted = useRef(false);
    const [error, setError] = useState<string>("");

    const onSubmit = async (data: any) => {
        if (submitted.current) return; 
        //submitted.current = true;

        console.log("submitting");
        const result = await submitForm(data);
        if (result?.success) {
            console.log("success");
        }
        else {
            setError(result.error || "An error occurred. Please try again later.")
            submitted.current = false;
        }
    };

    return (
        <div className={`h-full flex items-center flex-col pt-20 pb-20 overflow-y-scroll ${pressStart2P.className}`}>
            <h1 className="text-[35px] sm:text-[50px] md:text-[64px] uppercase header-text-shadow text-center">vandyhacks xii</h1>
            <h2 className="text-[15px] sm:text-[20px] md:text-[30px] text-stone-200 mb-3 uppercase text-center">register</h2>
            <p className="mb-15 text-sm text-stone-200 text-center">Signed in as: {email}</p>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl mx-auto px-10 md:px-0">
                <div className="md:grid md:auto-cols-fr md:gap-2 text-stone-200 space-y-5">
                    <InputField name="name" type="text" label="Full Name" register={register} error={errors.name} validation={{ 
                        required: "Name is required.", 
                        minLength: { value: 2, message: "Must be at least 2 characters." },
                        maxLength: { value: 30, message: "Must be less than 30 characters."}
                    }}/>
                    <InputField name="preferredName" type="text" label="Preferred Name" register={register} error={errors.preferredName}/>
                    <div className="col-span-2">
                        <Selector name="gender" label="Gender" options={GENDER_OPTIONS} control={control} error={errors.gender}/>
                    </div>
                    <InputField name="age" type="text" label="Age" register={register} error={errors.age} validation={{
                        required: "Age is required.",
                        min: { value: 1, message: "Age must be at least 1." },
                        validate: (value: any) => !isNaN(Number(value)) || "Age must be a number.",
                        maxLength: { value: 2, message: "Must be less than 2 characters." }
                    }} />
                    <InputField name="major" type="text" label="Major" register={register} error={errors.major} validation={{
                        required: "Major is required.",
                        minLength: { value: 2, message: "Must be at least 2 characters." },
                        maxLength: { value: 30, message: "Must be less than 30 characters." }
                    }} />
                    <div className="col-span-2">
                        <InputField name="phoneNumber" type="text" label="Phone Number" register={register} error={errors.phoneNumber} validation={{
                            required: "Phone number is required.",
                            maxLength: { value: 10, message: "Must be less than 10 characters." }
                        }} />
                    </div>
                    <div className="col-span-2">
                        <Selector
                            name="levelOfStudy"
                            label="Level of Study"
                            control={control}
                            options={LEVEL_OF_STUDY_OPTIONS}
                            error={errors.levelOfStudy}
                        />
                    </div>
                    <div className="col-span-2">
                        <Selector
                            name="graduationYear"
                            label="Graduation Year"
                            control={control}
                            options={GRADUATION_YEAR_OPTIONS}
                            error={errors.graduationYear}
                        />
                    </div>
                    <div className="col-span-2">
                        <InputField name="addressLine1" type="text" label="Address Line 1" register={register} error={errors.addressLine1} validation={{
                            required: "Address Line 1 is required.",
                            maxLength: { value: 50, message: "Must be less than 50 characters." }
                        }} />
                    </div>
                    <div className="col-span-2">
                        <InputField name="addressLine2" type="text" label="Address Line 2" register={register} error={errors.addressLine2} validation={{
                            maxLength: { value: 50, message: "Must be less than 50 characters." }
                        }} />
                    </div>
                    <InputField name="city" type="text" label="City" register={register} error={errors.city} validation={{
                        required: "City is required.",
                        maxLength: { value: 50, message: "Must be less than 50 characters." }
                    }} />
                    <InputField name="state" type="text" label="State" register={register} error={errors.state} validation={{
                        required: "State is required.",
                        maxLength: { value: 50, message: "Must be less than 50 characters." }
                    }} />
                    <InputField name="zipCode" type="text" label="ZIP Code" register={register} error={errors.zipCode} validation={{
                        required: "ZIP Code is required.",
                        maxLength: { value: 50, message: "Must be less than 50 characters." }
                    }} />
                    <InputField name="country" type="text" label="Country" register={register} error={errors.country} validation={{
                        required: "Country is required.",
                        maxLength: { value: 50, message: "Must be less than 50 characters." }
                    }} />
                    <div className="col-span-2">
                        <Selector
                            name="race"
                            label="Race"
                            control={control}
                            options={RACE_OPTIONS}
                            error={errors.race}
                        />
                    </div>
                    <div className="col-span-2">
                        <Selector
                            name="dietaryRestrictions"
                            label="Dietary Restrictions"
                            control={control}
                            multiple
                            options={DIETARY_OPTIONS}
                            error={errors.dietaryRestrictions}
                        />
                    </div>
                    <div className="col-span-2">
                        <InputField name="accommodationNeeds" type="text" label="Accommodation needs" register={register} error={errors.accommodationNeeds} validation={{
                            maxLength: { value: 150, message: "Must be less than 150 characters." }
                        }} />
                    </div>
                    <div className="col-span-2">
                        <Selector name="firstTimeHacker" label="First-time hacker?" options={["Yes", "No"]} control={control} error={errors.firstTimeHacker} />
                    </div>
                    <div className="col-span-2">
                        <InputField name="whyAttend" type="text" label="Why would you like to attend VandyHacks?" register={register} error={errors.whyAttend} textWrap validation={{
                            maxLength: { value: 150, message: "Must be less than 150 characters." }
                        }} />
                    </div>
                    <div className="col-span-2">
                        <InputField name="techIndustryInterest" type="text" label="Which tech industry, if any, do you want to get into?" register={register} error={errors.techIndustryInterest} textWrap validation={{
                            maxLength: { value: 150, message: "Must be less than 150 characters." }
                        }} />
                    </div>
                    <div className="col-span-2">
                        <InputField name="techStackFamiliarity" type="text" label="Which tech stack, if any, are you familiar with?" register={register} error={errors.techStackFamiliarity} textWrap validation={{
                            maxLength: { value: 150, message: "Must be less than 150 characters." }
                        }} />
                    </div>
                    <div className="col-span-2">
                        <InputField name="passions" type="text" label="What are you passionate about?" register={register} error={errors.passions} textWrap validation={{
                            maxLength: { value: 150, message: "Must be less than 150 characters." }
                        }} />
                    </div>
                    <div className="col-span-2">
                        <Selector
                            name="gainFromVandyHacks"
                            label="What do you hope to gain from VandyHacks?"
                            control={control}
                            multiple
                            options={GAIN_FROM_VANDYHACKS_OPTIONS}
                            textWrap
                            error={errors.gainFromVandyHacks}
                        />
                    </div>
                    <div className="col-span-2">
                        <Selector name="shirtSize" label="Shirt Size" options={SHIRT_SIZES} control={control} error={errors.shirtSize} />
                    </div>
                    <div className="col-span-2">
                        <Selector name="overnight" label="Are you staying overnight in the venue?" options={YES_NO_OPTIONS} control={control} textWrap error={errors.overnight}/>
                    </div>
                    <div className="col-span-2">
                        <Selector
                            name="usStatus"
                            label="Are you a U.S. Citizen, Permanent Resident, or granted the status of Immigrant, Refugee, Asylee or Deferred Action for Childhood Arrival (DACA), by the Bureau of Citizenship and Immigration Services?"
                            options={YES_NO_OPTIONS}
                            control={control}
                            textWrap
                            error={errors.usStatus}
                        />
                    </div>
                    <div className="col-span-2">
                        <Selector name="volunteerContact" label="Would you like to be contacted about volunteering at the event?" options={YES_NO_OPTIONS} control={control} textWrap error={errors.volunteerContact}/>
                    </div>
                </div>
                <div className="w-full flex justify-center mt-20">
                    <button
                        type="submit"
                        className="uppercase px-8 py-3 bg-stone-200 text-black active:translate-y-0.5 shadow-[6px_6px_0px_0px_#000]"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </div>
                <div className="w-full text-center text-red-500 text-sm md:text-md mt-5">
                    {
                        error && <p>{error}</p>
                    }
                </div>  
            </form>
        </div>
    );
}