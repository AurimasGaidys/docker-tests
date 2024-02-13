const amqp = require('amqplib');
const config = require('./config');

class Producer {
    channel;

    constructor() {
    }

    async createChannel () {
        this.connection = await amqp.connect(config.rabbitMQ.host);
        this.channel = await this.connection.createChannel();
    }

    async send(routeKey, message) {

        if (!this.channel) {
            await this.createChannel();
        }

        const logDetails = {
            message,
            dateL : new Date()
        }
        
        this.channel.assertExchange(config.rabbitMQ.imageUploadExchange, 'direct');
        this.channel.publish(config.rabbitMQ.imageUploadExchange, routeKey, Buffer.from(JSON.stringify(logDetails)));

        console.log(`[x] Sent ${message} to ${routeKey} in ${config.rabbitMQ.imageUploadExchange}`);
    }
}

module.exports = Producer;