import { connectMongo } from "../../database/mongoose";
import { fileProcessingWorker } from "./fileProcessingWorker";

async function bootstrap() {

    await connectMongo()

    console.log("file processing worker started!")

    fileProcessingWorker.on("completed", (job) => {
        console.info("file processing job completed", {
            id: job.id,
            name: job.name
        })
    })

    fileProcessingWorker.on("failed", (job, error) => {
        console.error("file processing job failed", {
            jobId: job?.id,
            name: job?.name,
            error: error.message
        });
    });
}

bootstrap().catch((error) => {
    console.error("Failed to start file processing worker", error);
    process.exit(1)
})