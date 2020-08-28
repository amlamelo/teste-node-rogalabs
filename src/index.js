const logger = require('./v1/common/config/logger');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

app.use(express.static("public"));

const DenunciasRouter = require('./v1/denuncias/routesConfig');

app.use(cors());
app.use(bodyParser.json());

DenunciasRouter.routesConfig(app);

const server = app.listen(process.env.PORT, () => {
    logger.info(`Aplicação inicializada na porta ${process.env.PORT}!`);
});

module.exports = server;
