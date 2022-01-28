import fetch from 'node-fetch';
import config from '../source/config.js'
import log from '../source/log.js'

const _text = 
    async (uri, data, conf) => 
            await fetch(conf.api_address + uri, data)
                .then(res => res.text())
                .then(text => text)
                .catch(error => log.out(error));
    
        
const init = async (uri, method) => 
    config().then(async conf => {
        var data = {method:method}
        data.method = method;
        return await _text(uri, data, conf);
    }).catch(error => log.out(error))



export default async (vars = {}) => {

    if(typeof vars.service === 'undefined' || typeof vars.function === 'undefined')
        throw "É preciso configurar o 'service' e o 'function' para realizar uma requisição via api";
    
    let uri  = "index.php?";
    let keys = Object.keys(vars);

    for (let i = 0; i < keys.length; i++) 
    uri += keys[i]+"="+vars[keys[i]]+"&";
    uri = uri.substring(0, uri.length-1)

    let resApi = await init(uri, 'get');
    let resObj = {}
    resObj['text'] = resApi;
    try {
        resObj['json'] = JSON.parse(resApi)
    } catch (e){
        resObj['json'] = false
    }

    return resObj
}
