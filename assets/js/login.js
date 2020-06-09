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
                layer.msg(res.message);
                //5.2成功了，显示登陆盒子，隐藏注册盒子
                if (res.status === 0) {
                    $('#login').show().next().hide();
                }
            }
        })
    });
    //--------------------------------------------------------------
    //自定义验证规则
    //使用layui的表单验证功能，分为2步骤
    //1.加载form模块
    var form = layui.form;
    //2.调用form.verify()方法，自定义你的验证规则
    form.verify({
        //键（验证规则）：值（验证方法（可以是数组，也可以是函数））
        //len:[],
        //len:function(){}

        //正则表达式法
        // len: [/^[\s]{6,12}$/, '密码长度不对'],
        len: function (val) {
            // val表示使用用该验证规则的输入框的值
            // console.log(val);
            if (val.trim().length < 6 || val.trim().length > 12) {
                return '老汤说，密码不对！'
            };
        },
        same: function (val) {
            //val表示重复密码
            //这里还需要一个密码框的值，获取如下
            var password = $('.pass').val();
            //比较重复密码
            if (val != password) {
                return '两次密码不一致哦！'
            }
        }

    });

    //--------------------------------------------------------------
    //完成登录功能
    //1,监听登录表单的提交事件
    $('#login form').on('submit', function (e) {
        //2.阻止事件默认跳转事件
        e.preventDefault();
        //3.获取用户输入的账号密码
        var data = $(this).serialize();
        //4.ajax提交账号密码
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/api/login',
            data: data,
            success: function (res) {
                //5.根据服务器返回结果
                //5.1无论成功还是失败，都给提示
                layer.msg(res.message);
                if (res.status === 0) {
                    //5.2如果登录成功，跳转到首页
                    // /表示根目录
                    //跳转到html页面
                    localStorage.setItem('token', res.token);
                    location.href = '/index.html';
                }
                
            }
        })

    })
})