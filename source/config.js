import helper from "./helper.js";
import fs from 'fs';

const config = {};

function loader(){

    return new Promise(res => {

        if(helper.isEmpty(config)){
            
            let data = fs.readFileSync(global.appRoot+"/storage/config.json");
            let json = JSON.parse(data);
            
            Object.keys(json).forEach(k => {
                config[k] = json[k];
            });

        } 

        res(config);

    })
}

export default async function(){
    return await loader();
}