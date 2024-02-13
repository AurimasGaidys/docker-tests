"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var amqp = require("amqplib/callback_api");
var createMQConsumer = function (amqpURl, queueName) {
    console.log('Connecting to RabbitMQ...');
    return function () {
        try {
            amqp.connect(amqpURl, function (errConn, conn) {
                if (errConn) {
                    throw errConn;
                }
                conn.createChannel(function (errChan, chan) {
                    if (errChan) {
                        throw errChan;
                    }
                    console.log('Connected to RabbitMQ');
                    chan.assertQueue(queueName, { durable: true });
                    chan.consume(queueName, function (msg) {
                        console.log('Consuming message from RabbitMQ...' + (msg === null || msg === void 0 ? void 0 : msg.content.toString()));
                        // if (msg) {
                        //     var parsed = JSON.parse(msg.content.toString());
                        //     switch (parsed.action) {
                        //         case 'REGISTER':
                        //             console.log('Consuming REGISTER action', parsed.data);
                        //             break;
                        //         case 'LOGIN':
                        //             console.log('Consuming LOGIN action', parsed.data);
                        //             break;
                        //         default:
                        //             break;
                        //     }
                        // }
                    }, { noAck: true });
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    };
};
exports.default = createMQConsumer;
