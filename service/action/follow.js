import helper from "../../source/helper.js";
import { By, Key, promise } from 'selenium-webdriver'
import request from "../../source/request.js";
import Driver from "../../model/Driver.js";

export default async cliente => {
    
    var sleep = false;

    const to_follow = async (account, profile, clienteSlug) => {

        let driver = new Driver(account.getEmail())
        let browser = await driver.browser('https://twitter.com/'+profile.slug);
        
        await helper.sleep(3000);

        let elementPresent = false;
        let status = true;
        let count = 1;

        while(!elementPresent){
            try {
                await browser.findElement(By.xpath("//*[@data-testid='placementTracking']"));
                elementPresent = true;
            } catch(e){
                await helper.sleep(1000);
                count++;
            }
            if(count == 5){
                status = false;
                break;
            } 
        }

        count = 0;
        elementPresent = false;

        while(!elementPresent){

            try {

                await browser.findElement(By.xpath("//*[@href='/"+profile.slug+"/followers']"));
                let texto = await browser.findElement(By.xpath("//*[@href='/"+profile.slug+"/followers']")).getText();
                
                if(parseInt(texto.split(" ")[0].replace(/\./gi, "")) == 0){
                    
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

                elementPresent = true;

            } catch(e){
                await helper.sleep(1000);
                count++;
            }

            if(count == 5) break;
            
        }

        count = 0;
        let curtiu = 0;
        let curtir = Math.round(Math.random() * (3 - 1) + 1); // curtir no máximo 2 publicações

        while(true){
            try {
                if(count == 5 || curtiu >= curtir) break;
                await driver.findElement(By.xpath("//*[@data-testid='like']")).click();
                curtiu++;
                await helper.sleep(2000);
            } catch (error) {
                await helper.sleep(2000);
                count++;
            }
        }

        // seguir...
        
        if(status){
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
            
        }

        let resp = await request({
            service:  'actions',
            function: 'follow',
            cliente:   clienteSlug,
            perfil_id: profile.id,
            conta_id:  account.id,
            status: 2
        })

        console.log(resp);

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

            while(true){

                while(sleep) {
                    console.log("Estou aguardando para continuar o trabalho..."); 
                    await helper.sleep(1000);
                }

                while(profiles.length > 0){
                    
                    let espere = Math.round(Math.random() * (20 - 15) + 15);

                    for (let i = 0; i < contas.length; i++) {
                        
                        const profile    = profiles.shift();
                        const conta      = contas[i];
                        let cFollowLimit = conta.actions.follow;
                        
                        if(cFollowLimit > 0) await to_follow(conta, profile, slug)
                        if(sleep) break;
                        await helper.sleep(1000);
                    }

                    if(sleep) break;
                    await helper.sleep(espere * 60 * 1000);
                    
                }
         
                await helper.sleep(1000);
                if(profiles.length == 0) break;

            }
        }

    }

}