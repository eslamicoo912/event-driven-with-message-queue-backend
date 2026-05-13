import path from "path";
import multer from "multer";
import { env } from "./env";
import { randomId } from "../utils/randomId";

const storage = multer.diskStorage({
  destination: env.UPLOAD_DIR,
  filename: (_request, file, callback) => {
    const extension = path.extname(file.originalname);
    callback(null, `${Date.now()}-${randomId()}${extension}`);
  }
});

// Multer only handles transport-level file parsing; business processing stays in services.
export const imageUpload = multer({
  storage,
  limits: {
    fileSize: env.MAX_FILE_SIZE_MB * 1024 * 1024
  },
  fileFilter: (_request, file, callback) => {
    if (!file.mimetype.startsWith("image/")) {
      callback(new Error("Only image uploads are allowed"));
      return;
    }

    callback(null, true);
  }
});
