fis.media('kevin').match('*', {
    deploy: fis.plugin('http-push', {
        receiver: 'http://10.95.198.71:8527/',
        to: '/home/users/yanwenkai/myapp'
    })
});
