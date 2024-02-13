"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const producer_1 = __importDefault(require("./producer"));
const config_1 = __importDefault(require("./config"));
const cors_1 = __importDefault(require("cors"));
const imageHash_1 = require("./helpers/imageHash");
const imageFaker_1 = require("./helpers/imageFaker");
const PORT = 3042;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
const AMQP_URL = config_1.default.rabbitMQ.host;
const QUEUE_NAME = config_1.default.rabbitMQ.imageUploadExchange;
const producer = (0, producer_1.default)(AMQP_URL, QUEUE_NAME);
app.get('/', (req, res) => {
    res.send('Image generated');
    const imageName = (0, imageHash_1.generateHash)();
    (0, imageFaker_1.generateFakeImage)({
        imageName,
        generateFakeImageCallback: () => {
            const msg = {
                action: 'IMAGE_UPLOAD',
                data: { name: imageName },
            };
            producer(JSON.stringify(msg));
        }
    });
});
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
//# sourceMappingURL=index.js.map