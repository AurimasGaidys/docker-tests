import config from "./config";
import createMQConsumer from "./consumer";

async function subscribeToNewImageCreate() {
    try {
        const consumer = createMQConsumer(config.rabbitMQ.host, config.rabbitMQ.imageUploadExchange)
        consumer();
    } catch (error) {
        console.log(error);
    }
}

subscribeToNewImageCreate();