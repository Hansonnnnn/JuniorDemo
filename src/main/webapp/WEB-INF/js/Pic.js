//定义全局枚举类
if(typeof SideType === "undefined"){
    var SideType = {
        WIDTH: 1,
        HEIGHT: 2
    }
}

$(function () {

    //为全部图片按钮绑定事件
    $("#allPicsButton").click(function () {
        bundEventsOnLi();
        $(".picWall").show();
    });

    loadMainPic();

    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;

    var innerWidth = window.innerWidth;
    var innerHeight = window.innerHeight;

    if(windowWidth !== innerWidth){
        window.innerWidth = windowWidth;
        window.innerHeight = windowHeight;
    }

    drawTheTree(windowWidth, windowHeight);
    setTimeout(drawTheSun(windowWidth, windowHeight), 1000);

    loadImages();
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
        width = img.width = getAnotherSideLengthWhenOneSideIsDetermined(SideType.HEIGHT, 400, width, height);
        img.id = "mainPic";
        picImgHolder.append(img);
        //步骤：先画边框，再确定照片所在容器的大小，因为确定之后才能居中
        polishTheBorders();
        $(".pic").css("width", width);
    });


}
/**
    url:所要加载的图片的地址
    callback：图片加载完成后所要执行的操作
 */
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


var pointXArray = new Array(), pointYArray = new Array();

function drawTheTree(windowWidth, windowHeight) {
    var rootPositionX = windowWidth / 2, rootPositionY = windowHeight, firstPositionX = 0, firstPositionY = 0;
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = windowWidth;
    canvas.height = windowHeight;

    ctx.lineWidth = 5;
    ctx.lineJoin = 'bevel';
    ctx.beginPath();
    ctx.moveTo(rootPositionX, rootPositionY);
    pointXArray.push(rootPositionX);
    pointYArray.push(rootPositionY);

    firstPositionX = rootPositionX;
    firstPositionY = rootPositionY - 100;
    ctx.lineTo(firstPositionX, firstPositionY);//0

    //最左枝
    ctx.lineTo(firstPositionX - 250, firstPositionY - 80);//A1
    ctx.lineTo(firstPositionX - 400, firstPositionY - 160);//A2
    ctx.lineTo(firstPositionX - 480, firstPositionY - 300);//A3

    //左2
    ctx.moveTo(firstPositionX, firstPositionY);//0
    ctx.lineTo(firstPositionX - 100, firstPositionY - 140);//B1
    ctx.lineTo(firstPositionX - 210, firstPositionY - 200);//B2
    ctx.lineTo(firstPositionX - 350, firstPositionY - 370);//B3

    ctx.moveTo(firstPositionX - 210, firstPositionY - 200);//B2
    ctx.lineTo(firstPositionX - 160, firstPositionY - 300);//B21
    ctx.lineTo(firstPositionX - 130, firstPositionY - 450);//B22

    ctx.moveTo(firstPositionX - 145, firstPositionY - 375);//B211
    ctx.lineTo(firstPositionX - 30, firstPositionY - 500);//B212
    ctx.lineTo(firstPositionX - 5, firstPositionY - 650);

    ctx.moveTo(firstPositionX - 135, firstPositionY - 435);//B221
    ctx.lineTo(firstPositionX - 170, firstPositionY - 490);//B222
    ctx.lineTo(firstPositionX - 250, firstPositionY - 540);//B223

    //右1
    ctx.moveTo(firstPositionX, firstPositionY);//0
    ctx.lineTo(firstPositionX + 30, firstPositionY - 150);//C1
    ctx.lineTo(firstPositionX - 50, firstPositionY - 300);//C2

    ctx.moveTo(firstPositionX + 30, firstPositionY - 150);//C1
    ctx.lineTo(firstPositionX + 250, firstPositionY - 300);//C3

    ctx.moveTo(firstPositionX + 184, firstPositionY - 255);//C13
    ctx.lineTo(firstPositionX + 140, firstPositionY - 390);//C131
    ctx.lineTo(firstPositionX + 50, firstPositionY - 500);//C132

    ctx.moveTo(firstPositionX + 140, firstPositionY - 225);
    ctx.lineTo(firstPositionX + 300, firstPositionY - 245);
    ctx.lineTo(firstPositionX + 350, firstPositionY - 300);

    ctx.moveTo(firstPositionX, firstPositionY);//0
    ctx.lineTo(firstPositionX + 300, firstPositionY - 50);
    ctx.lineTo(firstPositionX + 450, firstPositionY - 150);

    ctx.shadowOffsetX = -5;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 15;
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.strokeStyle = "#503515";
    ctx.stroke();
    ctx.closePath();
}

