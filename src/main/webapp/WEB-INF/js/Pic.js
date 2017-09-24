$(function () {
    //为全部图片按钮绑定事件
    $("#allPicsButton").click(function () {
        bundEventsOnLi();
        $(".picWall").show();
    });

    loadMainPic();

});

//为全部图片中每张图片绑定事件
function bundEventsOnLi() {
    $("#picList").find("li").click(function () {
        $(".picWall").hide();
    });
}

function loadMainPic() {
    var picImgHolder = $("#mainPicHolder"), rate = 0, height = 0, width = 0;
    // var url = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1506017382544&di=b9b2aea01794d0b1b09819c69a193392&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3D8d894a483f2ac65c73086e30939bd864%2F11385343fbf2b211241d1366c08065380cd78ee3.jpg';
    var url = "http://img4.imgtn.bdimg.com/it/u=3025442840,158893413&fm=214&gp=0.jpg";
    loadImg(url, function (img) {
        height = img.height;
        width = img.width;
        rate = width / height;
        img.height = 400 ;
        width = img.width = 400 * rate;
        img.id = "mainPic";
        picImgHolder.append(img);
        polishTheBorders();
        $(".pic").css("width", width);
    });


}

function loadImg(url, callback) {
    var image = new Image();
    image.src = url;
    if(image.complete){
        callback(image);
        return;
    }

    image.onload = function () {
        callback(image);
    }
}

function polishTheBorders() {
    $("#mainPic").addClass("picBorderAndShadow");

}