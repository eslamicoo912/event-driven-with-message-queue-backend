import { connectMongo } from "../../database/mongoose";
import { emailWorker } from "./emailWorker";

async function bootstrab(): Promise<void> {
    await connectMongo();

    console.info("Email worker started");

    emailWorker.on("completed", (job) => {
        console.info("Email job completed", {
            id: job.id,
            name: job.name
        })
    })

    emailWorker.on("failed", (job, error) => {
        console.error("Email job failed", {
            jobId: job?.id,
            name: job?.name,
            error: error.message
        });
    });
}

bootstrab().catch((error) => {
    console.error("Failed to start email worker", error);
    process.exit(1)
})