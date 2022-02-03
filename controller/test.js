import cligen from "../service/cliente/cliente_generator.js";
import login  from "../service/action/login.js";
import helper from "../source/helper.js";
import follow from "../service/action/follow.js";


export default async  _=> {

    let list_clients = await cligen(helper.vars(["client"]))
    let stat_follow  = {}
    
    for (let i = 0; i < list_clients.length; i++) {
        const client = list_clients[i];
        stat_follow[client.slug] = await follow(client);
    }

    list_clients.forEach(cli => stat_follow[cli.slug].doit());

    setInterval(() => {
        // verifica se as contas precisam dar like ou retwitter algum twitt do cliente
    }, 10000);

}