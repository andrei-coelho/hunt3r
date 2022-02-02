import request from "../../source/request.js"

export default async client_slug => {

    let response = await request({
        service: 'cliente',
        function: 'getMapActionsDay',
        cliente: client_slug
    })

    if(!response.json || response.json.error) {
        log.out(`Erro de resposta da API ao tentar recuperar o mapa de ações do cliente '${slug}':`)
        console.log(response.text);
        return false;
    }

}