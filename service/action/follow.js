import helper from "../../source/helper.js";
import { By, Key, promise } from 'selenium-webdriver'
import request from "../../source/request.js";
import Driver from "../../model/Driver.js";
import log from "../../source/log.js";
import datetime from "../../source/datetime.js";


export default async cliente => {
    
    var sleep = false;

    const to_follow = async (account, profile, clienteSlug) => {

        let driver = new Driver(account.getEmail())
        let browser = await driver.browser('https://twitter.com/'+profile.slug);
        
        await helper.sleep(3000);

        let count = 1;

        while(true){
            try {
                await browser.findElement(By.xpath("//*[@data-testid='placementTracking']"));
                break;
            } catch(e){
                await helper.sleep(2000);
                count++;
            }
            if(count == 5){
               return false;
            } 
        }

        count = 0;

        const regexHora = /(\d{1,2})(\s)?h/ig;
        const regexData = /(?<dia>\d{1,2})(\sde\s)?(?<mes>[a-z]+)(\sde\s)?(?<ano>\d{4})?/i;
        let elementPresent = false;

        while (true) {
            try {
                await browser.findElement(By.xpath("//time"));
                elementPresent = true;
                break;
            } catch(e) {
                if(cnt > 5) break;
                cnt++;
                await helper.sleep(1000);
            }
        }

        if(!elementPresent) {
            
            await request({
                service:  'actions',
                function: 'follow',
                cliente:   clienteSlug,
                perfil_id: profile.id,
                conta_id:  account.id,
                status: 5
            })

            await driver.saveState();
            await helper.sleep(2000);
            await driver.exit();

            return false;
        }

        let must_follow = false;
        let elements = await browser.findElements(By.xpath("//time"));

        for (let i = 0; i < elements.length; i++) {
            
            const element = elements[i];
            let text = await element.getText();
            text = text.trim();
    
            if(regexHora.test(text.trim())){
                must_follow = true;
                break;
            }
            
            let dataTwitterPostMatch = text.match(regexData);
            
            if(dataTwitterPostMatch){
                let status = datetime.checkDataTwitterPost(dataTwitterPostMatch.groups, 4);
                if(status) {
                    must_follow = true;
                    break;
                }
            }
            
        }

        if(!must_follow) {

            await request({
                service:  'actions',
                function: 'follow',
                cliente:   clienteSlug,
                perfil_id: profile.id,
                conta_id:  account.id,
                status: 5
            })

            await driver.saveState();
            await helper.sleep(2000);
            await driver.exit();

            return false;
        }

    
        // seguir...
        
        count = 0;
        let curtiu = 0;
        let curtir = Math.round(Math.random() * (3 - 1) + 1); // curtir no máximo 2 publicações

        while(true){
            if(count == 5 || curtiu >= curtir) break;
            try {
                await browser.findElement(By.xpath("//*[@data-testid='like']")).click();
                curtiu++;
                await helper.sleep(2000);
            } catch (error) {
                await helper.sleep(2000);
                count++;
            }
        }

        try {

            await browser
            .findElement(By.xpath("//*[@data-testid='placementTracking']"))
            .findElement(By.css('div'))
            .findElement(By.css('div'))
            .click()

        } catch(e){
            await driver.saveState();
            await helper.sleep(2000);
            await driver.exit();
            return false;
        }

        let resp = await request({
            service:  'actions',
            function: 'follow',
            cliente:   clienteSlug,
            perfil_id: profile.id,
            conta_id:  account.id,
            status: 2
        })

        await driver.saveState();
        await helper.sleep(2000);
        await driver.exit();

        try {
            let res = JSON.encode(resp);
            return !res.error;
        } catch (error) {
            return false;
        }

    }

       

    return {

        await: async status => sleep = status,
        
        doit : async _ => {

            const contas   = cliente.accounts;
            const profiles = cliente.profilesToFollow;
            const slug     = cliente.slug;

            const act_res  = await request({
                service:  'actions',
                function: 'get_programmed_action_follow',
                cliente:   slug
            })

            if(act_res.json.error){
                log.out("Não há uma ação programada para seguir")
                return false;
            }

            const action_seguir = act_res.json.data[0];
            const inicio_time   = datetime.transformMinutes(action_seguir.hour_start)
            const final_time    = datetime.transformMinutes(action_seguir.hour_end)
            
            while(datetime.getMinutesDay() < inicio_time){
                await helper.sleep(1000 * 10)
            }
            
            while(datetime.getMinutesDay() < final_time){
                
                while(profiles.length > 0){
                    
                    let finish = false
                    let espere = Math.round(Math.random() * (5 - 3) + 3);

                    for (let i = 0; i < contas.length; i++) {
                        
                        const profile    = profiles.shift();
                        const conta      = contas[i];
                        let cFollowLimit = conta.actions.follow;
                        
                        if(cFollowLimit > 0) await to_follow(conta, profile, slug)
                        await helper.sleep(1000);
                    }

                    finish = true;
                    await helper.sleep(espere * 60 * 1000);
                    
                    while(sleep) {
                        console.log("Estou aguardando para continuar o trabalho..."); 
                        await helper.sleep(1000);
                    }
                    
                }

                await helper.sleep(1000);
                if(profiles.length == 0) break;
                

            }

            console.log("acabou de seguir...");

        }

    }

}