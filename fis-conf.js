fis.media('kevin').match('*', {
    deploy: fis.plugin('http-push', {
        receiver: 'http://10.95.24.55:8527/',
        to: '/home/users/yanwenkai/myapp'
    })
});
