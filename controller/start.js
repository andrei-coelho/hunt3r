import helper from '../source/helper.js'
import cligen from '../service/cliente_generator.js'
import log    from '../source/log.js'

export default async function(){
    
    let list_clients = await cligen(helper.vars(["client"]))
    
    console.log(list_clients);
    
}