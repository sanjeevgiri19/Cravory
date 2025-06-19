import multer from "multer";
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1025 * 1025,
  },
});

export default upload
