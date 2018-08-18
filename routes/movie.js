var express = require('express');
var router = express.Router();
var baseApi = require('../api/movieBaseApi');
var commentApi = require('../api/movieCommentApi');
var comingApi = require('../api/movieCommingApi');
var likeApi = require('../api/movieLikeApi');
var hotApi = require('../api/movieHotApi');
var cityApi = require('../api/city/cityApi');
router.get('/subjects/:id', async function (req, res, next) {
    var data = await baseApi.fetchMovie(req.params.id);
    // console.log(data);
    console.log(req.params.id);
    res.send(data);
    // console.log("test")
});

router.get('/celebrity/:id', async function (req, res, next) {
    var data = await baseApi.fetchCelebrity(req.params.id, req.query.start, req.query.count);
    // console.log(data);
    console.log(req.params.id);
    res.send(data);
    // console.log("test")
});

router.get('/comment/:id', async function (req, res, next) {
    var data = await commentApi.getShortComment(req.params.id, req.query.page);
    res.send(data);
});

router.get('/search', async function (req, res, next) {
    // console.log(req.query.tag);
    var data;
    if (req.query.tag != null) {
        data = await baseApi.searchMovieByTag(req.query.tag, req.query.start, req.query.count);
    }
    if (req.query.q != null) {
        data = await baseApi.searchMovieByQ(req.query.q, req.query.start, req.query.count);
    }
    res.send(data);
});

router.get('/top250', async function (req, res, next) {
    var data = await baseApi.MovieTop250(req.query.start, req.query.count);
    res.send(data);
});

router.get('/us_box', async function (req, res, next) {
    var data = await baseApi.USBox();
    res.send(data);
})

router.get('/in_theaters', async function (req, res, next) {
    var data = await baseApi.inTheaters(req.query.city, req.query.start, req.query.count);
    res.send(data);
});

router.get('/coming_soon', async function (req, res, next) {
    var data = await comingApi.getComingMovie(req.query.city);
    res.send(data);
});

router.get('/movie_like/:id', async function (req, res, next) {
    var data = await likeApi.getLikeMovies(req.params.id);
    res.send(data);
});
router.get('/movie_hot', async function (req, res, next) {
    var data = await hotApi.getHotMovies(req.query.page);
    res.send(data);
});

router.get('/city', async function (req, res, next) {
    var data = await cityApi.getCities();
    res.send(data);
});
module.exports = router;
