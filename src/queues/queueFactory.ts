import { Queue } from "bullmq";
import { queueConnection } from "./queueConnection";

// This file keeps BullMQ construction centralized.

export function createQueue<DataType>(name: string): Queue<DataType> {
    return new Queue<DataType>(name, {
        connection: queueConnection
    })
};