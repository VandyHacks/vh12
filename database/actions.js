'use server'

import { connectToDatabase } from "@/database/mongoose"
import { Applicant } from "@/database/schemas"
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { uploadResume } from "@/lib/aws"
import { fileTypeFromBuffer } from 'file-type';
import {
  GENDER_OPTIONS,
  LEVEL_OF_STUDY_OPTIONS,
  GRADUATION_YEAR_OPTIONS,
  RACE_OPTIONS,
  DIETARY_OPTIONS,
  GAIN_FROM_VANDYHACKS_OPTIONS,
  SHIRT_SIZES,
  YES_NO_OPTIONS,
} from '@/lib/constants'
import { success } from "better-auth";

export const submitForm = async (data, files) => {

    try {

        const session = (await auth()).api.getSession({
            headers: await headers()
        });

        if (!session) return { success: false, error: "Authentication error. Please try signing in again." };

        await connectToDatabase();
        const alreadyApplied = Boolean(await Applicant.exists({ email: session.user.email }));
        if (alreadyApplied) return { success: false, error: "You have already applied! If this seems to be incorrect, please contact support." };

        for (const k in data) {
            if (typeof data[k] === 'string') data[k] = data[k].trim();
            else if (Array.isArray(data[k])) data[k] = data[k].map(e => typeof e === 'string' ? e.trim() : e);
        }

        const lengths = {
            name: [2,30],
            age: [null,2],
            major: [2,30],
            phoneNumber: [null,15],
            addressLine1: [null,50],
            addressLine2: [null,50],
            city: [null,50],
            state: [null,50],
            zipCode: [null,50],
            country: [null,50],
            accommodationNeeds: [null,150],
            whyAttend: [null,150],
            techIndustryInterest: [null,150],
            techStackFamiliarity: [null,150],
            passions: [null,150]
        }

        for (const [k, v] of Object.entries(lengths)) {
            const val = data[k];
            if (val == null) continue;
            if (typeof val === 'string') {
                const min = v[0], max = v[1];
                if (min && val.length < min) return { success: false };
                if (max && val.length > max) return { success: false };
            }
        }

        if (!GENDER_OPTIONS.includes(data.gender)) return { success: false };
        if (!LEVEL_OF_STUDY_OPTIONS.includes(data.levelOfStudy)) return { success: false };
        if (!GRADUATION_YEAR_OPTIONS.includes(data.graduationYear)) return { success: false };
        if (!RACE_OPTIONS.includes(data.race)) return { success: false };
        if (!Array.isArray(data.dietaryRestrictions) || !data.dietaryRestrictions.every(x => DIETARY_OPTIONS.includes(x))) return { success: false };
        if (new Set(data.dietaryRestrictions).size !== data.dietaryRestrictions.length) return { success: false };
        if (!YES_NO_OPTIONS.includes(data.firstTimeHacker)) return { success: false };
        if (!Array.isArray(data.gainFromVandyHacks) || !data.gainFromVandyHacks.every(x => GAIN_FROM_VANDYHACKS_OPTIONS.includes(x))) return { success: false };
        if (new Set(data.gainFromVandyHacks).size !== data.gainFromVandyHacks.length) return { success: false };
        if (!SHIRT_SIZES.includes(data.shirtSize)) return { success: false };
        if (!YES_NO_OPTIONS.includes(data.overnight)) return { success: false };
        if (!YES_NO_OPTIONS.includes(data.usStatus)) return { success: false };
        if (!YES_NO_OPTIONS.includes(data.volunteerContact)) return { success: false };

        let resumeKey = "";
        if (files.has("resume")) {
            const file = files.get("resume");
            if (!(file instanceof File)) return { success: false };
            if (file.size > 500 * 1024) return { success: false };
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const type = await fileTypeFromBuffer(buffer);
            if (!type || type.ext != "pdf") return { success: false };
            resumeKey = await uploadResume(buffer, type.mime);
            if (resumeKey === null) return { success: false }
        }

        const applicant = new Applicant({ ...data, email: session.user.email, resume: resumeKey });

        await applicant.save();
        return { success: true };

    }
    catch (e) {
        console.error(e);
        return { success: false };
    }

}