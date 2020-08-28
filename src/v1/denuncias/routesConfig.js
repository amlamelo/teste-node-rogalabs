const DenunciaController = require('./controllers/denunciaController');
const DenunciaMiddleware = require('./middlewares/denunciaMiddleware');

/**
 * @api {post} /v1/denuncias Criar uma denúncia
 * @apiVersion 1.0.0 
 * @apiGroup API RESTful de Denúnias
 *
 * @apiParam (Request body) {String} latutide Latitude da localidade onde ocorreu a denúncia
 * @apiParam (Request body) {String} longitude Longitude da localidade onde ocorreu a denúncia
 * @apiParam (Request body) {String} denunciante Objeto JSON composto por nome e cpf
 * @apiParam (Request body) {String} denuncia Objeto JSON composto por titulo e descrição
 *
 * @apiParamExample {json} Corpo da Mensagem
 * {
 *      "latitude": -9.648197,
 *      "longitude": -35.713458,
 *      "denunciante": {
 *          "nome": "José de Oliveira",
 *          "cpf": "95761638037"
 *      },
 *      "denuncia": {
 *          "titulo": "Esgoto a céu aberto",
 *          "descricao": "Existe um esgoto a céu aberto nesta localidade."
 *      }
 *  }
 * 
 * 
 * @apiSuccess {JSON} Mensagem de denúnia inclúida
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *       "data": {
 *           "latitude": -9.648197,
 *           "longitude": -35.713458,
 *           "denunciante": {
 *               "nome": "José de Oliveira",
 *               "cpf": "95761638037"
 *           },
 *           "denuncia": {
 *               "titulo": "Esgoto a céu aberto",
 *               "descricao": "Existe um esgoto a céu aberto nesta localidade."
 *           },
 *           "endereco": {
 *               "logradouro": "Avenida Dona Constança de Góes Monteiro",
 *               "bairro": "",
 *               "cidade": "Maceió",
 *               "estado": "Alagoas",
 *               "pais": "BR",
 *               "cep": "57036-371"
 *           },
 *           "id": "5f4906d0102bbd511b2c8465"
 *       }
 *   }
 *
 * @apiErrorExample {json} Erro
 *      HTTP/1.1 400 OK
 *      {
 *          "error": {
 *              "message": "Request Body com informação de endereço inválida.",
 *              "code": "03"
 *          }
 *      }
 *
 */
exports.routesConfig = (app) => {
    app.post('/v1/denuncias', [
        DenunciaMiddleware.validRequestBody,
        DenunciaController.create
    ]);

}