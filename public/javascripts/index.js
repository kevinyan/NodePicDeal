var fd = new FormData();
var file;

$('#upimage').on('change', function(event) {
    file = event.target.files[0];
    $('.alert').html('').removeClass('alert-danger');
    $('#up').removeClass('disabled')

    //step0:名称展示
    $('h3').text(file.name);

    //step1:文件名称校验
    if (!(/^(ic_|bg_).*\d{4}\.png$/ig).test(file.name)) {
        $('#up').addClass('disabled')
        $('.alert').html('文件名称不符合规范，请查证后重新上传').addClass('alert-danger');
        return;
    }

    //step2:文件大小校验
    if (file.size > 10000) {
        $('#up').addClass('disabled')
        $('.alert').html('文件太大，请联系UI同学修复好再上传').addClass('alert-danger');
        return;
    }

    //step3:图片展示


    var reader = new FileReader();
    reader.onload = function(e) {
        var data = e.target.result; // 'data:image/jpeg;base64,/9j/4AAQSk...(base64编码)...'            
        $('img.demo').attr('src', data);
    };
    reader.readAsDataURL(file);


    fd.append('file', file);



});



$('#up').on('click', function() {
    if ($(this).hasClass('disabled')) {
        return;
    }

    if ($('input.BankName').val()) {
         fd.append('BankName', $('input.BankName').val());
    }else{
        $(this).hasClass('disabled');
        $('.alert').html('还未填写银行名称').addClass('alert-danger');
        return;
    }

    if (!(/^(ic_|bg_).*\d{4}\.png$/ig).test(file.name)) {
        alert('文件名称不符合规范，请查证后重新上传');
        return;
    }


    $.ajax({
        url: "/upimg",
        type: "POST",
        data: fd,
        processData: false, // 告诉jQuery不要去处理发送的数据
        contentType: false, // 告诉jQuery不要去设置Content-Type请求头
        success: function(data) {
            console.log(data);
            if (data.res == '0') {
                $('.alert').html('恭喜您！上传成功').removeClass('alert-danger').addClass('alert-success')

            } else {
                $('.alert').html(data.content).addClass('alert-danger')
            }
        }
    })

})
