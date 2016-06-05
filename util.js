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

// 判断是否为邮箱地址
function isEmail(emailStr) {
    return /^([a-z0-9]+[-._]?)+@([a-z0-9]+\.){1,3}([a-z]{2,4})$/i.test(emailStr);
};

// 判断是否为手机号
function isMobilePhone(phone) {
    // in case of China and HK
    return /^((\+)?(86|852))?(\s*-?\s*)?(\d{8}|1\d{10})$/.test(phone);
};

/*
 * DOM
 */

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    element.classList.add(newClassName);
};

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    element.classList.remove(oldClassName);
};

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode.isEqualNode(siblingNode.parentNode);
};

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var position = element.getBoundingClientRect();
    var result = {
        x: position.left,
        y: position.top
    };
    return result;
};

/*
 * mini $
 *
 * 接下来挑战一个mini $，它和之前的$是不兼容的，它应该是document.querySelector的功能子集，
 * 在不直接使用document.querySelector的情况下，在你的util.js中完成以下任务
 */

// 可以通过id获取DOM对象，通过#标示，例如$('#adom');
// 返回id为adom的DOM对象

// 可以通过tagName获取DOM对象，例如$('a');
// 返回第一个<a>对象

// 可以通过样式名称获取DOM对象，例如$('.classa');
// 返回第一个样式定义包含classa的对象

// 可以通过attribute匹配获取DOM对象，例如$('[data-log]');
// 返回第一个包含属性data-log的对象$('[data-time=2015]');
// 返回第一个包含属性data-time且值为2015的对象

// 可以通过简单的组合提高查询便利性，例如$('#adom .classa');
// 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象

// 实现一个简单的Query
function $(selector) {
    var sList = selector.replace(/\s+/, ',').split(','),
        elm,
        allTags;
    sList.forEach(function(e) {
        switch(e[0]) {
            // handle Id
            case '#':
                elm = document.getElementById(e.slice(1));
                break;

            // handle class
            case '.':
                elm = document.getElementsByClassName(e.slice(1))[0];
                break;

            // handle attribute
            case '[':
                // initialize allTags
                if(!allTags) {
                    allTags = document.getElementsByTagName('*');
                    var tagsLen = allTags.length;
                };
                var eLen = e.length;
                var eqIndex = e.indexOf('=');

                // attribute with value
                if (eqIndex !== -1) {
                    var attr = e.slice(1, eqIndex);
                    var val = e.slice(eqIndex + 1, eLen - 1);
                    for(var i = 0; i < tagsLen; i++) {
                        if (allTags[i].hasAttribute(attr)
                            && allTags[i].getAttribute(attr) === val)
                        {
                            elm = allTags[i];
                            break;
                        };
                    };

                // attribute without value
                } else {
                    var attr = e.slice(1, eLen - 1);
                    for(var i = 0; i < tagsLen; i++) {
                        if (allTags[i].hasAttribute(attr)) {
                            elm = allTags[i];
                            break;
                        };
                    };
                };
                break;

            // handle tag
            default :
                elm = document.getElementsByTagName(e)[0];
                break;
        };
    });
    return elm;
};



