import helper  from '../source/helper.js'
import cligen  from '../service/cliente/cliente_generator.js'
import log     from '../source/log.js'
import follows from '../service/action/follow.js'
import Driver from '../model/Driver.js'

export default async function(){
    
    let list_clients = await cligen(helper.vars(["client"]))

    let driver = new Driver(list_clients[0].accounts[0])
    let browser = await driver.browser('https://twitter.com/');
    await helper.sleep(2000)
    await browser.quit();

    driver = new Driver(list_clients[0].accounts[0])
    browser = await driver.browser('https://twitter.com/');
    await helper.sleep(2000)
    await browser.quit();

}