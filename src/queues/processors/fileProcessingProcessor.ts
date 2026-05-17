import type { Job } from "bullmq";
import { FileProcessingService } from "../../services/FileProcessingService";
import { FileProcessingJobData } from "../jobs/fileProcessingJobs";


export function fileProcessingProcessor(fileProcessingService: FileProcessingService) {
    return async function createProcessor(job: Job<FileProcessingJobData>) {
        await fileProcessingService.processUploadedImage({
            imageId: job.data.imageId,
            mimeType: job.data.mimeType,
            path: job.data.path
        });
    }
}