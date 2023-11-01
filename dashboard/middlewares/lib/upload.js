import multer from 'multer';
import path from 'path';
import fs from 'fs';

const fileFilter = (req, file, cb) => {
    const allowedAvatarTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (!allowedAvatarTypes.includes(file.mimetype)) {
        cb(new Error("Bu resim türü desteklenmiyor"), false);
    } else {
        cb(null, true);
    }
};


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const rootDir = path.dirname(require.main.filename)

      console.log(rootDir)
      fs.mkdirSync(path.join(rootDir,  "/dashboard/photos" ), {recursive: true})
      cb(null, path.join(rootDir, "/dashboard/photos")) 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); 
    }
  });
  

  const upload = multer({ storage, fileFilter }).single('avatar');;

export default upload;