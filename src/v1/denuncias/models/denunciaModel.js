const logger = require('../../common/config/logger');
const axios = require('axios');
const NodeCache = require('node-cache');
const appGeoLocationCache = new NodeCache();

const Denuncia = () => {
    let Schema = require('../../common/config/dbConnectionConfig').Schema;
    let defaultDb = require('../../common/config/dbConnectionConfig').applicationDbConnection();
  
    let denunciaSchema = new Schema({
        latitude: Number,
        longitude: Number,
        denunciante: {
            nome: String,
            cpf: String,
        },
        denuncia: {
            titulo: String,
            descricao: String,
        },
        endereco: {
            logradouro: String,
            bairro: String,
            cidade: String,
            estado: String,
            pais: String,
            cep: String
        }
    });
  
    denunciaSchema.virtual('id')
      .get(function () {
        return this._id.toHexString();
    });
  
    // Ensure virtual fields are serialised.
    denunciaSchema.set('toJSON', {
        virtuals: true
    });
  
    return defaultDb.model('Denuncias', denunciaSchema);  
  }
  

const getLocation = (latitude, longitude) => {
    return new Promise(async (resolve, reject) => {
        const geoLocationCacheKey = `${latitude}_${longitude}`;
        const url = `${process.env.MAPQUESTAPI_BASE_URL}?key=${process.env.MAPQUESTAPI_KEY}&location=${latitude},${longitude}`;

        appGeoLocationCache.has(geoLocationCacheKey) ?
            resolve(appGeoLocationCache.get(geoLocationCacheKey)) :
                await axios.get(url,{})
                    .then((response) => {
                        // console.log('passei aqui');
                        const location = response.data.results[0].locations[0];

                        if(location.street) {
                            appGeoLocationCache.set(geoLocationCacheKey, location);
                            resolve(location);
                        } else {
                            reject({error: {message: 'Endereço não encontrado para essa localidade.', code: '01'}})
                        }
                    })
                    .catch((err) => {
                        logger.error(err);                        
                        reject({error: {message: 'Ocorreu um erro na verificação da localização. Tente novamente.', code: '06'}});
                    });
    });
};

exports.insert = (data) => {
    return new Promise((resolve, reject) => {   
        getLocation(data.latitude, data.longitude)
            .then((location) => {
                const registroDenuncia = {
                    latitude: data.latitude,
                    longitude: data.longitude,
                    denunciante: data.denunciante,
                    denuncia: data.denuncia,
                    endereco: {
                        logradouro: location.street,
                        bairro: location.adminArea6,
                        cidade: location.adminArea5,
                        estado: location.adminArea3,
                        pais: location.adminArea1,
                        cep: location.postalCode 
                    }
                };
        
                const DenunciaModel = Denuncia();
                const denuncia = new DenunciaModel(registroDenuncia);

                denuncia.save((err, savedDenuncia) => {
                    if (err) return reject({error: {message: 'Ocorreu um erro no registro da sua denúncia. Tente novamente.', code: '07'}});

                    responseJson = savedDenuncia.toJSON();
                    delete responseJson._id;
                    delete responseJson.__v;
    
                    resolve({data: responseJson});
                });
            })
            .catch((err) => {
                reject(err)
            });
    });
};
