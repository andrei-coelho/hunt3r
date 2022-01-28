import ProfileCliente from './ProfileCliente.js';
import AccountCliente from './AccountCliente.js';

const Cliente = function(json, id_key){

    this.id_key = id_key;
    this.nome   = json.nome;
    this.slug   = json.slug;

    this.accounts = []
    this.profilesToFollow = []
    this.profilesToAnalysis = []
    this.ancorsProfiles = []

    this.actionsMap = {}
}

Cliente.prototype.setAccounts = function(accounts){
    accounts.forEach(el => this.accounts.push(new AccountCliente(el)));
}

Cliente.prototype.getAccounts = function(){
    return this.accounts;
}

Cliente.prototype.getActionsClient = function(){
    return this.actionsClient;
}

Cliente.prototype.setActionMap = function(action, quant){
    this.actionsClient[action] = quant;
}

Cliente.prototype.addAccount = function(account){
    this.accounts[account.redeSocial].push(account)
}

Cliente.prototype.setAncorsProfiles = function (profiles){
    this.ancorsProfiles = profiles;
}

Cliente.prototype.setProfiles = function(profiles){
    // verificar se o perfil é para seguir (1) ou para analise (2)
    profiles.forEach( el => {
        if(el.status == 1)
            this.profilesToFollow.push(new ProfileCliente(el))
        else if(el.status == 2){
            let accto = this.accounts.filter(obj => {
                return obj.id === el.follow
            })[0];
            if(accto != undefined){
                this.profilesToAnalysis.push({
                    for: accto,
                    profile:new ProfileCliente(el)
                })
            }
        }
    })
}

export default Cliente;