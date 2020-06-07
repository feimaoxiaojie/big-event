//入口函数
$(function () {
    //1.切换登录盒子
    $('#goto-reg').on('click', function () {
        $('#login').hide().next().show();
    });
    //2.切换注册盒子
    $('#goto-login').on('click', function () {
        $('#login').show().next().hide();
    });

    //--------------------------------------------------------------
    //完成注册功能
    //1.监听注册表单的提交事件
    $('#register form').on('submit', function (e) {
        //2.阻止默认跳转行为
        e.preventDefault();
        //3.获取用户输入的账号密码
        var data = $(this).serialize();//serialize是根据表单项的name属性获取值的，所以这里一定要检查表单项的name属性是否存在
        //console.log(data);username=xxx&&password=4435
        //通过serialize得到的是一个字符串，
        //通过new FormData() 得到的是一个对象，有文件上传的时候，才需要使用FormData();
        //4.ajax提交账号和密码
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/api/reguser',
            data: data,
            success: function (res) {
                //5.根据接口返回接口
                //5.1无论成功还是失败，都要给出一个提示
                alert(res.message);
                //5.2成功了，显示登陆盒子，隐藏注册盒子
                if (res.status === 0) {
                    $('#login').show().next().hide();
                }
            }
        })
    })
})