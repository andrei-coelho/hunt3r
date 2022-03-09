import Cliente from "../model/Cliente.js";
import Driver from "../model/Driver.js";

import helper from "../source/helper.js";
import datetime from "../source/datetime.js";
import { Builder } from 'selenium-webdriver'

const retweet_now = {}; 
var statusAction  = false;

export default async  _=> {

    let browser = await new Builder().forBrowser('firefox'); 
    browser = await browser.build();
    browser.get("http://localhost/hunt3r-test/")
    //await helper.sleep(2);
    helper.tryAgainButtonWatcher(browser);
    

}



