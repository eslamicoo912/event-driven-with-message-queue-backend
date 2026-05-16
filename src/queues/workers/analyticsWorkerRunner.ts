import { analyticsWorker } from "./analyticsWorker";
import { connectMongo } from "../../database/mongoose";

async function bootstrap(): Promise<void> {

    await connectMongo();

    console.info("Analytics Worker Started");

    analyticsWorker.on("completed", (job) => {
        console.info("Analytics Worker job completed", {
            id: job.id,
            name: job.name,
            data: job.data
        })
    })

    analyticsWorker.on("failed", (job, error) => {
        console.info("Analytics Worker job failed", {
            id: job?.id,
            name: job?.name,
            date: job?.data,
            error: {
                name: error.name,
                message: error.message,
                cause: error.cause,
                satck: error.stack
            }
        })
    })
}

bootstrap().catch((error) => {
    console.error("Failed to start email worker", error);
    process.exit(1)
})