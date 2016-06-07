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
    return str.replace(/^\s+|\s+$/g, '');
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
    // in case of Mainland China and HK
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
        allTags,
        attr;
    if (selector.nodeType) {
        return selector;
    };
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
                    attr = e.slice(1, eqIndex);
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
                    attr = e.slice(1, eLen - 1);
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


/*
 * event
 */

// 给一个element绑定一个针对event事件的响应，响应函数为listener
// cross browser function, support > IE6
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + event, listener);
    } else {
        element['on' + event] = listener;
    };
};

// 移除element对象对于event事件发生时执行listener的响应
// cross browser function, support > IE6
function removeEvent(element, event, listener) {
    if (element.removeEventListener) {
        element.removeEventListener(event, listener, false);
    } else if (element.detachEvent) {
        element.detachEvent('on' + event, listener);
    } else {
        element['on' + event] = null;
    };
};

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element, 'click', listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    addEvent(element,
        'keypress',
        function (event) {
            if (event.key) {
                if (event.key === 'Enter') {
                    listener.call(element, event);
                };
            } else if (event.which === 13) {
                listener.call(element, event);
            };
        });
};

// 接下来我们把上面几个函数和$做一下结合，把他们变成$对象的一些方法
$.enter = addEnterEvent;

/*
 * event delegate
 */
// 事件代理
function delegateEvent(element, tag, eventName, listener) {
    addEvent(element, eventName, function (event) {
        var target = event.target;
        if (target.tagName.toLowerCase() === tag.toLowerCase()) {
            listener.call(target, event);
        };
    });
};

// 封装事件函数, 把他们变成$对象的一些方法
$.on = function (selector, event, listener) {
    addEvent($(selector), event, listener);
};

$.un = function (selector, event, listener) {
    removeEvent($(selector), event, listener);
};

$.click = function (selector, listener) {
    addClickEvent($(selector), listener);
};

$.enter = function (selector, listener) {
    addEnterEvent($(selector), listener);
};

$.delegate = function (selector, tag, event, listener) {
    delegateEvent($(selector),tag, event, listener);
};


/*
 * BOM
 */

// 判断是否为IE浏览器，返回-1或者版本号
// support to IE 11
function isIE() {
    var uA = navigator.userAgent.toLowerCase();
    var pattern = /(?:msie\s|trident.*rv:)([\w.]+)/,
        ver;
    if (pattern.test(uA)) {
        ver = pattern.exec(uA)[1];
    } else {
        ver = -1;
    };
    return ver;
};

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var cookieText = encodeURIComponent(cookieName) + '='
        + encodeURIComponent(cookieValue);
    if (expiredays instanceof Date) {
        cookieText += '; expires=' + expiredays.toGMTString();
    };
    document.cookie = cookieText;
};

// 获取cookie值
function getCookie(cookieName) {
    cookieName = encodeURIComponent(cookieName) + '=';
    var start = document.cookie.indexOf(cookieName);
    var cookieValue = null;

    if (start > -1) {
        var end = document.cookie.indexOf(';', start);
        if (end == -1) {
            cookieValue = document.cookie.length;
        };
        cookieValue = document.cookie.slice(start + cookieName.length, end);
    };
    return cookieValue;
};


// 学习Ajax，并尝试自己封装一个Ajax方法
function ajax(url, options) {

    // create XMLHttpRequest Object
    // support to version earlier than IE7
    function createXHR() {
        if (typeof XMLHttpRequest != 'undefined') {
            return new XMLHttpRequest();
        } else if (typeof ActiveXObject != 'undefined') {
            if (typeof arguments.callee.activeXString != 'string') {
                var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'];
                for (var i=0, len=versions.length; i < len; i++) {
                    try {
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        break;
                    } catch (ex){
                        //skip
                    };
                };
            };
            return new ActiveXObject(arguments.callee.activeXString);
        } else {
            throw new Error('No XHR object available.');
        };
    };
    var xhr = createXHR();

    // set default value of request type
    if (!options.type) {
        options.type = 'GET';
    } else {
        options.type = options.type.toUpperCase();
    };
    if (!options.asyc) {
        options.asyc = true;
    };

    // set callback function
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                if (options.onsuccess) {
                    options.onsuccess();
                };
            } else {
                if (options.onfail) {
                    options.onfail();
                };
            };
        };
    };


    // format valid URL query string
    if (!options.data) {
        options.data = '';
    } else {
        var encodeQuery = [];
        for (key in options.data) {
            if (options.data.hasOwnProperty(key)) {
                encodeQuery.push(encodeURIComponent(key) + '='
                    + encodeURIComponent(options.data[key]));
            };
        };
        encodeQuery = encodeQuery.join('&');
    };

    // send request
    if (options.type === 'GET') {
        url += (url.indexOf('?') == -1 ? '?' : '&') + encodeQuery;
        xhr.open(options.type, url, options.asyc);
        xhr.send();
    } else if (options.type === 'POST') {
        xhr.open(options.type, url, options.asyc);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(options.data);
    };
};