function drawTheSun(windowWidth, windowHeight) {
    //sun
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fc625d";
    ctx.beginPath();
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    ctx.arc(windowWidth - 100, 100, 50, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fill();
    // ctx.strokeStyle = "yellow";

}

function loadImages() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var urlArray = new Array();
    //蒙娜丽莎
    urlArray[0] = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1506531457724&di=222b0479fa78bfab89754b76f2502b83&imgtype=0&src=http%3A%2F%2Fwww.69ys.com%2FupFile%2Fkindeditorfile%2Fimage%2F20140724%2F20140724224829_9687.jpg";
    //拉斐尔 雅典学院
    urlArray[1] = "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2781997830,2775448056&fm=27&gp=0.jpg";
    //毕加索式的我
    urlArray[2] = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507126271&di=31302b250ebf36eee539bc6b3afc2b91&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01da4659041422a801214550259bc9.jpg%40900w_1l_2o_100sh.jpg";
    //毕加索自画像
    urlArray[3] = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1506572779085&di=4b4b083a5b45d7466918712d991c1302&imgtype=0&src=http%3A%2F%2Fis5.mzstatic.com%2Fimage%2Fthumb%2FPurple5%2Fv4%2F74%2F4b%2F6f%2F744b6f50-8486-6ffb-3056-175e5e85e12c%2Fpr_source.png%2F0x0ss-85.jpg"
    //创世纪
    urlArray[4] = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1506573106356&di=3dfc39fc7161d1840cc96bc4a09888f5&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D78617915%2C3807505875%26fm%3D214%26gp%3D0.jpg";
    //牛顿公爵
    urlArray[5] = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1506573327803&di=fbd2e7fe8bab70e5bf267f33fbbdadb8&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fbaike%2Fpic%2Fitem%2F95eef01f3a292df517dc07edbe315c6034a8732f.jpg";
    //乔布斯
    urlArray[6] = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1506574217851&di=9e417c6d25070f24a6ae73c131ce14ef&imgtype=0&src=http%3A%2F%2Fnews.chinaceot.com%2Fupload%2Fpic%2F1104%2F20110429_c4ca42.jpg";
    //深泽直人
    urlArray[7] = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1506574378188&di=dfab18013bbc8c6ca6830cece47e3262&imgtype=0&src=http%3A%2F%2Fimg1.ph.126.net%2FepTuYYYwBruEmtRth0Lx9A%3D%3D%2F2774217370477887187.jpg";
    //爱马仕丝巾
    urlArray[8] = "http://media.hermes.com/media/catalog/product/import/S/S01/S011/item/flat/zoom/H003119S-10.jpg";
    //apple pencil
    urlArray[9] = "../images/apple_pencil.png";
    //
    urlArray[10] = "";
    //
    urlArray[11] = "";
    //
    urlArray[12] = "";
    //
    urlArray[13] = "";
    //


    //A
    ctx.fillStyle = "#e8e8e8";
    // ctx.fillRect(110, 350, 70, 100);
    ctx.beginPath();
    ctx.moveTo(170, 320);
    ctx.lineTo(145, 350);
    ctx.stroke();


    loadImg(urlArray[2], function (image) {
        loadImageWhenWidthIsDetermined(image, "A", 70, 110, 350);
    });

    //B
    ctx.fillRect(280, 320, 60, 120);
    ctx.moveTo(310, 320);
    ctx.lineTo(325, 280);
    ctx.stroke();

    console.log(urlArray.length);

    //C
    ctx.fillRect(300, 545, 120, 70);
    ctx.moveTo(360, 545);
    ctx.lineTo(385, 522);
    ctx.stroke();

    //D
    ctx.fillRect(350, 120, 100, 150);
    ctx.moveTo(400, 120);
    ctx.lineTo(440, 96);
    ctx.stroke();

    //E
    ctx.fillRect(500, 260, 60, 100);
    ctx.moveTo(530, 260);
    ctx.lineTo(490, 240);
    ctx.stroke();

    //F
    ctx.fillRect(570, 155, 120, 60);
    ctx.moveTo(630, 155);
    ctx.lineTo(580, 130);
    // ctx.lineTo(500, 135);
    ctx.stroke();

    //G
    ctx.fillRect(670, 245, 90, 130);
    ctx.moveTo(715, 245);
    ctx.lineTo(720, 220);
    ctx.lineTo(768, 200);
    ctx.stroke();

    //H
    ctx.fillRect(440, 450, 60, 50);
    ctx.moveTo(470, 450);
    ctx.lineTo(500, 440);
    ctx.stroke();

    //I
    ctx.fillRect(575, 400, 60, 100);
    ctx.moveTo(605, 400);
    ctx.lineTo(620, 366);
    ctx.stroke();

    //J
    ctx.fillRect(800, 160, 60, 100);
    //下面的线
    ctx.moveTo(830, 162);
    ctx.lineTo(800, 140);
    //上面的线
    ctx.moveTo(720, 140);
    ctx.lineTo(830, 140);
    ctx.stroke();

    //K
    ctx.fillRect(700, 450, 180, 100);
    //下面的线
    ctx.moveTo(790, 452);
    ctx.lineTo(780, 425);
    //上面的线
    ctx.moveTo(712, 420);
    ctx.lineTo(790, 425);
    ctx.stroke();
    loadImg(urlArray[4], function (image) {
        loadImageWhenWidthIsDetermined(image, "K", 180, 700, 450);
    });

    //L
    ctx.fillRect(970, 350, 60, 100);
    ctx.moveTo(1000, 350);
    ctx.lineTo(970, 320);
    ctx.stroke();

    //M
    ctx.fillRect(1050, 480, 60, 100);
    ctx.moveTo(1080, 482);
    ctx.lineTo(1060, 470);
    ctx.stroke();
}

