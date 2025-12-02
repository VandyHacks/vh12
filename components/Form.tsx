'use client'

import { pressStart2P } from "@/app/layout";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import Selector from "./Selector";

// shadow-[6px_6px_0px_0px_#000]

export default function Form({ email }: { email: string }) {

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onBlur",
    });

    const onSubmit = async () => {

    }

    return (
        <div className={`h-full flex items-center flex-col pt-20 pb-20 overflow-y-scroll ${pressStart2P.className}`}>
            <h1 className="text-[35px] sm:text-[50px] md:text-[64px] uppercase header-text-shadow text-center">vandyhacks xii</h1>
            <h2 className="text-[15px] sm:text-[px] md:text-[30px] uppercase mb-15 text-center">register</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl mx-auto px-10 md:px-0">
                <div className="grid grid-cols-2 gap-6 auto-cols-fr text-stone-200 space-y-3">
                    <InputField name="name" type="text" label="Full Name" register={register} error={errors.name} validation={{ 
                        required: "Name is required.", 
                        minLength: { value: 2, message: "Must be at least 2 characters." } 
                    }}/>
                    <InputField name="preferredName" type="text" label="Preferred Name" register={register} error={errors.preferredName}/>
                    <div className="col-span-2">
                        <Selector name="gender" label="Gender" options={["Male", "Female", "Other", "Prefer Not to Say"]} control={control} error={errors.gender}/>
                    </div>
                    <InputField name="age" type="text" label="Age" register={register} error={errors.age} validation={{
                        required: "Age is required.",
                        min: { value: 1, message: "Age must be at least 1." },
                        validate: (value: any) => !isNaN(Number(value)) || "Age must be a number."
                    }} />
                    <InputField name="major" type="text" label="Major" register={register} error={errors.major} validation={{
                        required: "Major is required.",
                    }} />
                    <div className="col-span-2">
                        <InputField name="phoneNumber" type="text" label="Phone Number" register={register} error={errors.phoneNumber} validation={{
                            required: "Phone number is required.",
                        }} />
                    </div>
                    <div className="col-span-2">
                        <Selector
                            name="levelOfStudy"
                            label="Level of Study"
                            control={control}
                            options={[
                                "Less than Secondary / High School",
                                "Secondary / High School",
                                "Undergraduate University (2 year - community college or similar)",
                                "Undergraduate University (3+ year)",
                                "Graduate University (Masters, Professional, Doctoral, etc)",
                                "Code School / Bootcamp",
                                "Other Vocational / Trade Program or Apprenticeship",
                                "Post Doctorate",
                                "Other",
                                "I'm not currently a student",
                                "Prefer not to answer"
                            ]}
                            error={errors.levelOfStudy}
                        />
                    </div>
                    <div className="col-span-2">
                        <Selector
                            name="graduationYear"
                            label="Graduation Year"
                            control={control}
                            options={["2026", "2027", "2028", "2029", "2030", "Not sure/Other"]}
                            error={errors.graduationYear}
                        />
                    </div>
                    <div className="col-span-2">
                        <InputField name="addressLine1" type="text" label="Address Line 1" register={register} error={errors.addressLine1} validation={{
                            required: "Address Line 1 is required."
                        }} />
                    </div>
                    <div className="col-span-2">
                        <InputField name="addressLine2" type="text" label="Address Line 2" register={register} error={errors.addressLine2} validation={{
                            required: "Address Line 2 is required."
                        }} />
                    </div>
                    <InputField name="city" type="text" label="City" register={register} error={errors.city} validation={{
                        required: "City is required."
                    }} />
                    <InputField name="state" type="text" label="State" register={register} error={errors.state} validation={{
                        required: "State is required."
                    }} />
                    <InputField name="zipCode" type="text" label="ZIP Code" register={register} error={errors.zipCode} validation={{
                        required: "ZIP Code is required."
                    }} />
                    <InputField name="country" type="text" label="Country" register={register} error={errors.country} validation={{
                        required: "Country is required."
                    }} />
                    <div className="col-span-2">
                        <Selector
                            name="race"
                            label="Race"
                            control={control}
                            options={[
                                "White",
                                "Black or African American",
                                "American Indian or Alaskan Native",
                                "Asian",
                                "Native Hawaiian or Other Pacific Islander",
                                "Other",
                                "Prefer Not To Answer"
                            ]}
                            error={errors.race}
                        />
                    </div>
                    <div className="col-span-2">
                        <Selector
                            name="dietaryRestrictions"
                            label="Dietary Restrictions"
                            control={control}
                            multiple
                            options={[
                                "Gluten Free",
                                "Vegetarian",
                                "Vegan",
                                "Lactose Intolerant",
                                "Nut Allergy",
                                "Halal",
                                "Kosher"
                            ]}
                            error={errors.dietaryRestrictions}
                        />
                    </div>
                    <div className="col-span-2">
                        <InputField name="accommodationNeeds" type="text" label="Accommodation needs" register={register} error={errors.accommodationNeeds} />
                    </div>
                    <div className="col-span-2">
                        <Selector name="firstTimeHacker" label="First-time hacker?" options={["Yes", "No"]} control={control} error={errors.firstTimeHacker} />
                    </div>
                    <div className="col-span-2">
                        <InputField name="whyAttend" type="text" label="Why would you like to attend VandyHacks?" register={register} error={errors.whyAttend} textWrap/>
                    </div>
                    <div className="col-span-2">
                        <InputField name="techIndustryInterest" type="text" label="Which tech industry, if any, do you want to get into?" register={register} error={errors.techIndustryInterest} textWrap/>
                    </div>
                    <div className="col-span-2">
                        <InputField name="techStackFamiliarity" type="text" label="Which tech stack, if any, are you familiar with?" register={register} error={errors.techStackFamiliarity} textWrap/>
                    </div>
                    <div className="col-span-2">
                        <InputField name="passions" type="text" label="What are you passionate about?" register={register} error={errors.passions} textWrap/>
                    </div>
                    <div className="col-span-2">
                        <Selector
                            name="gainFromVandyHacks"
                            label="What do you hope to gain from VandyHacks?"
                            control={control}
                            multiple
                            options={[
                                "Get an intro to coding",
                                "Create a project",
                                "Have some fun with other people in the tech community",
                                "Internship opportunities",
                                "Other"
                            ]}
                            textWrap
                            error={errors.gainFromVandyHacks}
                        />
                    </div>
                    <div className="col-span-2">
                        <Selector name="shirtSize" label="Shirt Size" options={["XS", "S", "M", "L", "XL", "XXL"]} control={control} error={errors.shirtSize} />
                    </div>
                    <div className="col-span-2">
                        <Selector name="overnight" label="Are you staying overnight in the venue?" options={["Yes", "No"]} control={control} textWrap error={errors.overnight}/>
                    </div>
                    <div className="col-span-2">
                        <Selector
                            name="usStatus"
                            label="Are you a U.S. Citizen, Permanent Resident, or granted the status of Immigrant, Refugee, Asylee or Deferred Action for Childhood Arrival (DACA), by the Bureau of Citizenship and Immigration Services?"
                            options={["Yes", "No"]}
                            control={control}
                            textWrap
                            error={errors.usStatus}
                        />
                    </div>
                    <div className="col-span-2">
                        <Selector name="volunteerContact" label="Would you like to be contacted about volunteering at the event?" options={["Yes", "No"]} control={control} textWrap error={errors.volunteerContact}/>
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
            </form>
        </div>
    );
}