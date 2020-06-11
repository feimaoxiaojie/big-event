//入口函数
$(function () {
    //一、实现剪裁的效果
    //1.1获取裁剪区域的 DOM 元素
    var $image = $('#image');
    //1.2配置选项
    const options = {
        //纵横比
        aspectRatio: 1,
        //指定预览区域
        preview: 'img-preview'
    };
    //1.3创建剪裁区域
    $image.copper(option);

    //二、点击上传，能够选择图片
    $('button:containers("上传")').click(function () {
        //用代码的方式上传控件（文件域）的单击事件
        $('#file').trigger('click');
    });

    //三、切换图片之后，更换剪裁区域的图片
    //当文件域的内容发生改变的时候，更换建材区的图片
    $('#file').change(function () {
        //我们选择的图片url地址是？？？
        //3.1找到文件对象
        var fileObj = this.files[0];
        //3.2调用js内置对象URL的createObjcetURL方法，为文件生成临时的url
        var url = URL.createObjectURL(fileObj);
        //3.3=更换裁剪区的图片（销毁之前的裁剪区-->更换图片-->重新生成裁剪区）
        $image.cropper('destroy').attr('src', url).copper(options);
    });

    //四、点击“确定”，剪裁图片，同时更换头像
    //点击确认按钮，剪裁图片，ajax提交图片的额接口，实现头像更换
    $('button:contains("确定")').click(function () {
        var dataURL = $image.cropper('getCroppedCanvans', {
            width: 100,
            height: 100
        }).toDataURL('image/png');//先剪裁，然后调用toDataURL方法，可以把图片转成base64格式
        $.ajax({
            type: 'POST',
            url: '/my/updata/avatar',
            data: { avatar: dataURL },
            success: function (res) {
                layer.msg(res.message);
                if (res.status === 0) {
                    //更新成功，调用父页面的getUserInfo();
                    window.parent.getUserInfo();
                };
            },
        });
    });

});