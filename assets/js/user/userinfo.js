//全局变量，加载layui的form模块
var form = layui.form;

function renderUser() {
    //用户一进到基本资料这个页面，马上发送ajax请求，获取返回值渲染表单
    $.ajax({
        url: 'http://www.liulongbin.top:3007/my/userinfo',
        headers: {
            'Authorization': localStorage.getItem('token'),
        },
        success: function (res) {
            if (res.status === 0) {
                //获取数据成功  渲染到表单
                //这个办法太冗余
                // $('input[name="id"]').val(res.data.id);
                // $('input[name="username"]').val(res.data.username);
                // $('input[name="nickname"]').val(res.data.nickname);
                // $('input[name="enail"]').val(res.data.email);


                //使用layui提供的快速为表单赋值
                form.val('abc', res.data);
            }
        },

        //请求完成之后，检查判断token是否真实存在或者过期
        complete: function (xhr) {
            if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
                //1.清除token值
                localStorage.removeItem('token');
                //2.返回登录页面、
                window.parent.location.href = '/login.html';
            }
        }
    })
};

$(function () {
    // 调用renderUser这个函数
    renderUser();


    //---------------------表单监听，完成信息更新---------------------------
    $('form').on('submit', function (e) {
        //阻止默认事件跳转
        e.preventDefault();
        //发送ajax请求返回更新数据
        //获取表单数据
        var data = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/my/userinfo',
            data: data,
            headers: {
                'Authorization': localStorage.getItem('token'),
            },
            success: function (res) {
                //无论成功与否，提示一下
                layer.msg(res.message);
                //欢迎语那里的昵称修改一下，调用一下父页面的getUserInfo()方法
                window.parent.getUserInfo();

            },
            //请求完成之后，检查判断token是否真实存在或者过期
            complete: function (xhr) {
                if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
                    //1.清除token值
                    localStorage.removeItem('token');
                    //2.返回登录页面、
                    window.parent.location.href = '/login.html';
                }
            }
        })
    });
    //-----------------------------重置表单---------------------------------
    $('button[type="reset"]').on('click', function (e) {
        //阻止表单默认跳转行为
        e.preventDefault();
        //恢复和没改之前一样
        renderUser();
    })

})