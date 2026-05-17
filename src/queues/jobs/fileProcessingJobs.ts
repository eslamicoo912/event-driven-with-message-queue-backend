export const FILE_PROCESSING_JOB_NAMES = {
    IMAGE_PROCESSING: "image-processing"
}

export interface FileProcessingJobData {
    imageId: string;
    path: string;
    mimeType: string;
}