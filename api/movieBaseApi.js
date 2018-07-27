const rp = require('request-promise-native');
var querystring = require('querystring');
var fetchMovie = async function (id) {
    const url = `http://api.douban.com/v2/movie/subject/${id}`;

    let res = await rp(url);
    try {
        res = JSON.parse(res);
        console.log(res);
        return res;
    } catch (err) {
        console.log(err);
    }
};

var fetchCelebrity = async function (id, start, count) {
    if (start == null) start = 0;
    if (count == null) count = 10;
    const url = `http://api.douban.com/v2/movie/celebrity/${id}?start=${start}&count=${count}`;

    let res = await rp(url);
    try {
        res = JSON.parse(res);
        console.log(res);
        return res;
    } catch (err) {
        console.log(err);
    }
};

var searchMovieByTag = async function (tag, start, count) {
    if (start == null) start = 0;
    if (count == null) count = 10;
    console.log(tag);
    const url = `http://api.douban.com/v2/movie/search?tag=${querystring.escape(tag)}&start=${start}&count=${count}`;
    console.log(url);
    let res = await rp(url);
    try {
        res = JSON.parse(res);
        console.log(res);
        return res;
    } catch (err) {
        console.log(err);
    }
};

var searchMovieByQ = async function (Q, start, count) {
    if (start == null) start = 0;
    if (count == null) count = 10;
    console.log(Q);

    const url = `http://api.douban.com/v2/movie/search?q=${querystring.escape(Q)}&start=${start}&count=${count}`;
    console.log(url);
    let res = await rp(url)
    try {
        res = JSON.parse(res);
        console.log(res);
        return res;
    } catch (err) {
        console.log(err);
    }
};
var MovieTop250 = async function (start, count) {
    if (start == null) start = 0;
    if (count == null) count = 20;
    const url = `http://api.douban.com/v2/movie/top250?start=${start}&count=${count}`;
    let res = await rp(url);
    try {
        res = JSON.parse(res);
        console.log(res);
        return res;
    } catch (err) {
        console.log(err);
    }
};

var USBox = async function () {

    const url = `http://api.douban.com/v2/movie/us_box`;
    let res = await rp(url);
    try {
        res = JSON.parse(res);
        console.log(res);
        return res;
    } catch (err) {
        console.log(err);
    }
};

var inTheaters = async function (city, start, count) {
    if (start == null) start = 0;
    if (count == null) count = 20;
    if (city == null) city = "北京";
    const url = `http://api.douban.com/v2/movie/in_theaters?start=${start}&count=${count}&city=${querystring.escape(city)}`;
    let res = await rp(url);
    try {
        res = JSON.parse(res);
        console.log(res);
        return res;
    } catch (err) {
        console.log(err);
    }
};

var comingSoon = async function (city, start, count) {
    if (start == null) start = 0;
    if (count == null) count = 20;
    if (city == null) city = "北京";
    const url = `http://api.douban.com/v2/movie/coming_soon?start=${start}&count=${count}&city=${querystring.escape(city)}`;
    let res = await rp(url);
    try {
        res = JSON.parse(res);
        console.log(res);
        return res;
    } catch (err) {
        console.log(err);
    }
};
module.exports.fetchMovie = fetchMovie;
module.exports.fetchCelebrity = fetchCelebrity;
module.exports.searchMovieByTag = searchMovieByTag;
module.exports.MovieTop250 = MovieTop250;
module.exports.searchMovieByQ = searchMovieByQ;
module.exports.USBox = USBox;
module.exports.inTheaters = inTheaters;
module.exports.comingSoon = comingSoon;