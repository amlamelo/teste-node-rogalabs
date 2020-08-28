# teste-node-rogalabs
Teste Node.js para um Serviço de Denúncias

 {post} /v1/denuncias Criar uma denúncia

  Request Body Exemplo:
  {
    "latitude": -9.648197,
    "longitude": -35.713458,
    "denunciante": {
        "nome": "José de Oliveira",
        "cpf": "95761638037"
    },
    "denuncia": {
        "titulo": "Esgoto a céu aberto",
        "descricao": "Existe um esgoto a céu aberto nesta localidade."
    }
 } 

 Response {JSON} Mensagem de denúnia inclúida
  Sucesso:
     HTTP/1.1 200 OK
     {
        "data": {
            "latitude": -9.648197,
            "longitude": -35.713458,
            "denunciante": {
                "nome": "José de Oliveira",
                "cpf": "95761638037"
            },
            "denuncia": {
                "titulo": "Esgoto a céu aberto",
                "descricao": "Existe um esgoto a céu aberto nesta localidade."
            },
            "endereco": {
                "logradouro": "Avenida Dona Constança de Góes Monteiro",
                "bairro": "",
                "cidade": "Maceió",
                "estado": "Alagoas",
                "pais": "BR",
                "cep": "57036-371"
            },
            "id": "5f4906d0102bbd511b2c8465"
        }
    }
 
  Erro:
       HTTP/1.1 400 OK
       {
           "error": {
               "message": "Request Body com informação de endereço inválida.",
               "code": "03"
           }
       }
 
