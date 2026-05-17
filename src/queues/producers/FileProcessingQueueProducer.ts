import { createQueue } from "../queueFactory";
import { FILE_PROCESSING_JOB_NAMES, FileProcessingJobData } from "../jobs/fileProcessingJobs";
import { QUEUE_NAMES } from "../queueNames";

const fileProcessingQueue = createQueue(QUEUE_NAMES.FILE_PROCESSING);

export class FileProcessingQueueProducer {
    async enqueueFileProcessingJob(data: FileProcessingJobData): Promise<void> {
        await fileProcessingQueue.add(FILE_PROCESSING_JOB_NAMES.IMAGE_PROCESSING, data, {
            attempts: 3,

            removeOnComplete: {
                age: 60 * 60 * 24,
                count: 100
            },

            removeOnFail: {
                age: 60 * 60 * 24 * 7,
                count: 500,
            },

            backoff: {
                type: "fixed",
                delay: 10000
            }
        })
    }
}