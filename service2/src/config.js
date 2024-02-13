module.exports = {
    rabbitMQ: {
        // host: 'amqp://localhost:5672',
        host: 'amqp://rabbitmq:5672',
        imageUploadExchange: 'imageUploadExchange',
        notifyProcessedExchange: 'notifyProcessedExchange',
        final: 'final',
    },
}