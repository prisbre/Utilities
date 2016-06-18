(function () {
    // extend util.js
    $.getEvent = function (event) {
        return event ? event : window.event;
    };
    $.getTarget = function (event) {
        return event.target || event.srcElement;
    };

    // carousel animation
    function animate(event) {
        event = $.getEvent(event);
        target = $.getTarget(event);

        function slide(imgWidth, num, direction, loop, interval) {};

        // arrow click animation
        var imgWidth = 600,
            num = 4,
            id = target.getAttribute('id'),
            container = $('#container'),
            leftVal = parseInt(window.getComputedStyle(container).left);
        if (id == 'prev') {
            if (leftVal > -imgWidth) {
                leftVal = -imgWidth * num;
            };
            leftVal += imgWidth;
        } else if (id == 'next') {
            if (leftVal < -imgWidth * num) {
                leftVal = -imgWidth;
            };
            leftVal -= imgWidth;
        };
        container.style.setProperty('left', leftVal + 'px');
    };


    delegateEvent($('article'), 'a', 'click', animate);
}) ();