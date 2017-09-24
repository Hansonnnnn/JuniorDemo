/**
 * 慕课网特制
 * 圣诞主题效果
 * @type {Object}
 */

/**
 * 切换页面
 * 模拟镜头效果
 * @return {[type]} [description]
 */

function changePage(element, effect, callback){
    element.addClass(effect).one("animationed webkitAnimationEnd", function(){
        callback && callback();
    })
}

var Christmas = function () {
    var $pageA = $(".page-a");
    var $pageB = $(".page-b");
    var $pageC = $(".page-c");

    $("#page").on("change", function(e){
        var pageName = e.target.value;
        switch (pageName){
            case "page-b":
                //切换到页面B，A自动隐藏，然后捕获到切换后的通知
                changePage($pageA, "effect-out", function () {
                    new pageB();
                })
                break;
            case "page-c":
                changePage($pageC, "effect-in", function () {
                    new pageC();
                })
                break;
        }
    })
}

var AutoChristmas = function () {
    var $pageA = $(".page-a");
    var $pageB = $(".page-b");
    var $pageC = $(".page-c");

    //观察者模式，是通过事件来实现的
    var observer = new Observer();

    //实现的大致思路，先把A发布，因为最一开始显示的是A界面，然后分别订阅B、C界面，每个订阅事件会有对应的回调函数，只不过这里是切换界面
    //就相当于再分别发布B、C界面，发布的时候并不是有Christmas.js来负责，而是将界面的切换分配出去
    //这样实现的功能：Christmas.js作为中介，让界面切换的逻辑不依赖于具体的实现，而是依赖于抽象，说是会说，但是这个例子还没有真正的理解

    //A场景页面
    new pageA(function(){
        observer.publish("completeA");
    })

    //进入B场景
    observer.subscribe("pageB", function() {
        new pageB(function() {
            observer.publish("completeB");
        })
    })
    //进入C场景
    observer.subscribe("pageC", function() {
        new pageC()
    })

    //页面A-B场景切换
    observer.subscribe("completeA", function() {
        changePage($pageA, "effect-out", function() {
            observer.publish("pageB");
        })
    })

    //页面B-C场景切换
    observer.subscribe("completeB", function() {
        changePage($pageC, "effect-in", function() {
            observer.publish("pageC");
        })
    })
}




/**
 * 背景音乐
 * @param {[type]} url  [description]
 * @param {[type]} loop [description]
 */
function HTML5Audio(url, loop) {
    var audio = new Audio(url);
    audio.autoplay = true;
    audio.loop = loop || false;//这样就保证了：如果要循环播放传入true即可，否则默认是不循环播放
    audio.play();
    return{
        end: function (callback) {
            audio.addEventListener("ended", function () {
                callback();
            }, false)
        }
    }
}

$(function() {
    //圣诞主题效果，开始
    // Christmas()
    $("#changePageButton").click(function () {
        AutoChristmas();
    })
    $("#playMusicButton").click(function () {
        var audio1 = HTML5Audio('http://www.sunnylinner.com/Games/Music/Media/407.mp3');
        audio1.end(function () {
            alert("播放结束");
        })
    })
    $("#loopMusicButton").click(function () {
        HTML5Audio('http://www.sunnylinner.com/Games/Music/Media/407.mp3', true);
    })
    $("#playSleighAnimationButton").click(function () {
        new pageA($(".page-a"))
    })
})