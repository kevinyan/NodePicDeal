var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require("fs");
var path = require("path");
var request = require('request');

stat = fs.stat;
// var icms = require("./cms");
var uploadimg = require('./upload.js');



router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/upload', function(req, res, next) {
    res.render('app', { title: '文件上传系统' });
});


router.get('/hd', function(req, res, next) {
    res.render('imagehd', { title: 'NPD' });
});




router.post('/upimg', function(req, res, next) {
    uploadimg.uploadimage(req, res, next);
});

router.post('/uphdimage', function(req, res, next) {
    uploadimg.uploadhdimage(req, res, next);
});






module.exports = router;
