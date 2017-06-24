var fs = require('fs')
  , gm = require('gm').subClass({imageMagick: true});

var path = __dirname;
// resize and remove EXIF profile data

console.log(path + '/images/demo.jpg')

gm(path + '/images/demo.jpg')
.resize(240, 240)
.noProfile()
.write(path + '/images/resize.jpg', function (err) {
  if (!err) console.log('done');
});
