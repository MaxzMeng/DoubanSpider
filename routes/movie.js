var express = require('express');
var router = express.Router();
var baseApi = require('../api/movieBaseApi');
var commentApi = require('../api/movieCommentApi');
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

module.exports = router;
