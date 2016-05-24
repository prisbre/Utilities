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
        // clone array
        var srcLen = src.length;
        var arrClone = new Array();
        if (!srcLen) {
            return arrClone;
        };

        for (var i = 0; i < srcLen; i++) {
            if (isArray(src[i])) {
                arrClone[i] = cloneObject(src[i]);      // deep clone nested array
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
        var propsLen = props.length;
        if (!propsLen) {
            return new Object()
        };

        // deep clone object properties
        var clone = new Object();
        for (var i = 0; i < propsLen; i++) {
            var prop = props[i];

            // clone descriptor
            var descriptor = Object.getOwnPropertyDescriptor(src, prop);
            var desClone = new Object();
            for (attr in descriptor) {
                if (typeof(descriptor[attr]) === 'object') {
                    // deep clone nested object
                    desClone[attr] = cloneObject(descriptor[attr]);

                } else {
                    // clone descriptor property
                    desClone[attr] = descriptor[attr];
                };
            };
            Object.defineProperty(clone, prop, desClone);
        };
        return clone;
    };
};

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var len = arr.length;
    if (!len) {
        return new Array();     // in case of empty array
    };

    /*
    // sort array
    // number go ahead of string
    function compare(val1, val2) {
        if (typeof(val1) === 'string' && typeof(val2) === 'number') {
            return 1;
        } else if (typeof(val2) === 'string' && typeof(val1) === 'number') {
            return -1;
        } else {
            if (val1 > val2) {
                return 1;
            } else if (val1 < val2) {
                return -1;
            } else {
                return 0;
            };
        };
    };
    arr = arr.sort(compare); */

    // delete duplicate elements
    // simple and dirty way, algorithm complexity O(n^2)
    function classic(arr) {
        for (var i = 0; i < len; i++) {
            for (var j = i + 1; j < len; j++) {
                if (arr[i] === arr[j]) {
                    arr.splice(j, 1);
                    len--;
                };
            };
        };
        return arr;
    };

    // query method, algorithm complexity depend on JavaScript core optimazation, basically O(1)
    function query(arr) {
        var head = 0;
        var tail = arr.length;
        for (;head >= tail;) {
            if (arr[head] == arr[tail]) {
                arr.shift();
                tail--;
            } else {
                arr.push(arr.shift());
                tail--;
            };
        };
        return arr;
    };
    return query(arr);
};

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    return /\b(\w+[!])/.exec(str)[1];
};

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        arr[i] = fn(arr[i], i);
    };
    return arr;
};

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var keys = Object.keys(obj);
    return keys.length;
};
