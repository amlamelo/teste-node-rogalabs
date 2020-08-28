const logger = require('../../common/config/logger');
const DenunciaModel = require('../models/denunciaModel');

exports.create = (req, res) => {
    DenunciaModel.insert(req.body)
        .then((result) => {
            res.status(201).send(result);
        })
        .catch((error)=>{
            logger.error({body: req.body, error: error});
            res.status(500).send(error);
        });
};
