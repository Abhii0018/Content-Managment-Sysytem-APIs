import multer from 'multer';
import path from 'path';

//storage configuration

const storage = multer.diskStorage({
    destination: (req, file, cb) => { //cb: callback function
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName= Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const filename = `${uniqueName}${ext}`;
        cb(null, filename);
    }
});

//file type valodation

const fileFilter = (req, file, cb) => {
    if(
       file.mimetype.startsWith('image/') ||
    //    file.mimetype.startsWith('video/')||
       file.mimetype === 'application/pdf'
    ) {
        cb(null, true);
    } else {   
        cb(new Error('Only image, video, and PDF files are allowed'), false);
    }
}

//Export multer instance

export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } //5MB
});