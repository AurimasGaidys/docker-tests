const PImage = require ('pureimage');
const fs = require ('fs');
const bodyParser = require ('body-parser');
const express = require ('express');
const app = express ();
const cors = require('cors')
const Producer = require ('./producer');
const producer = new Producer();

const port = 3000;

app.use(bodyParser.json("application/json"));
app.use(cors())

const generateHash = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

app.get ('/', (req, res) => res.send ('Hello World! service 1'));
app.get ('/generate', (req, res) => {
res.send ('New image generated!')

const imageName = generateHash();

// make image
const img1 = PImage.make(100, 100);
const ctx = img1.getContext("2d");
ctx.fillStyle = "red";
ctx.fillRect(0, 0, 100, 100);

PImage.encodePNGToStream(img1, fs.createWriteStream(`shared/${imageName}.png`))
  .then(() => {
      producer.send('image_success', `${imageName}`);
    console.log("wrote out the png file to out.png");
  })
  .catch((e) => {
    producer.send('image_fail', `${imageName}`);
    console.log("there was an error writing");
  });
});

app.listen (port, () => console.log (`Start image producer on port ${port}!`));


