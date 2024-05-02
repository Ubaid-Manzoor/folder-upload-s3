Upload entire folders to Amazon S3 with ease!
And without giving away yours us.

## Installation

`npm install upload-folder-s3`

## Usage

```javascript
const UploadFolderS3 = require("upload-folder-to-s3");
const { S3Client } = require("@aws-sdk/client-s3");

// Configure AWS
const s3Client = new S3Client({
  region: "REGION",
  credentials: {
    accessKeyId: "ACCESS_KEY_ID",
    secretAccessKey: "SECRET_ACCESS_KEY",
  },
});

// Create an instance of the UploadFolderS3 class, we will only need client, no credentials
const uploadClient = new UploadFolderS3(s3Client);

// Upload folder to S3
uploadClient
  .upload({
    localFolderPath: "/local/folder/path",
    s3FolderPath: "s3/folder/path",
    bucketName: "YOUR_BUCKET_NAME",
  })
  .then(() => {
    console.log("Upload done");
  })
  .catch((error) => {
    console.error("Error uploading folder:", error);
  });
```

## Parameters

- `localFolderPath`: Path to the local folder you want to upload.
- `s3FolderPath`: Path in the S3 bucket where you want to upload the folder.
- `bucketName`: Name of the S3 bucket where you want to upload the folder.

## Wishlist

- [x] Upload a entire folder to S3 instead file
- [x] Async upload of files to improve time
- [] Return the list of files uploaded with the final URL
- [] Retry the failed upload and return the status.
- [] Batch Process, upload file in Batches

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue if you encounter any problems or have suggestions for improvements.
