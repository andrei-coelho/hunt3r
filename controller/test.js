import Cliente from "../model/Cliente.js";
import Driver from "../model/Driver.js";
import { By, Key, promise } from 'selenium-webdriver'
import helper from "../source/helper.js";
import datetime from "../source/datetime.js";

const retweet_now = {}; 
var statusAction  = false;

export default async  _=> {


    let account = {"id":"6","email":"samanthafigueiredo@huntmarketing.com.br","senha":"MTcxNj@172039","slug":"samanthexdefigo","actions":{"retweet":"30","follow":"40","unfollow":"5"}};
    let profileTest1 = {"id":"212","slug":"M4LR1C10","nome":"Mauricio Teixeira","status":"1"}
    let profileTest2 = {"id":"99999","slug":"manointrujao","nome":"Kapudjian","status":"1"}
    let profileTest3 = {"id":"99999","slug":"sophiesishere","nome":"Sophie Schneider","status":"1"}
    let cliente = {"id":"1","nome":"Vicentinho","slug":"vicentinho","machine_id":"1","status":"1"}

    const cliObj = new Cliente(cliente, 0)
    cliObj.setAccounts([account])
    cliObj.setProfiles([profileTest2])
    const prof = cliObj.profilesToFollow[0]

    // console.log(cliObj);
    // https://twitter.com/{slug}/with_replies
    // document.querySelectorAll('time')
    // 
    // regex data (\d{1,2})(\sde\s)?([a-z]+)(\sde\s)?(\d{4})
    //               dia               mes            ano       
    
    
    let driver = new Driver(account.email);
    let browser = await driver.browser("https://twitter.com/"+prof.slug+"/with_replies")
    
    const regexHora = /(\d{1,2})(\s)?h/ig;
    const regexData = /(?<dia>\d{1,2})(\sde\s)?(?<mes>[a-z]+)(\sde\s)?(?<ano>\d{4})?/i;

    await helper.sleep(2000);
    
    let cnt = 1;
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

    let must_follow = false;

    if(elementPresent) {
        
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
                let status = datetime.checkDataTwitterPost(dataTwitterPostMatch.groups, 7);
                if(status) {
                    must_follow = true;
                    break;
                }
            }
            
        }
        
    }

}



