import helper  from '../source/helper.js'
import cligen  from '../service/cliente/cliente_generator.js'
import log     from '../source/log.js'
import follow  from '../service/action/follow.js'
import login   from '../service/action/login.js'
import test    from '../service/action/test.js'
import ga_act  from "../service/action/get_active_actions_client.js";
import retweet from "../service/action/retweet.js";
import datetime from '../source/datetime.js'

const retweet_now = {}
var statusAction  = false;
var running       = false;

const startClient = async client => {

    let stat_follow  = {}
    
    stat_follow[client.slug] = await follow(client);
    stat_follow[client.slug].doit();
    retweet_now[client.slug] = [];
    /*
    setInterval(async _ => {

        if(statusAction) return;

        statusAction = true;
        let retsids = [];
        for (let i = 0; i < retweet_now[client.slug].length; i++) {
            const retweet = retweet_now[client.slug][i];
            retsids.push(retweet.id);
        }

        let res = await ga_act(client, retsids);
        if(!res) return;

        await stat_follow[client.slug].await(true);
        while(!stat_follow[client.slug].finish) await helper.sleep(1000);
        
        let contas = client.accounts;
        for (let z = 0; z < contas.length; z++) {
            for (let w = 0; w < res.length; w++) {
                const el = res[w];
                const conta = contas[z];
                await retweet(conta, el.link)
                retweet_now[client.slug].push(el)
            }
        }

        await stat_follow[client.slug].await(false);
        statusAction = false;

    }, 1000 * 10);
    
    */
}

const init = async _=> {
   
    if(datetime.getMinutesDay() < datetime.transformMinutes('09:00') || datetime.getMinutesDay() > datetime.transformMinutes('21:00')) {
        running = false;
        return;
    }

    if(!running){
        let list_clients = await cligen(helper.vars(["client"]))
        list_clients.forEach(client => startClient(client));
        running = true;
    }
    
}

export default async function(){
    
    while(true){
        await init();
        await helper.sleep(1000 * 60);
    }
    
}