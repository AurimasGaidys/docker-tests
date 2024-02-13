const amqp = require('amqplib');
const config = require('../config');

class Producer {
    channel;

    constructor() {
    }

    async createChannel () {
        this.connection = await amqp.connect(config.rabbitMQ.host);
        this.channel = await this.connection.createChannel();
    }

    async produceMessage(message) {
        const connection = await amqp.connect(config.rabbitMQ.host);
        const channel = await connection.createChannel();
      
        await channel.assertQueue(config.rabbitMQ.notifyProcessedExchange);

        const logDetails = {
            message,
            date : new Date()
        }
        
        channel.sendToQueue(config.rabbitMQ.notifyProcessedExchange, Buffer.from(JSON.stringify(logDetails)));
      
        console.log(`Sent: ${message}`);
        
        setTimeout(() => {
          connection.close();
        }, 500);
      }
      

    async send(routeKey, message) {
        this.produceMessage(message);
        console.log(`[xXx] Sent ${message} to ${routeKey} in ${config.rabbitMQ.notifyProcessedExchange}`);
    }
}

module.exports = Producer;