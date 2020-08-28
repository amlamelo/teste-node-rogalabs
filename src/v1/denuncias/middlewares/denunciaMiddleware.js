const logger = require('../../common/config/logger');

exports.validRequestBody = (req, res, next) => {
    if (Object.keys(req.body).length > 0) {
        if (!req.body.latitude || !req.body.longitude) {
            logger.error({body: req.body, error: {message: 'Request Body com informação de endereço inválida.', code: '03'}});
            return res.status(400).send({error: {message: 'Request Body com informação de endereço inválida.', code: '03'}});
        };

        if (!req.body.denunciante || !req.body.denunciante.nome || !req.body.denunciante.cpf) {
            logger.error({body: req.body, error: {message: 'Request Body com informação de denunciante inválida.', code: '04'}});
            return res.status(400).send({error: {message: 'Request Body com informação de denunciante inválida.', code: '04'}});
        };

        if (!req.body.denuncia || !req.body.denuncia.titulo || !req.body.denuncia.descricao) {
            logger.error({body: req.body, error: {message: 'Request Body com informação da denúncia inválida.', code: '05'}});
            return res.status(400).send({error: {message: 'Request Body com informação da denúncia inválida.', code: '05'}});
        };

        next();
    } else {
        logger.error({body: req.body, error: {message: 'Request inválido.', code: '01'}});
        return res.status(400).send({error: {message: 'Request inválido.', code: '01'}});
    };

};
