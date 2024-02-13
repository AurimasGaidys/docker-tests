
import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import createMQProducer from './producer'
import config from './config'
import cors from "cors";
import { generateHash } from './helpers/imageHash';
import { generateFakeImage } from './helpers/imageFaker';

const PORT = 3042

const app = express()

app.use(bodyParser.json())
app.use(cors<Request>());

const AMQP_URL = config.rabbitMQ.host
const QUEUE_NAME = config.rabbitMQ.imageUploadExchange

const producer = createMQProducer(AMQP_URL, QUEUE_NAME)

app.get('/', (req: Request, res: Response) => {
  res.send('Image generated')

  const imageName = generateHash();

  generateFakeImage({
    imageName,
    generateFakeImageCallback: () => {
      const msg = {
        action: 'IMAGE_UPLOAD',
        data: { name: imageName },
      }
      producer(JSON.stringify(msg))
    }
  })

})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})