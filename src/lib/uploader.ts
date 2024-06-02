import S3 from 'aws-sdk/clients/s3';

const s3Client = new S3({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
})

export async function uploadFile(buffer: Buffer, name: string) {
    const uploadParams: S3.PutObjectRequest = {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Body: buffer,
        Key: "images/" + name,
    }

    return s3Client.upload(uploadParams).promise()
}