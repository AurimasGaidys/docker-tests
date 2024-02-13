import * as amqp from 'amqplib/callback_api'
import { Message } from 'amqplib/callback_api'

const createMQConsumer = (amqpURl: string, queueName: string) => {
    console.log('Connecting to RabbitMQ...')
    return () => {
        try {
            amqp.connect(amqpURl, (errConn, conn) => {
                if (errConn) {
                    throw errConn
                }

                conn.createChannel((errChan, chan) => {
                    if (errChan) {
                        throw errChan
                    }

                    console.log('Connected to RabbitMQ')
                    chan.assertQueue(queueName, { durable: true })
                    chan.consume(queueName, (msg: Message | null) => {
                        console.log('Consuming message from RabbitMQ...' + msg?.content.toString())
                        if (msg) {
                            const parsed = JSON.parse(msg.content.toString())
                            switch (parsed.action) {
                                case 'REGISTER':
                                    console.log('Consuming REGISTER action', parsed.data)
                                    break
                                case 'LOGIN':
                                    console.log('Consuming LOGIN action', parsed.data)
                                    break
                                default:
                                    break
                            }
                        }
                    }, { noAck: true })
                })
            })
        } catch (error) {
            console.log(error);
        }

    }
}

export default createMQConsumer