import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
});

export const deleteFileFromS3 = async (fileUrl: string) => {
  if (!fileUrl) return;

  try {
    const url = new URL(fileUrl);

    const key = url.pathname.substring(1); // remove leading /

    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: key,
    });

    await s3.send(command);
  } catch (error) {
    console.error("S3 delete failed:", error);
  }
};