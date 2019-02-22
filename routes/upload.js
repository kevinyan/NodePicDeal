var formidable = require('formidable');
var fs = require("fs");
var path = require("path");
var request = require('request');
var gm = require('gm').subClass({ imageMagick: true });


module.exports = {
    'uploadimage': function(req, res, next) {

        // 缓存到temp目录下
        var form = new formidable.IncomingForm();
        form.uploadDir = './temp';


        // 存储银行名称
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
                        url: URL UPLOAD,
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

    },
    'uploadhdimage': function(req, res, next) {

        // 缓存到temp目录下
        var form = new formidable.IncomingForm();
        form.uploadDir = './temp';


        var selection;
        form.on('field', function(name, file) {
            selection = file;
        });

        form.parse(req, function(err, fields, files) {
            var STATUS = 0;
            var files = files.file;
            var support = ['.png', '.jpg'];

            if (err) {
                STATUS = 5004

            } else {
                
                function dealname(sele) {
                    var newName = files.name;
                    support.forEach(function(ele, idx) {
                        if (files.name.indexOf(ele) > 0) {
                            newName = files.name.split(ele)[0] + '_' + sele + ele;

                        }
                    })

                    return newName;
                }


                // 同名先移过去
                var fcrs = fs.createReadStream('./' + files.path);
                fcrs.pipe(fs.createWriteStream('./hdbuild/' + dealname(selection)))
                fcrs.pipe(fs.createWriteStream('./hdbuild/' + files.name))







                var filePath = path.join(__dirname, '../hdbuild/');

                if (selection == '3x') {


                    gm(filePath + files.name)
                        .resize(66, 66, '%')
                        .noProfile()
                        .write(filePath + dealname('2x'), function(err) {
                            if (!err) {
                                console.log('done')
                                gm(filePath + files.name)
                                    .resize(33, 33, '%')
                                    .noProfile()
                                    .write(filePath + dealname('1x'), function(err) {
                                        if (!err) {
                                            console.log('done2')
                                        }
                                    })
                            } else {
                                console.log(err)
                            }

                        })

                } else if (selection == '2x') {
                    gm(filePath + files.name)
                        .resize(50, 50, '%')
                        .noProfile()
                        .write(filePath + dealname('1x'), function(err) {
                            if (!err) console.log('done');
                        })

                } else {


                }





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

        })
    }
}
