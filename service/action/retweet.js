import Driver from "../../model/Driver.js";
import helper from "../../source/helper.js";

export default async (account, link) => {

    let driver = new Driver(account.getEmail())
    let browser = await driver.browser(link);

    let elementPresent = false;

    while(!elementPresent){
        try {
            // document.querySelectorAll('[data-testid="retweet"]')[0]
            await browser.findElements(By.xpath("//*[@data-testid='retweet']"));
            await browser.findElements(By.xpath("//*[@data-testid='like']"));
            elementPresent = true;
        } catch(e){
            await helper.sleep(1000)
        }
    }

    await helper.sleep(2000)
    

    await helper.sleep(2000)

}