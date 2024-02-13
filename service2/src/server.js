const express = require ('express');
const amqp = require('amqplib');
const app = express ();
const cors = require('cors')

const config = require('./config');
const port = 3030;

let messages = [];

app.use(cors())

app.get ('/', (req, res) => res.send (JSON.stringify(messages)));

app.listen (port, () => console.log (`Example app listening on port ${port}!`));

// async function consumeMessages() {
//     try {
//         const connection = await amqp.connect(config.rabbitMQ.host);
//         const channel = await connection.createChannel();
//         await channel.assertQueue(config.rabbitMQ.final, 'direct');
//         const q = await channel.assertQueue(config.rabbitMQ.notifyProcessedExchange);
//         await channel.bindQueue(q.queue, config.rabbitMQ.final, 'image_proccessed');

//         channel.consume(q.queue, msg => {
//             const data = JSON.parse(msg.content);
//             console.log(`[x] Received ${msg.content.toString()}`);
//             messages.push(data);
//             channel.ack(msg);
//         })

//         console.log("waiting for msgs11");
//     } catch (error) {
//         console.log(error);
//     }
// }

// consumeMessages();


async function consumeMessage() {
    const connection = await amqp.connect(config.rabbitMQ.host);
    const channel = await connection.createChannel();
  
    await channel.assertQueue(config.rabbitMQ.notifyProcessedExchange);
    console.log('Waiting for messages...');
  
    channel.consume(config.rabbitMQ.notifyProcessedExchange, (message) => {
      const content = message.content.toString();
      console.log(`Received: ${content}`);
      const data = JSON.parse(content);
      messages.push(data);
    }, { noAck: true });
  }
  
  consumeMessage();