import { By } from 'selenium-webdriver'

export default {

    isEmpty : obj => {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    },

    vars: list => {

        list.unshift('', '', '')
        let args = process.argv
        let obj = {}

        for (let i = 3; i < list.length; i++) {
            obj[list[i]] = typeof args[i] !== 'undefined' ? args[i] : false;
        }

        return obj;

    },

    sleep: m => new Promise(r => setTimeout(r, m)),

    tryAgainButtonWatcher: async browser => {
        setInterval(async () => {
            try {
                await browser.findElement(By.xpath("//span[contains(text(), 'Tentar novamente')]")).click();
            } catch (error) {
                // silence here...
            }
        }, 1000);
    }

}