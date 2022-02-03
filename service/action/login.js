import helper  from '../../source/helper.js'
import Driver from '../../model/Driver.js'

import { By, Key, promise } from 'selenium-webdriver'

const isHome = async (browser, slug) => {
    
    let elementPresent = false;
    let tentativas = 0;
    
    while(!elementPresent){
        try {
            await browser.findElement(By.xpath("//*[@href='/"+slug+"']")).click()
            return true;
        } catch(e){
            if(tentativas > 14) return false;
            await helper.sleep(1000);
        }
        tentativas++;
    }

    return false;
    
}

export default async account => {

    let driver = new Driver(account.getEmail())
    let browser = await driver.browser('https://twitter.com/login');
    let ih = await isHome(browser, account.getSlug())

    if(ih) {
        await helper.sleep(1000);
        await driver.saveState();
        await driver.exit();
        return true;
    }

    let elementPresent = false;

    while(!elementPresent){

        try {
            await browser.findElement(By.xpath("//*[@data-testid='ocfEnterTextTextInput']"))
            .sendKeys(account.getEmail(), Key.ENTER);
            elementPresent = true;
        } catch (error) {
            await helper.sleep(1000);
        }

        try {
            await browser.findElement(By.name("text"))
            .sendKeys(account.getEmail(), Key.ENTER);
            elementPresent = true;
        } catch(e){
            await helper.sleep(1000);
        }

    }

    await helper.sleep(1000);

    elementPresent = false;

    while(!elementPresent){
        try {
            await browser.findElement(By.name("password"));
            elementPresent = true;
        } catch(e){
            await helper.sleep(1000);
        }
    }

    await browser.findElement(By.name("password"))
         .sendKeys(account.getSenha(), Key.ENTER);
    
    await helper.sleep(2000);

    await driver.saveState();
    await helper.sleep(1000);
    await driver.exit();

}

