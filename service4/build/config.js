"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    rabbitMQ: {
        // host: 'amqp://rabbitmq:5672',
        host: 'amqp://localhost:5672',
        imageUploadExchange: 'imageUploadExchange',
        processedName: 'filesProcessed',
        notifyProcessedExchange: 'notifyProcessedExchange',
    },
};
exports.default = config;
//# sourceMappingURL=config.js.map