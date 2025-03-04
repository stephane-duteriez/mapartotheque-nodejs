import { Router, Request, Response, NextFunction } from 'express';;
import Multer from 'multer';
import { format } from 'url';
import { Storage } from '@google-cloud/storage';

const router = Router();
const storage = new Storage();

const multer = Multer({
	storage: Multer.memoryStorage(),
	limits: {
	  fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
	},
});

const bucket = storage.bucket("mapartotheque-js");

router.post('/upload', multer.single('file'), (req: Request, res: Response, next: NextFunction) => {
	if (!req.file) {
	  res.status(400).send('No file uploaded.');
	  return;
	}
  
	// Create a new blob in the bucket and upload the file data.
	const blob = bucket.file(req.file.originalname);
	const blobStream = blob.createWriteStream();
  
	blobStream.on('error', (err: unknown) => {
	  next(err);
	});
  
	blobStream.on('finish', () => {
	  // The public URL can be used to directly access the file via HTTP.
	  const publicUrl = format(
			`https://storage.googleapis.com/${bucket.name}/${blob.name}`
	  );
	  res.status(200).send({url: publicUrl});
	});
  
	blobStream.end(req.file.buffer);
});




export { router as storage }