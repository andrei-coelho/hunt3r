
const AccountClient = function(json) {
    Object.keys(json).forEach(k => this[k] = json[k])
}

AccountClient.prototype.setDriver = function(driver){
    this.driver = driver;
}

AccountClient.prototype.toFollow = function(profilesClient){
    this.profilesToFollow = profilesClient;
}

export default AccountClient;