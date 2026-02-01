import mongoose, { mongo } from "mongoose";
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


const ApplicantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    preferredName: { type: String },
    age: { type: Number, required: true },
    major: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    gender: { type: String, enum: GENDER_OPTIONS, required: true },
    levelOfStudy: {
        type: String,
        enum: LEVEL_OF_STUDY_OPTIONS,
        required: true
    },
    graduationYear: { type: String, enum: GRADUATION_YEAR_OPTIONS, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
    race: { 
        type: String, 
        enum: RACE_OPTIONS, 
        required: true 
    },
    dietaryRestrictions: { 
        type: [String], 
        enum: DIETARY_OPTIONS,
        required: true 
    },
    accommodationNeeds: { type: String },
    firstTimeHacker: { type: String, enum: YES_NO_OPTIONS, required: true },
    whyAttend: { type: String },
    techIndustryInterest: { type: String },
    techStackFamiliarity: { type: String },
    passions: { type: String },
    gainFromVandyHacks: { 
            type: [String], 
            enum: GAIN_FROM_VANDYHACKS_OPTIONS, 
            required: true 
    },
    shirtSize: { type: String, enum: SHIRT_SIZES, required: true },
    overnight: { type: String, enum: YES_NO_OPTIONS, required: true },
    usStatus: { type: String, enum: YES_NO_OPTIONS, required: true },
    volunteerContact: { type: String, enum: YES_NO_OPTIONS, required: true },
    resume: { type: String }
});

const AnalyticsSchema = new mongoose.Schema({
    pageLoadID: { type: String, maxLength: 100 },
    events: { 
        type: [String],
        validate: {
            validator: (v) => {
                return v.length < 20
            }
        } 
    }
})

export const Applicant = mongoose.models.Applicant || mongoose.model("Applicant", ApplicantSchema);
export const Analytics = mongoose.models.Analytics || mongoose.model("Analytics", AnalyticsSchema);