/**
 * 一边定长，返回该情况下另一边的长度
 * @param determinedSide 定长的边（宽还是高）类型为两种 ： Width:1 - Height:2
 * @param dsLength 确定边的长度
 * @param width 原始宽
 * @param height 原始高
 */
function getAnotherSideLengthWhenOneSideIsDetermined(determinedSide, dsLength, width, height) {
    var rate = 0;
    if(determinedSide === 1){
        rate = height / width;
        return dsLength * rate;
    }else{
        rate = width / height;
        return dsLength * rate
    }
}

/**
 * 该函数实现了将图片加载出来之后，放置到不同的位置
 * 进一步功能的分离
 * @param image 加载的图片
 * @param id 加载图片对应DOM节点的id
 * @param dsLength 固定的长度（固定一边，确定另一边）
 * @param left 距离左边框的距离
 * @param top 距离上边框的距离
 */
function loadImageWhenWidthIsDetermined(image, id, dsLength, left, top) {
    image.height = getAnotherSideLengthWhenOneSideIsDetermined(SideType.WIDTH, dsLength, image.width, image.height);
    image.width = dsLength;
    image.id = id;
    $(".picWall").append(image);
    // $("#A").addClass("flexiblePosition").css("left", "110px").css("top", "350px");
    $("#" + id).addClass("flexiblePosition").css("left", left).css("top", top);
}