import helper from "../../source/helper.js";

export default _ => {
    
    var sleep = false;

    return {

        await: async status => sleep = status,
        doit : async _=> {
            while(true){
                await helper.sleep(1000);
                if(sleep) console.log("Estou dormindo");
                else console.log("Estou acordado");
            }
        }

    }

}