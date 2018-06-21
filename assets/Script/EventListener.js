

const EventListener = function (obj) {

    let Register = {};
    obj.on = function (name, target, method) {
        if (!Register.hasOwnProperty(name)) {
            Register[name] = [];
        }
        let event = {};
        event["target"] = target;
        event["methods"] = method;
        Register[name].push(event);
    };

    obj.fire = function (name) {
        if (Register.hasOwnProperty(name)) {

            let eventArray = Register[name];

            for (let i = 0; i < eventArray.length; i++) {

                let event = eventArray[i];
                let handler = event["methods"];
                let target = event["target"];

                let args = [];

                for (let j = 1; j < arguments.length; j++) {
                    args.push(arguments[j]);
                }

                /*
            * JavaScript 的函数存在「定义时上下文」和「运行时上下文」以及「上下文是可以改变的」这样的概念
            * apply的功能: 当一个 object 没有某个方法, 但是其他的有，我们可以借助call或apply用其它对象的方法来操作
            * call 和 apply 的区别:
            * - 作用完全一样，只是接受参数的方式不太一样
            * - call 需要把参数按顺序传递进去，而 apply 则是把参数放在数组里
            */
                handler.apply(target, args);
            }
        }
    };

    obj.off = function (name, target) {

        if (Register.hasOwnProperty(name)) {

            let eventArray = Register[name];

            for (let i = 0; i < eventArray.length; i++) {

                let event = eventArray[i];
                let eventTarget = event["target"];

                if (target === eventTarget) {
                    eventArray.splice(i, 1);
                }
            }
        }
    };

    return obj;
};

export default EventListener;
