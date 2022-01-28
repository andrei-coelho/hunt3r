import helper  from '../source/helper.js'
import request from '../source/request.js'
import log     from '../source/log.js'
import config  from '../source/config.js'
import Cliente from '../model/clientes/Cliente.js'

import set_accounts from './set_accounts_client.js'
import set_ancors   from './set_ancors_client.js'
import set_profiles from './set_profiles_client.js'

export default async vars => {

    let conf = await config();

    let response = await request({
        service: 'cliente',
        function: 'get',
        clientes: (!vars.client ? conf.clients : vars.client),
    })

    if(!response.json || response.json.error) return false;

    const clients = [];

    for (let i = 0; i < response.json.data.length; i++) {
        
        const cli = response.json.data[i];
        let client = new Cliente(cli, i);
        await set_accounts(client);
        await set_profiles(client, 1, Math.ceil(client.getAccounts().length * (Math.random() * (38 - 27) + 27)));
        await set_ancors(client);

        clients.push(client)
        
    }

    return clients;

}