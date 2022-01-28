const args   = process.argv,
count_args   = process.argv.length,
list_control = ['help', 'start', 'open', 'prospect', 'create', 'action'] 

export default async _=> {
    
    if(count_args < 3) return false;
    let controll = args[2].toLocaleLowerCase().replaceAll(/-+/ig, '');
    if(list_control.includes(controll)){
        const ctr = await import('./controller/'+controll+'.js');
        ctr.default();
    }

}
