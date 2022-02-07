export default {

    getMinutesDay : function() {
        let objDate = new Date();
        return parseInt(objDate.getHours()) * 60 + parseInt(objDate.getMinutes());
    },

    transformMinutes : function(hour) {
        let splh = hour.split(":");
        return parseInt(splh[0]) * 60 + parseInt(splh[1]);
    },

    full : function(){
        var data = new Date(),
            dia  = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(),
            mesF = (mes.length == 1) ? '0'+mes : mes,
            anoF = data.getFullYear(),
            time = `${("0" + data.getHours()).slice(-2)}:${("0" + data.getMinutes()).slice(-2)}h`;
        return diaF+"/"+mesF+"/"+anoF+" às "+time;
    },

    date : function(){
        var data = new Date(),
            dia  = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(),
            mesF = (mes.length == 1) ? '0'+mes : mes,
            anoF = data.getFullYear()
        return diaF+"/"+mesF+"/"+anoF;
    },

    date_underscore : function(){
        var data = new Date(),
            dia  = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(),
            mesF = (mes.length == 1) ? '0'+mes : mes,
            anoF = data.getFullYear()
        return diaF+"_"+mesF+"_"+anoF;
    },

    time : function(){
        let data = new Date();
        let time = `${("0" + data.getHours()).slice(-2)}:${("0" + data.getMinutes()).slice(-2)}`;
        return time;
    },

    checkDataTwitterPost: function(dataTwitterPost, lim){
        
        let mesT = dataTwitterPost.mes.toLowerCase();
        let ano  = dataTwitterPost.ano === undefined ? new Date().getFullYear() : dataTwitterPost.ano;
        let mes = "00";

        switch (mesT) {
            case "jan": mes = "01"; break;
            case "fev": mes = "02"; break;
            case "mar": mes = "03"; break;
            case "abr": mes = "04"; break;
            case "mai": mes = "05"; break;
            case "jun": mes = "06"; break;
            case "jul": mes = "07"; break;
            case "ago": mes = "08"; break;
            case "set": mes = "09"; break;
            case "out": mes = "10"; break;
            case "nov": mes = "11"; break;
            case "dez": mes = "12"; break;
        }
        const dataPost = new Date(ano, mes, dataTwitterPost.dia);
        const limite = new Date();
        limite.setDate(limite.getDate() - lim)
        
        return dataPost >= limite;

    }
    
}