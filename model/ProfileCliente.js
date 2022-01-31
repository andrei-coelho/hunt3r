
const ProfileCliente = function(json){
    Object.keys(json).forEach(k => this[k] = json[k])
}

export default ProfileCliente;