//入口函数
$(function () {
    //一进到页面，马上发送ajax请求，获取用户信息，并且渲染到页面
    getUserInfo();
    //------------------------------------------------------------------------------------------
    //登出功能
    $('#logout').on('click', function () {
        //询问是否要删除
        layer.confirm('确定要退出吗?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            // 1 删除token
            localStorage.removeItem('token');
            // 2 跳转到 /login.html
            location.href = '/login.html';
            // 下面的代码是关闭弹出层的意思
            layer.close(index);
        });
    });

})
// 入库函数外面封装，全局函数，方便在其他位置调用
function getUserInfo() {
    $.ajax({
        // type: 'GET', // type不填，默认就是GET
        url: 'http://www.liulongbin.top:3007/my/userinfo',
        // success函数，在ajax请求成功之后触发
        success: function (res) {
            if (res.status === 0) {
                // 1、设置欢迎语（有昵称，就使用昵称，没有昵称，使用用户名）
                var myname = res.data.nickname || res.data.username;
                $('.myname').text(myname);
                // 2、设置头像（有图片，使用图片；没有图片，使用名字的首字母）
                if (res.data.user_pic) {
                    // 使用图片
                    $('.layui-nav-img').attr('src', res.data.user_pic).show();
                    $('.text-avatar').hide();
                } else {
                    var t = myname.substr(0, 1).toUpperCase();
                    // jQuery中的show方法，会设置元素 display:inline;
                    $('.text-avatar').text(t).css('display', 'inline-block');
                    $('.layui-nav-img').hide();
                }
            }
        },
        // complete函数，在ajax请求完成（无论成功还是失败）之后触发
        complete: function (xhr) {
            // 这里判断身份认证是否成功
            // console.log(xhr);
            if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
                // 删除假token
                localStorage.removeItem('token');
                // 跳转到登录页面
                location.href = '/login.html';
            }
        },
        // jQuery中ajax选项，有一个headers，通过他，可以设置请求头
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    });
}


// xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');;jhvb   