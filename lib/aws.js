'use server'

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 } from "uuid";

const s3 = new S3Client({
    region: process.env.VH_AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.VH_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.VH_AWS_SECRET_ACCESS_KEY
    }
})

export async function uploadResume(buffer, mime) {

    try {
        const key = `${v4()}.pdf`;
        await s3.send(
            new PutObjectCommand({
                Bucket: process.env.VH_AWS_BUCKET_NAME,
                Key: key,
                Body: buffer,
                ContentType: mime
            })
        );
        return key;
    }
    catch (e) {
        console.error("Error uploading file:", e);
        return null;
    }

}