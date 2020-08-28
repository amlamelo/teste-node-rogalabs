define({ "api": [
  {
    "type": "post",
    "url": "/v1/denuncias",
    "title": "Criar uma denúncia",
    "version": "1.0.0",
    "group": "API_RESTful_de_Denúnias",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "latutide",
            "description": "<p>Latitude da localidade onde ocorreu a denúncia</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "longitude",
            "description": "<p>Longitude da localidade onde ocorreu a denúncia</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "denunciante",
            "description": "<p>Objeto JSON composto por nome e cpf</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "denuncia",
            "description": "<p>Objeto JSON composto por titulo e descrição</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Corpo da Mensagem",
          "content": "{\n     \"latitude\": -9.648197,\n     \"longitude\": -35.713458,\n     \"denunciante\": {\n         \"nome\": \"José de Oliveira\",\n         \"cpf\": \"95761638037\"\n     },\n     \"denuncia\": {\n         \"titulo\": \"Esgoto a céu aberto\",\n         \"descricao\": \"Existe um esgoto a céu aberto nesta localidade.\"\n     }\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "Mensagem",
            "description": "<p>de denúnia inclúida</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": " HTTP/1.1 200 OK\n {\n    \"data\": {\n        \"latitude\": -9.648197,\n        \"longitude\": -35.713458,\n        \"denunciante\": {\n            \"nome\": \"José de Oliveira\",\n            \"cpf\": \"95761638037\"\n        },\n        \"denuncia\": {\n            \"titulo\": \"Esgoto a céu aberto\",\n            \"descricao\": \"Existe um esgoto a céu aberto nesta localidade.\"\n        },\n        \"endereco\": {\n            \"logradouro\": \"Avenida Dona Constança de Góes Monteiro\",\n            \"bairro\": \"\",\n            \"cidade\": \"Maceió\",\n            \"estado\": \"Alagoas\",\n            \"pais\": \"BR\",\n            \"cep\": \"57036-371\"\n        },\n        \"id\": \"5f4906d0102bbd511b2c8465\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Erro",
          "content": "HTTP/1.1 400 OK\n{\n    \"error\": {\n        \"message\": \"Request Body com informação de endereço inválida.\",\n        \"code\": \"03\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/v1/denuncias/routesConfig.js",
    "groupTitle": "API_RESTful_de_Denúnias",
    "name": "PostV1Denuncias"
  }
] });
