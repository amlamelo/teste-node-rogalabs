const logger = require('../src/v1/common/config/logger');
const request = require('supertest');
const app = require('../src/index.js');
const dbConnection = require('../src/v1/common/config/dbConnectionConfig');


afterAll(() => {
    logger.info('Conexão do MongoDB encerrada.');
    dbConnection.closeConnections();
    logger.info('Applicação encerrada.');
    app.close();
});

describe('Inicio dos testes', () => {
    test("Request com todas as informações validas.", async () => {
    
        const response = await request(app)
          .post('/v1/denuncias')
          .send({
            latitude: -9.648197,
            longitude: -35.713458,
            denunciante: {
                nome: "José de Oliveira",
                cpf: "95761638037"
            },
            denuncia: {
                titulo: "Esgoto a céu aberto",
                descricao: "Existe um esgoto a céu aberto nesta localidade."
            }
        });
    
        expect(response.status).toBe(201);
        expect(response.text).toContain('id');

    });    

    test("Request sem Body", async () => {
    
        const response = await request(app)
          .post('/v1/denuncias')
          .send({});
    
        expect(response.status).toBe(400);
        expect(response.text).toContain('Request inválido.');
    });    

    test("Request sem latitude.", async () => {
    
        const response = await request(app)
          .post('/v1/denuncias')
          .send({
            longitude: -35.713458,
            denunciante: {
                nome: "José de Oliveira",
                cpf: "95761638037"
            },
            denuncia: {
                titulo: "Esgoto a céu aberto",
                descricao: "Existe um esgoto a céu aberto nesta localidade."
            }
        });
    
        expect(response.status).toBe(400);
        expect(response.text).toContain('Request Body com informação de endereço inválida.');
    });    

    test("Request sem longitude.", async () => {
    
        const response = await request(app)
          .post('/v1/denuncias')
          .send({
            latitude: -9.648197,
            denunciante: {
                nome: "José de Oliveira",
                cpf: "95761638037"
            },
            denuncia: {
                titulo: "Esgoto a céu aberto",
                descricao: "Existe um esgoto a céu aberto nesta localidade."
            }
        });
    
        expect(response.status).toBe(400);
        expect(response.text).toContain('Request Body com informação de endereço inválida.');
    });  
    
    test("Request denunciante sem nome.", async () => {
    
        const response = await request(app)
          .post('/v1/denuncias')
          .send({
            latitude: -9.648197,
            longitude: -35.713458,
            denunciante: {
                cpf: "95761638037"
            },
            denuncia: {
                titulo: "Esgoto a céu aberto",
                descricao: "Existe um esgoto a céu aberto nesta localidade."
            }
        });
    
        expect(response.status).toBe(400);
        expect(response.text).toContain('Request Body com informação de denunciante inválida.');
    });      

    test("Request denunciante sem cpf.", async () => {
    
        const response = await request(app)
          .post('/v1/denuncias')
          .send({
            latitude: -9.648197,
            longitude: -35.713458,
            denunciante: {
                nome: "José de Oliveira",
            },
            denuncia: {
                titulo: "Esgoto a céu aberto",
                descricao: "Existe um esgoto a céu aberto nesta localidade."
            }
        });
    
        expect(response.status).toBe(400);
        expect(response.text).toContain('Request Body com informação de denunciante inválida.');
    });      

    test("Request denuncia sem titulo.", async () => {
    
        const response = await request(app)
          .post('/v1/denuncias')
          .send({
            latitude: -9.648197,
            longitude: -35.713458,
            denunciante: {
                nome: "José de Oliveira",
                cpf: "95761638037"
            },
            denuncia: {
                descricao: "Existe um esgoto a céu aberto nesta localidade."
            }
        });
    
        expect(response.status).toBe(400);
        expect(response.text).toContain('Request Body com informação da denúncia inválida.');
    });      

    test("Request denuncia sem descricao.", async () => {
    
        const response = await request(app)
          .post('/v1/denuncias')
          .send({
            latitude: -9.648197,
            longitude: -35.713458,
            denunciante: {
                nome: "José de Oliveira",
                cpf: "95761638037"
            },
            denuncia: {
                titulo: "Esgoto a céu aberto",
            }
        });
    
        expect(response.status).toBe(400);
        expect(response.text).toContain('Request Body com informação da denúncia inválida.');
    });      
});