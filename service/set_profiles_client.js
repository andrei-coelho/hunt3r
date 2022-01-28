import request from '../source/request.js'
import log from '../source/log.js'

export default async (client, status, max) => {

    let response = await request({
        service: 'cliente',
        function: 'getProfiles',
        cliente: client.slug,
        status:status,
        max:max
    })

    if(!response.json || response.json.error) {
        log.out(`Erro de resposta da API ao tentar setar as contas do cliente '${client.slug}':`)
        console.log(response.text);
        return false;
    }

    client.setProfiles(response.json.data)
    return true;

}