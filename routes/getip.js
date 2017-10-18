var fs = require("fs");
var dns = require('dns');

module.exports = {
    'getipaddr': function(req, res, next) {
        console.log('=====', req.body.addr);
        var addr = req.body.addr;
        dns.lookup(addr, function(err, addresses, family) {
            console.log('IP地址：%s，协议版本：%s', addresses, family);
            res.json({
                'res': '0',
                'content': addresses
            });
        });
    }
}
