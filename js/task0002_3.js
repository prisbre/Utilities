window.onload = function () {
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

        function slide(direction, loop, interval) {};

        // arrow click animation
        var id = target.getAttribute('id');
        var container = $('#container');
        var leftVal = parseInt(window.getComputedStyle(container).left);
        if (id == 'prev' ) {
            leftVal += 600 + 'px';
        } else if (id == 'next') {
            leftVal -= 600 + 'px';
        }
        container.style.setProperty('left', leftVal);
    };
    delegateEvent($('article'), 'a', 'click', animate);
};