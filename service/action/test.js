import helper  from '../../source/helper.js'
import Driver from '../../model/Driver.js'


export default async account => {
    let driver = new Driver(account.getEmail())
    //let browser = await driver.browser('https://twitter.com/home');

}