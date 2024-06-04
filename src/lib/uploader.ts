import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
})

export async function uploadFile(buffer: Buffer, name: string) {
    const location = "images/" + name
    const uploadParams = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Body: buffer,
        Key: location
    })

    return {
        ...await s3.send(uploadParams), 
        location: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${location}`
    }
}