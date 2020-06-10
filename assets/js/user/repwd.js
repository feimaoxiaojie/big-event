//入口函数
$(function () {
    //---------------------------表单验证功能-------------------------
    /* 思路：
        1.新密码与旧密码不能相同
        2.密码长度不能小于6位数，且不能大于12位数
        3.新密码与确认新密码必须一样
    */
    //1.获取layui的form方法
    var form = layui.form;
    //2.使用这个方法
    form.verify({
        len: [/^[\S]{6,12}$/, '密码长度必须在6-12位之间，且不能出现空格哦~'],
        diff: function (val) {
            //这里的val是新密码的值，因为使用的是新密码验证规则（html里面设置）
            //获取旧密码
            var oldPwd = $('.oldPwd').val(); //不能使用this，this指向的是form表单
            //判断
            if (oldPwd === val) {
                return '不能与原密码一致哦~';
            }
        },
        same: function (val) {
            //这里的val是新密码的值，因为使用的是新密码验证规则（html里面设置）
            //获取旧密码
            var newPwd = $('.newPwd').val(); //不能使用this，this指向的是form表单
            //判断
            if (val !== newPwd) {
                return '新密码与确认密码要保持一致哦~';
            }
        },
    });

    //-------------------------完成密码重置功能----------------------------
    $('form').on('submit', function (e) { 
        e.preventDefault();
        // ajax提交原密码和新密码
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/my/updatepwd',
            data: $(this).serialize(), // 使用serialize的时候，一定要检查表单各项的name
            success: function (res) {
                // 给一个提示
                layer.msg(res.message);
                if (res.status === 0) {
                    // 更新成功，重置表单
                    // reset方法，可以重置表单，但是他是一个DOM方法，所以需要把jQuery对象转成DOM对象
                    $('form')[0].reset();
                }
            },
            headers: {
                'Authorization': localStorage.getItem('token')
            },
            complete: function (xhr) {
                if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
                    // 清楚过期的token或者无效的token
                    localStorage.removeItem('token');
                    // 跳转到登录页
                    // window 表示当前的窗口，即repwd.html
                    // window.parent 表示当前窗口的父窗口，即index.html
                    window.parent.location.href = '/login.html';
                }
            }
        });
    });
})