
import helper from "../source/helper.js";
import { By, Key, promise } from 'selenium-webdriver'
import request from "../source/request.js";
import Driver from "./Driver.js";

const Navigator = function(account){
    this.account = account;
    this.driver  = new Driver(account.getEmail());
    this.browser = false;
}

Navigator.prototype.goto = async function(uri){
    if(!this.browser) {
        this.browser = await driver.browser('https://twitter.com/home');
        setInterval(async () => {
            try {
                await this.browser.findElement(By.xpath("//span[contains(text(), 'Tentar novamente')]")).click();
            } catch (error) {
                // silence here...
            }
        }, 1000);
    }
        
    await this.browser.get('https://twitter.com/' + uri);
    await this.driver.saveState();
}

Navigator.prototype.click = async function(xpath){
    while (true) {
        try {
            await bro.findElements(By.xpath(xpath)).click();
            break;
        } catch (error) {
            // inserir log de erros com a data e horario
            helper.sleep(1000);
        }
    }
}

Navigator.prototype.exit = async function(xpath, text, element = false){
    await this.driver.exit();
}

Navigator.prototype.input = async function(xpath, text, element = false){

}

Navigator.prototype.findElements = async function(xpath, element = false){
    
    let bro = element ? this.browser : element;
    let res;
    
    while (true) {
        try {
            res = await bro.findElements(By.xpath(xpath));
            break;
        } catch (error) {
            // inserir log de erros com a data e horario
            helper.sleep(1000);
        }
    }

    return res;
}

Navigator.prototype.findElement  = async function(xpath, element = false){
    
    let bro = element ? this.browser : element;
    let res;
    
    while (true) {
        try {
            res = await bro.findElement(By.xpath(xpath));
            break;
        } catch (error) {
            // inserir log de erros com a data e horario
            helper.sleep(1000);
        }
    }

    return res;
}

export default Navigator;