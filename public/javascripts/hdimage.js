var fd = new FormData();
var file;


$('#upimage').on('change', function(event) {
    file = event.target.files[0];
    fd.append('file', file);

});



$('#submit').on('click', function() {
    // fd.append('BankName', $('input.BankName').val());
    fd.append('hdval', $('input[name=Fruit]:checked').val());

    $.ajax({
        url: "/uphdimage",
        type: "POST",
        data: fd,
        processData: false, // 告诉jQuery不要去处理发送的数据
        contentType: false, // 告诉jQuery不要去设置Content-Type请求头
        success: function(data) {
            console.log(data);

        }
    })

})
