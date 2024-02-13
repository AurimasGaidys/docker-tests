"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import amqp, { Connection } from 'amqplib/callback_api'
var amqp = require("amqplib/callback_api");
var createMQProducer = function (amqpUrl, queueName) {
    console.log('Connecting to RabbitMQ...');
    var ch;
    amqp.connect(amqpUrl, function (errorConnect, connection) {
        if (errorConnect) {
            console.log('Error connecting to RabbitMQ: ', errorConnect);
            return;
        }
        connection.createChannel(function (errorChannel, channel) {
            if (errorChannel) {
                console.log('Error creating channel: ', errorChannel);
                return;
            }
            ch = channel;
            console.log('Connected to RabbitMQ');
        });
    });
    return function (msg) {
        console.log('Produce message to RabbitMQ...');
        ch.sendToQueue(queueName, Buffer.from(msg));
    };
};
exports.default = createMQProducer;
