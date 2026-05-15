import { connectMongo } from "../../database/mongoose";
import { notificationWorker } from "./notificationWorker";

async function bootstrab() {
    await connectMongo();

    console.info("Notification Worker started!")

    notificationWorker.on("completed", (job) => {
        console.info("nnotification job completed", {
            id: job.id,
            name: job.name
        })
    })

    notificationWorker.on("failed", (job, error) => {
        console.error("notification job failed", {
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