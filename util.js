// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    if (!Array.isArray) {
        Array.isArray = function(arr) {
            // 保证跨框架检测array能得到正确的结果
            return Object.prototype.toString.call(arr) === '[object Array]';
        };
    };
    return Array.isArray;
};

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return fn && Object.prototype.toString.call(fn) === '[object Function]';
};
