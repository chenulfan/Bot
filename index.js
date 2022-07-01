const puppeteer = require('puppeteer');
const moment = require('moment');
const sendEmail = require('./sendEmail');
const chalk = require('chalk');
const fs = require('fs')
require('dotenv').config();


const scrape = async (needtoOpenBrowser) => {
    console.log(chalk.yellow('🤖 Start scrape'))
    const browser = await lunchBrowser(needtoOpenBrowser);
    const page = await moveToUrl(browser, process.env.SITE_URL);
    await loginToSite(page);
    await openSideBar(page);
    await moveToEnrollToCoursePage(page);
    const imgName = await takeAScreenShot(page);
    await closeBrowser(browser);
    await sendEmail(imgName);
    console.log(chalk.green('🤖 Finished scrape'));
}

const closeBrowser = async (browser) => {
    await browser.close();
}

const moveToEnrollToCoursePage = async (page) => {
    await page.waitForSelector('a.menu-link')
    let links = await page.$$('a.menu-link.py-3')
    const enrollToCourseATag = links[1];
    await enrollToCourseATag.evaluate(e => e.click());
    await page.waitForSelector('#kt_scrolltop')
}

const openSideBar = async (page) => {
    await page.waitForSelector('#kt_header_menu_mobile_toggle');
    await page.click('#kt_header_menu_mobile_toggle')
}

const lunchBrowser = async (needtoOpenBrowser) => {
    let browser;
    if (needtoOpenBrowser) {
        browser = await puppeteer.launch({ headless: false });
    }
    else {
        browser = await puppeteer.launch();
    }
    return browser
}

const moveToUrl = async (browser, url) => {
    const page = await browser.newPage();  
    await page.goto(url, { waitUntil: 'domcontentloaded' }) 
    return page;
}

const loginToSite = async (page) => {
    const emailInputId = '#R1C1';
    const passwordInputId = '#R1C2';
    const loginButtonId = '#loginbtn';

    await page.focus(emailInputId)
    await page.keyboard.type(process.env.SITE_EMAIL)
    await page.focus(passwordInputId)
    await page.keyboard.type(process.env.SITE_PASSWORD)

    await page.click(loginButtonId);
}

const takeAScreenShot = async (page) => {
    const timePhotoTaken = moment().format('HH-mm-ss');
    const imgName = 'img-' + timePhotoTaken + '.png';
    await page.screenshot({ path: imgName });
    console.log(chalk.green('📸 Screenshot taken'))
    return imgName;
}

const needtoOpenBrowser = false;
scrape(needtoOpenBrowser);
