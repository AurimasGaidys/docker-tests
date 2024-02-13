const amqp = require('amqplib');
const config = require('./config');
const fs = require ('fs');

const Producer = require ('../producer');
const producer = new Producer();

async function subscribeToNewImageCreate() {
    try {
        const connection = await amqp.connect(config.rabbitMQ.host);
        const channel = await connection.createChannel();
        await channel.assertExchange(config.rabbitMQ.imageUploadExchange, 'direct');
        const q = await channel.assertQueue(config.rabbitMQ.processedName);
        await channel.bindQueue(q.queue, config.rabbitMQ.imageUploadExchange, 'image_success');

        channel.consume(q.queue, msg => {
            const data = JSON.parse(msg.content);
            console.log(`[x] Received ${data.message}`);
            console.log("start analysis.");
            writeToFile(data);
            console.log("analysis txt created.");
            channel.ack(msg);
            producer.send('image_proccessed', `${data.message}`);
        } )
        console.log("waiting for msgs");
    } catch (error) {
        console.log(error);
    }
}

subscribeToNewImageCreate();

const writeToFile = (data) => {
    fs.writeFileSync(`shared/${data.message}.txt`, "it is a red squere");
}
