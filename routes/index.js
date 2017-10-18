var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require("fs");
var path = require("path");
var request = require('request');

stat = fs.stat;
// var icms = require("./cms");
var uploadimg = require('./upload.js');

var getipfn = require('./getip.js');



router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/upload', function(req, res, next) {
    res.render('app', { title: '文件上传系统' });
});


router.get('/hd', function(req, res, next) {
    res.render('imagehd', { title: 'NPD' });
});

router.get('/getipplatform', function(req, res, next) {
    res.render('getip', { title: 'GET IP' });
});

router.get('/paypal', function(req, res, next) {
    res.render('paypaliframe', { title: 'paypal模拟平台' });
});

router.get('/performance', function(req, res, next) {
    res.render('performance', { title: 'H5表现' });
});




router.post('/getip', function(req, res, next) {
    getipfn.getipaddr(req, res, next);
});

router.post('/upimg', function(req, res, next) {
    uploadimg.uploadimage(req, res, next);
});

router.post('/uphdimage', function(req, res, next) {
    uploadimg.uploadhdimage(req, res, next);
});









module.exports = router;
