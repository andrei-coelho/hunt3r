
import { Builder } from 'selenium-webdriver'
import firefox from 'selenium-webdriver/firefox.js'
import fs from 'fs'


const Driver = function(account, headless = false){

    this.build   = false;
    this.headless= headless;
    this.account = account;

}

Driver.prototype.saveState = async function(){

    await setTimeout(async _ => {

        await this.browser.manage().getCookies().then( cookies => {
            
            Array.isArray(cookies) ?
                cookies.forEach(el => {
                    el.sameSite = "Lax";
                })
            : cookies.sameSite = "Lax";
            
            if (!fs.existsSync(this.browser.cookiesDir)) fs.mkdirSync(this.browser.cookiesDir);
           
            fs.writeFile(this.browser.cookieFile, JSON.stringify(cookies), err => {
                if (err) return console.log(err);
            });
            
        })

    }, 1000);
}


Driver.prototype.browser = async function(url){

    this.browser = await new Builder().forBrowser('firefox'); 
    if(this.headless){
        this.browser = this.browser.setFirefoxOptions(new firefox.Options().headless());
    }
    this.browser = await this.browser.build();

    this.browser.cookiesDir = global.appRoot+'\\storage\\cookies\\';
    this.browser.cookieFile = this.browser.cookiesDir+this.account.getEmail()+".json";
    
    if(fs.existsSync(this.browser.cookieFile)) {
    
        await this.browser.get(url);
        
        let data = JSON.parse(fs.readFileSync(this.browser.cookieFile, 'utf8'));

        for (let i = 0; i < data.length; i++) {
            await this.browser.manage().addCookie( data[i]);
        }   
        
    }

    await this.browser.get(url);
    await this.saveState();
    return this.browser;

}


export default Driver;