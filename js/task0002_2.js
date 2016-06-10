function callback() {
    // function return object containing countdown information
    function countdown(dateObject) {
        var result = {},
            dateVal = dateObject.valueOf(),
            second = 1000,
            minute = 60 * second,
            hour = 60 * minute,
            day = 24 * hour;

        result.day = Math.floor(dateVal / day);
        result.hour = Math.floor(dateVal % day / hour);
        result.minute = Math.floor(dateVal % hour / minute);
        result.second = Math.floor(dateVal % minute / second);
        return result;
    };

    var due = new Date($('#date').value),
        info = '距离Y年M月D日还有';

    // replace placeholder in info
    info = info.replace('Y', due.getFullYear());
    info = info.replace('M', due.getMonth() + 1);
    info = info.replace('D', due.getDate());   // get the day of the month (1-31)

    // set timer
    if (callback.timer) {
        clearTimeout(callback.timer);
    };
    callback.timer = setTimeout(function refer() {
        var now = new Date(),
            interval = new Date(due - now),
            remain = countdown(interval);

        // initialize countdown information
        var text = info;
        text += ' ' + (remain.day > 0 ? remain.day : '0') + ' 天';
        text += ' ' + (remain.hour > 0 ? remain.hour : '0') + ' 小时';
        text += ' ' + (remain.minute > 0 ? remain.minute : '0') + ' 分';
        text += ' ' + (remain.second > 0 ? remain.second : '0') + ' 秒';
        $('#info').textContent = text;

        // recursive setTimeout
        if (interval / 1000 > 0) {
            callback.timer = setTimeout(refer, 1000);
        } else {
            clearTimeout(callback.timer);
            return;
        };
    },
    1000);
};
$.click('#countdown', callback);

