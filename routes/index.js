var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require("fs");

var path = require("path");
var request = require('request');


stat = fs.stat;


// var icms = require("./cms");


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/upload', function(req, res, next) {
    res.render('app', { title: '文件上传系统' });
});

router.post('/upimg', function(req, res, next) {
    // 缓存到temp目录下

    var form = new formidable.IncomingForm();

    form.uploadDir = './temp';


    var bankname = '';
    form.on('field', function(name, file) {
        bankname = file;
    });


    form.parse(req, function(err, fields, files) {
        var STATUS = 0;

        if (err) {
            STATUS = 5004

        } else {

            // step1:记录文件信息

            var files = files.file;


            var temp = {}
            temp.name = files.name;
            temp.size = files.size
            temp.type = files.type;
            temp.bankname = bankname;



            //同步读取文件判断
            var file = path.join(__dirname, '../data/data.json');
            var newArray = new Array();
            var list = fs.readFileSync(file, "utf8");

            var obj = eval('(' + list + ')');

            obj.forEach(function(el) {
                if (el.name == temp.name) {
                    STATUS = 5005;
                    return;
                }
            })

            if (STATUS != 5005) {
                //同步存储文件
                obj.push(temp);
                obj.forEach(function(e) {
                    newArray.push(JSON.stringify(e));
                })
                var newString = '[' + newArray.join(',') + ']'
                fs.writeFileSync(file, newString, 'utf-8');
            }


            // setp2:上传图片
            var base64image = base64_encode('./' + files.path);

            function base64_encode(file) {
                var bitmap = fs.readFileSync(file);
                return new Buffer(bitmap).toString('base64');
            }
            
            request.post({
                    url: 'http://cp01-rdqa-dev307.cp01.baidu.com:8765/upload_image',
                    form: {
                        image_data: base64image,
                        name: files.name,
                        path: 'css/android/images'
                    }
                },
                function(err, httpResponse, body) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                });


            fs.createReadStream('./' + files.path).pipe(fs.createWriteStream('./build/' + files.name));
        }

        switch (STATUS) {
            case 5004:
                res.json({
                    'res': '5004',
                    'content': 'error'
                });
                break;

            case 5005:
                res.json({
                    'res': '5005',
                    'content': '图片已经存在'
                });
                break;

            default:
                res.json({
                    'res': '0',
                    'content': 'OK'
                });


        }

    });
});




module.exports = router;
