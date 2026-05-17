import { fileProcessingProcessor } from "../processors/fileProcessingProcessor";
import { FileProcessingService } from "../../services/FileProcessingService";
import { ImageRepository } from "../../repositories/ImageRepository";
import { Worker } from "bullmq";
import { FILE_PROCESSING_JOB_NAMES } from "../jobs/fileProcessingJobs";
import { queueConnection } from "../queueConnection";

const imageRepository = new ImageRepository();
const fileProcessingService = new FileProcessingService(imageRepository)

const processor = fileProcessingProcessor(fileProcessingService)

export const fileProcessingWorker = new Worker("file-processing", async (job) => {

    if (job.name !== FILE_PROCESSING_JOB_NAMES.IMAGE_PROCESSING) {
        throw new Error(`Unknown file processing job: ${job.name}`)
    }

    return processor(job)
}, {
    connection: queueConnection,
    concurrency: 10
})