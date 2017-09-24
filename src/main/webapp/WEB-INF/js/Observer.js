/**
 * 事件
 * 观察者模式
 */
var Observer = (function (slice) {//这里的slice是什么
    // 定义bind
    function bind(event, fn) {
        var events = this.events = this.events || {},
            parts = event.split(/\s+/),//这里的split是什么意思？
            i = 0,
            num = parts.length,
            part;

        if(events[event] && events[event].length) return this;

        for (; i < num;i++){
            events[(part = parts[i])] = events[part] || [];
            events[part].push(fn);
        }
        return this;//每次return this的this是什么东西？
    }
    //这里的one是干什么的？
    function one(event, fn) {
        this.bind(event, function fnc() {
            fn.apply(this, slice.call(arguments));
            this.unbind(event, fnc);
        });
        return this;
    }

    // 定义unbind
    function unbind(event, fn) {
        var events = this.events, eventName, i, parts, num;
        if(!events) return;//如果没有事件要解绑，就返回

        //这里的parts到底是什么？
        parts = event.split(/\s+/);

        for (i = 0, num = parts.length; i < num;i++){
            if((eventName = parts[i]) in events !== false){
                // splice方法是从数组中添加并删除元素，第一个参数为介入的位置，第二个参数为删除的元素个数，第三个参数可选，为添加的内容
                //events里面放的是什么，它和parts是什么关系？
                events[eventName].splice(events[eventName].indexOf(fn), 1);
                if(!events[eventName].length) delete events[eventName];
            }
        }
        return this;
    }

    // 定义trigger
    function trigger(event) {
        var events = this.events, i, args, falg;
        //如果没有事件或者要触发的事件不在订阅者列表当中，所以不能通知
        // (不满足条件时进入分支，正常情况下满足条件进入分支，所以加个！)
        if(!events || event in events === false) return;

        args = slice.call(arguments, 1);
        for (i = events[event].length-1; i>=0;i--){
            falg = events[event][i].apply(this, args);
        }
        return falg;
    }

    return function () {
        this.on = this.subscribe = bind;
        this.off = this.unsubscribe = unbind;
        this.trigger = this.publish = trigger;
        this.one = one;
        return this;//这里的this到底是什么？
    }
})([].slice)//这里的[].slice是什么？