// const url = 'https://movie.douban.com/subject/26366496/comments?start=0&limit=20&sort=new_score&status=P';
const puppeteer = require('puppeteer');

var getComingMovie = async function (city) {
    if (city == null) city = 'beijing';
    const url = `https://movie.douban.com/cinema/later/${city}/`;

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
        var items = $('div[class="item mod "],div[class="item mod odd"]')
        var links = []
        if (items.length >= 1) {
            items.each((index, item) => {
                let it = $(item);
                let doubanId = Number(it.find('a').attr('href').replace(/^[^\d]*(\d+)[^\d]*$/, "$1"));
                let avatar = it.find('img').attr('src');
                let name = it.find('h3 a').text();
                let date = it.find('ul *:eq(0)').text();
                let label = it.find('ul *:eq(1)').text();
                let area = it.find('ul *:eq(2)').text();
                let like = Number(it.find('ul *:eq(3) span').text().replace(/^[^\d]*(\d+)[^\d]*$/, "$1"))
                links.push({
                    doubanId,
                    avatar,
                    name,
                    date,
                    label,
                    area,
                    like
                })
            });

        }

        // if (items.length >= 1) {
        //     items.each((index, item) => {
        //         let it = $(item)
        //         let doubanId = it.data('cid')
        //         let avatar = it.find('img').attr('src')
        //         let votes = Number(it.find('.votes').text())
        //         let name = it.find('.comment-info a').text()
        //         let time = it.find('.comment-time').text().replace('\n', '').trim()
        //         let rate = Number(it.find('.comment-info *:eq(2)').attr('class').replace(/^[^\d]*(\d+)[^\d]*$/, "$1"))
        //         // let title = it.find('.title').text()
        //         // let rate = Number(it.find('.rate').text())
        //         // let poster = it.find('img').attr('src').replace('s_ratio', 'l_ratio')
        //         let text = it.find('.short').text()
        //         links.push({
        //             doubanId,
        //             name,
        //             avatar,
        //             votes,
        //             text,
        //             time,
        //             rate
        //         })
        //     });
        // }

        return links
    })
    browser.close()
    return result;

}


module.exports.getComingMovie = getComingMovie;