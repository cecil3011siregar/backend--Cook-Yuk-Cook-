import { randomUUID } from "crypto";
import { diskStorage } from "multer";
import { extname } from "path";

type validMimeType = 'image/jpg' | 'image/jpeg' | 'image/png';

const validMimeTypes: validMimeType[] = [
  'image/png', 
  'image/jpg',
  'image/jpeg'
]

export const storageProfile = {
    storage: diskStorage({
      destination: 'upload/profile',
      filename: (req, file, callback) => {
        const unique = randomUUID();
        const ext = extname(file.originalname);
        const photoName = `${unique}${ext}`;
  
        callback(null, photoName);
      },
    }), 
    fileFilter: (req, file, callback) => {
      const allowedMimeTypes: validMimeType[] = validMimeTypes
      allowedMimeTypes.includes(file.mimetype) ? callback(null, true): callback(null, false)
    }
}