// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    if (!Array.isArray) {
        Array.isArray = function(arr) {
            // isArray Polyfill
            return Object.prototype.toString.call(arr) === '[object Array]';
        };
    };
    return Array.isArray(arr);
};

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return fn && Object.prototype.toString.call(fn) === '[object Function]';
};


// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    if (typeof(src) !== 'undefine' && typeof(src) !== 'object') {
        return src;     // return primitive value

    } else if (isArray(src)) {
        var len = src.length;
        var arrClone = new Array();
        if (!len) {
            return arrClone;
        };
        for (var i = 0; i < len; i++) {
            if (isArray(src[i])) {
                arrClone[i] = cloneObject(src[i]);      //deep clone nested array
            } else {
                arrClone[i] = src[i];       // copy primitive value
            };
        };
        return arrClone;

    } else if (Object.prototype.toString.call(src) === '[object Date]') {
        return new Date(obj.valueOf());

    } else {
        // clone object
        var props = Object.getOwnPropertyNames(src);
        var clone = new Object();
        for (prop in props) {
            if (typeof(src[prop]) === 'object') {
                var objClone = cloneObject(src[prop]);      // deep clone nested object
            };

            var descriptor = Object.getOwnPropertyDescriptor(src, props[prop]);     // clone descriptor
            var desClone;
            for (attr in descriptor) {
                desClone.attr = descriptor.attr;
            };

            Object.defineProperties(clone, prop, desClone);
        };
        return clone;
    };
};
