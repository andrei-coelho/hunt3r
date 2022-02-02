import helper  from '../source/helper.js'
import cligen  from '../service/cliente/cliente_generator.js'
import log     from '../source/log.js'
import follows from '../service/action/follow.js'
import login   from '../service/action/login.js'
import test    from '../service/action/test.js'
import map_act from '../service/cliente/get_map_actions_day_client.js'


const startClient = async client => {
    
    for (let i = 0; i < client.accounts.length; i++) {
        await login(client.accounts[i])
    }

    await map_act(client.getSlug())
    
}

export default async function(){
    
    let list_clients = await cligen(helper.vars(["client"]))
    list_clients.forEach(client => startClient(client));
    
}