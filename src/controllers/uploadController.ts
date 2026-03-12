import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { sendSuccess, sendError } from '../utils/response';
import { getPresignedUploadUrl } from '../services/s3service';
import { deleteFileFromS3 } from '../utils/s3Delete';

export const getPresignedUploadUrls = async (req: Request, res: Response) => {
  try {
    const { files } = req.body;

    if (!Array.isArray(files) || files.length === 0) {
      return sendError(res, 'files array is required', 400);
    }

    const uploads = await Promise.all(
      files.map(async (file) => {
        if (!file.file_type) {
          throw new Error("file_type is required for each file");
        }

        const extension = file.file_name?.split(".").pop() || "jpg";
        const key = `uploads/${uuid()}.${extension}`;

        const upload_url = await getPresignedUploadUrl(key, file.file_type);

        return {
          upload_url,
          file_url: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
        };
      })
    );

    sendSuccess(res, uploads, 'Presigned URLs generated');
  } catch (error) {
    sendError(res, (error as Error).message, 500);
  }
};


export const deleteFile = async (req: Request, res: Response) => {
  try {
    const { file_url } = req.body;

    if (!file_url) {
      return sendError(res, "file_url is required", 400);
    }

    await deleteFileFromS3(file_url);

    sendSuccess(res, {}, "File deleted successfully");
  } catch (error) {
    sendError(res, (error as Error).message, 500);
  }
};