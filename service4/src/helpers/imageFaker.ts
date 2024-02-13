import * as PImage from 'pureimage';
import * as fs from 'fs';

interface ImageFaker {
    generateFakeImageCallback: () => void;
    imageName: string;
}

export const generateFakeImage = ({ imageName, generateFakeImageCallback }: ImageFaker) => {

    // make image
    const img1 = PImage.make(100, 100);
    const ctx = img1.getContext("2d");
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 100, 100);

    PImage.encodePNGToStream(img1, fs.createWriteStream(`shared/${imageName}.png`))
        .then(() => {
            generateFakeImageCallback()
            console.log("wrote out the png file to out.png");
        })
        .catch((e) => {
            generateFakeImageCallback()
            console.log("there was an error writing", e);
        });      
};

