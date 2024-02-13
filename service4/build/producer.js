"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqp = __importStar(require("amqplib/callback_api"));
const createMQProducer = (amqpUrl, queueName) => {
    console.log('Connecting to RabbitMQ...');
    let ch;
    amqp.connect(amqpUrl, (errorConnect, connection) => {
        if (errorConnect) {
            console.log('Error connecting to RabbitMQ: ', errorConnect);
            return;
        }
        connection.createChannel((errorChannel, channel) => {
            if (errorChannel) {
                console.log('Error creating channel: ', errorChannel);
                return;
            }
            ch = channel;
            console.log('Connected to RabbitMQ');
        });
    });
    return (msg) => {
        console.log('Produce message to RabbitMQ...');
        ch.sendToQueue(queueName, Buffer.from(msg));
    };
};
exports.default = createMQProducer;
//# sourceMappingURL=producer.js.map