import cligen from "../service/cliente/cliente_generator.js";
import login  from "../service/action/login.js";
import helper from "../source/helper.js";
import follow from "../service/action/follow.js";
import ga_act from "../service/action/get_active_actions_client.js";
import retweet from "../service/action/retweet.js";

const retweet_now = {}; 
var statusAction  = false;

export default async  _=> {

    let list_clients = await cligen(helper.vars(["client"]))
    let stat_follow  = {}
    
    console.log("criando clientes...");
    for (let i = 0; i < list_clients.length; i++) {
        const client = list_clients[i];
        // stat_follow[client.slug] = await follow(client);
        retweet_now[client.slug] = [];
    }

    // list_clients.forEach(cli => stat_follow[cli.slug].doit());

    setInterval(async _ => {

        console.log("entrando aqui...");

        if(statusAction) return;

        statusAction = true;

        console.log("bora...");

        for (let x = 0; x < list_clients.length; x++) {
            
            const cli = list_clients[x];
            let retsids = [];

            for (let i = 0; i < retweet_now[cli.slug].length; i++) {
                const retweet = retweet_now[cli.slug][i];
                retsids.push(retweet.id);
            }

            console.log("configurando...");

            let res = await ga_act(cli, retsids);
            console.log(res);
            if(!res) continue;

            console.log("Pegou os links...");
            
            //await stat_follow[cli.slug].await(true);
            //while(!stat_follow[cli.slug].finish) await helper.sleep(1000);

            let contas = cli.accounts;

            for (let z = 0; z < contas.length; z++) {
                for (let w = 0; w < res.length; w++) {
                    const el = res[w];
                    const conta = contas[z];
                    await retweet(conta, el.link)
                    retweet_now[cli.slug].push(el)
                }
            }

            //await stat_follow[cli.slug].await(false);
            
        }

        statusAction = false;

    }, 1000 * 2);

}

