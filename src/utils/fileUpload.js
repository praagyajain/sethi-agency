import aws from "aws-sdk";
import fs from "fs";
import path from "path";
const { S3 } = aws;

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  signatureVersion: "v4",
});
export default async (file) => {
  if (
    !process.env.AWS_ACCESS_KEY ||
    !process.env.AWS_SECRET_ACCESS_KEY ||
    !process.env.BUCKET_NAME
  ) {
    throw new Error("Missing required environment variables for AWS S3.");
  }

  const fileExtension = path.extname(file.name);
  const fileName = path
    .basename(file.name, fileExtension)
    .replace(/\s/g, "")
    .toLowerCase();
  const key = `${fileName}/${Date.now().toString()}${fileExtension}`;

  let fileData;
  try {
    fileData = await fs.promises.readFile(file.tempFilePath);
  } catch (err) {
    return {
      success: false,
      error: "Error reading file",
    };
  }
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    Body: fileData,
    ContentType: file.mimetype,
  };

  try {
    const data = await s3.upload(params).promise();
    return {
      success: true,
      imgPath: data.Location,
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
};
