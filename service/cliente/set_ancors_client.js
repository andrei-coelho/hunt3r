import request from '../../source/request.js'
import log from '../../source/log.js'

export default async client => {

    let response = await request({
        service: 'cliente',
        function: 'getAncors',
        cliente: client.slug,
    })

    if(!response.json || response.json.error) {
        log.out(`Erro de resposta da API ao tentar setar as contas ancoras do cliente '${client.slug}':`)
        console.log(response.text);
        return false;
    }

    client.setAncorsProfiles(response.json.data)
    return true;

}