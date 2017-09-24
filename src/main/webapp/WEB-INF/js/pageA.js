// function pageA(callback) {
//     // alert("页面A");
//     setTimeout(function () {
//         callback()
//     }, 2000)
// }
function pageA(element) {
    //根元素
    // this.$root = element;
    this.$boy = element.find(".chs-boy");
    this.run();
}

/**
 * 运行下一个动画
 * @return {Function} [description]
 */
pageA.prototype.next = function (options) {
    var dfd = $.Deferred();
    this.$boy.transition(options.style, options.time, "linear", function () {
        dfd.resolve()
    });
    return dfd;
};

/**
 * 停止走路
 * @return {[type]} [description]
 */

pageA.prototype.stopWalk = function () {
    this.$boy.removeClass("chs-boy-deer")
};

/**
 * 路径
 * @return {[type]} [description]
 */
pageA.prototype.run = function () {
    var that = this;//这里需要保存一下this，因为下面的apply会将this替换为this.next
    var next = function () {
        //将下一个动画替换当前动画，然后将下一个动画需要的option数组以arguments的形式传输过去
        return this.next.apply(this, arguments)//可是为什么要替换？？？？？？？？？？？？？？？？？？？
    }.bind(this);

    next({
        "time" : 5000,
        "style": {
            "top": "4rem",
            "right": "50rem",
            "scale": "1.5"
        }
    }).then(function () {
        return next({       //这里为什么要把next return回去？？？？？---->因为第一次是next这个对象调用的then方法，
                            // then不能再直接调then，而应该将最原始的对象返回去，即可连续调用
            "time" : 500,
            "style": {
                "rotateY": "-180",
                "scale": "1.5"
            }
        })
    }).then(function () {
        return next({
            "time": 3000,
            "style": {
                "top": "17rem",
                "right": "6rem",
            }
        })
    }).then(function () {
        that.stopWalk();
    });
};