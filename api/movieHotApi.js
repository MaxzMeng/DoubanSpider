const puppeteer = require('puppeteer');

var getHotMovies = async function (pageCount) {
    if (pageCount==null) pageCount = 0;
    console.log(pageCount)
    const url = `https://movie.douban.com/explore#!type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=${pageCount*20}`;

    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        dumpio: false
    })
    const page = await browser.newPage()
    await page.goto(url, {
        waitUntil: 'networkidle2'
    })

    const result = await page.evaluate(() => {
        var $ = window.$
        var items = $('.item')
        var links = []

        if (items.length >= 1) {
            items.each((index, item) => {
                let it = $(item)
                let doubanId = it.find('div').data('id');
                let img = it.find('img').attr('src');
                let name = it.find('img').attr('alt');
                links.push({
                    doubanId,
                    img,
                    name
                })
            });
        }

        return links
    });
    browser.close();
    return result;

}


module.exports.getHotMovies = getHotMovies;