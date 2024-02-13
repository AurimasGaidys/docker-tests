"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFakeImage = void 0;
const PImage = __importStar(require("pureimage"));
const fs = __importStar(require("fs"));
const generateFakeImage = ({ imageName, generateFakeImageCallback }) => {
    // make image
    const img1 = PImage.make(100, 100);
    const ctx = img1.getContext("2d");
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 100, 100);
    PImage.encodePNGToStream(img1, fs.createWriteStream(`shared/${imageName}.png`))
        .then(() => {
        generateFakeImageCallback();
        console.log("wrote out the png file to out.png");
    })
        .catch((e) => {
        generateFakeImageCallback();
        console.log("there was an error writing", e);
    });
};
exports.generateFakeImage = generateFakeImage;
//# sourceMappingURL=imageFaker.js.map