
const AccountClient = function(json) {
    Object.keys(json).forEach(k => this[k] = json[k])
}

AccountClient.prototype.setDriver = function(driver){
    this.driver = driver;
}

AccountClient.prototype.getEmail = function(){
    return this.email;
}

AccountClient.prototype.getSlug = function(){
    return this.slug;
}

AccountClient.prototype.getSenha = function(){
    return this.senha;
}

AccountClient.prototype.toFollow = function(profilesClient){
    this.profilesToFollow = profilesClient;
}

export default AccountClient;