const { readdir, lstatSync, readFile } = require("fs");
const { join } = require("path");
const { PutObjectCommand } = require("@aws-sdk/client-s3");

class UploadFolderS3 {
  constructor(client) {
    if (!client) throw new Error("s3 client is required!");
    this.client = client;
  }
  async upload({ localFolderPath, s3FolderPath, bucketName }) {
    readdir(localFolderPath, async (error, contents) => {
      if (error) throw error;
      if (!contents || contents.length === 0) return;

      for (const content of contents) {
        const contentPath = join(localFolderPath, content);
        if (lstatSync(contentPath).isDirectory()) {
          await this.upload({
            localFolderPath: contentPath,
            s3FolderPath: join(s3FolderPath, content),
            bucketName,
          });
        } else {
          readFile(contentPath, async (error, fileContent) => {
            if (error) throw error;
            await this.client.send(
              new PutObjectCommand({
                Bucket: bucketName,
                Key: join(s3FolderPath, content),
                Body: fileContent,
              })
            );
          });
        }
      }
    });
  }
}

module.exports = UploadFolderS3;
