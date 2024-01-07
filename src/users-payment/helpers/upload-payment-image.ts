import { randomUUID } from "crypto";
import { diskStorage } from "multer";
import { extname } from "path";

type validMimeType = 'image/png' | 'image/jpg' | 'image/jpeg';
const validMimeTypes: validMimeType[] = [
'image/jpeg',
'image/jpg',
'image/png',
]
export const storagePayment = {
    storage: diskStorage({
      //pastikan sudah membua folder sesuai path destination
      destination: 'upload/payment', //disini kita akan simpan file yang sudah di upload
      filename: (req, file, callback) => {
        const unique = randomUUID();
        const ext = extname(file.originalname);
        const photoName = `${unique}${ext}`; //generate/ubah filename dengan uuid (supaya unique)

        callback(null, photoName);
      },
    }),
    fileFilter: (req, file, callback) => {
      const allowedMimeTypes: validMimeType[] = validMimeTypes
      allowedMimeTypes.includes(file.mimetype) ? callback(null, true): callback(null, false) //validasi jenis file
    }
}