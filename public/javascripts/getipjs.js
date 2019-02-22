$(function() {
    $('#submit').click(function() {
        var inputVal = $('#inputer').val();

        if (inputVal) {
            var reg = new RegExp('/^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/');

            if (reg.test(inputVal)) {

                // ip
                doSuccess(inputVal);


            } else {
                // 机器地址
                $.ajax({
                    url: '/getip',
                    data: {
                        'addr': inputVal
                    },
                    type: 'POST',
                    success: function(data) {
                        if (data.res == 0) {
                            doSuccess(data.content);
                        }
                    }
                })
            }
        }
    });

    function doSuccess(ip) {
        // 获取Ip
        $('#getip').html(ip);

        // 获取fiddler配置
        var checkbox = $('.checkbox .hosts[type=checkbox]');
        var _html = '';
        checkbox.forEach(function(ele, idx) {
            if (ele.checked) {
            	console.log($(ele).val())
                _html += '<li>' + ip + ' ' + $(ele).val() + '</li>';
            }
        })

        var pass = $('.passport');
        pass.forEach(function(ele, idx) {
            if (ele.checked) {
                _html += '<li>8888.94.19.13 wappass.qatest.com</li>';
                _html += '<li>8888.94.19.13 passport.qatest.com</li>';
            }
        })



        $('#fiddlerresult').html(_html);
    }

})
