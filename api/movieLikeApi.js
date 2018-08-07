const puppeteer = require('puppeteer');

var getLikeMovies = async function (id) {
    const url = `https://movie.douban.com/subject/${id}/?from=showing`;

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
        var items = $('.recommendations-bd dt a')
        var links = []

        if (items.length >= 1) {
            items.each((index, item) => {
                let it = $(item)
                let doubanId = Number(it.attr('href').replace(/^[^\d]*(\d+)[^\d]*$/, "$1"));
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


module.exports.getLikeMovies = getLikeMovies;