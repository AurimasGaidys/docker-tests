const config = {
    rabbitMQ: {
        // host: 'amqp://rabbitmq:5672',
        host: 'amqp://localhost:5672',
        imageUploadExchange: 'imageUploadExchange',
        processedName: 'filesProcessed',
        notifyProcessedExchange: 'notifyProcessedExchange',
    },
}


export default config