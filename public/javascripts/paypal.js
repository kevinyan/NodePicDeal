$('iframe').css('height',(window.screen.height-105)+'px')


$('#submit').on('click', function() {
    var url = $('#url').val()
    if (url) {

        $('iframe').attr('src', url)
    } else {
        alert('请输入URL')
    }
})

$('#clear').on('click',function(){
	$('#url').val('')
})


