(function carousel() {
    // extend util.js
    $.getEvent = function (event) {
        return event ? event : window.event;
    };
    $.getTarget = function (event) {
        return event.target || event.srcElement;
    };

    // get position value of current picture
    function getLeft(){
        var matrix = window.getComputedStyle($('#container'))
                .getPropertyValue('transform');
        var data = /\((.+)\)/.exec(matrix)[0];
        var leftNow = parseInt(data.split(',')[4]);
        return leftNow;
    }

    // basic slide action
    function slide(left, duration) {
        var container = $('#container');
        if (duration) {
            container.style.setProperty('transition-duration', duration);
        }
        container.style.setProperty('transform', 'translate(' + left + 'px, 0px)');
        return;
    }

    // active button style: dot toggle
    function activeDot(index) {
        var activeElement = $('#on');
        if (activeElement) {
            $('#on').removeAttribute('id');
        }
        document.getElementsByClassName('btn')[index - 1].setAttribute('id', 'on');
        return;
    }

    // button click animation
    function buttonClick(target, imgWidth, num) {
        // switch image
        var left = getLeft();
        var index = parseInt(target.dataset.index);
        if (left != -imgWidth * index) {
            left = -imgWidth * index;
        } else {
            return;
        }
        slide(left, '0.5s');

        // toggle button style
        return activeDot(index);
    }

    // arrow click animation
    function arrowClick(direction, imgWidth, num) {
        var left = getLeft();
        var index = Math.abs(parseInt(left / imgWidth));

        // boundry condition
        switch (direction) {
            case 'prev':
                left += imgWidth;
                index--;
                if (left > 0) {
                    left = -imgWidth * num;
                    slide(left, '0s');
                    left = -imgWidth * (num - 1);
                    index = num - 1;

                    // bug? without this line, carousel won't display loop correctly
                    console.log(window.getComputedStyle($('#container'))
                        .getPropertyValue('transform'));
                }
                break;

            case 'next':
                left -= imgWidth;
                index ++;
                if (left < -imgWidth * (num + 1)) {
                    left = -imgWidth;
                    slide(left, '0s');
                    left = -imgWidth * 2;
                    index = 2;

                    console.log(window.getComputedStyle($('#container'))
                        .getPropertyValue('transform'));
                }
                break;
        }

        // fix index beyond boundry
        if (index >= 5) {
            index = 1;
        } else if (index <= 0) {
            index = 4;
        }
        activeDot(index);

        return slide(left, '0.5s');
    }

    // carousel autoplay
    function autoplay(direction, loop, interval) {
        autoplay.timer = setTimeout(function delay() {
            var imgWidth = 600;
            var num = 4;
            var left = getLeft();

            // not loop: when reach boundry, clear timer and jump out
            if (loop == 'notLoop') {
                if ((left >= -600 && direction == 'prev') || (left <= -2400 && direction == 'next'))
                {
                    clearTimeout(autoplay.timer);
                    return;
                }
            }

            switch (direction) {
                case 'next':
                    arrowClick('next', imgWidth, num);
                    break;
                case 'prev':
                    arrowClick('prev', imgWidth, num);
                    break;
            }

            autoplay.timer = setTimeout(delay, interval);
        }, interval);

    }

    // setting handler
    function settingHandler(event) {
        event = $.getEvent(event);
        var target = $.getTarget(event);
        var direction = $('form').direction.value;
        var loop =  $('form').loop.value;
        var interval = $('input').value * 1000;

        // set timer & autoplay
        if (autoplay.timer) {
            clearTimeout(autoplay.timer);
        }
        return autoplay(direction, loop, interval);
    }

    // handle button click
    delegateEvent(
        $('#carousel'),
        'li',
        'click',
        function (event) {
            event = $.getEvent(event);
            var target = $.getTarget(event);
            var imgWidth = 600;
            var num = 4;
            return buttonClick(target, imgWidth, num);
    });

    // handle arrow click
    delegateEvent(
        $('#carousel'),
        'a',
        'click',
        function (event) {
            event = $.getEvent(event);
            var target = $.getTarget(event);
            var imgWidth = 600;
            var num = 4;
            var direction = target.getAttribute('id');
            var loop =  $('form').loop.value;
            var left = getLeft();

            // not loop: when reach boundry, jump out
            if (loop == 'notLoop') {
                if ((left >= -600 && direction == 'prev') || (left <= -2400 && direction == 'next'))
                {
                    return;
                }
            }

            return arrowClick(direction, imgWidth, num);
    });

    // handle setting
    delegateEvent($('form'), 'span', 'click', settingHandler);
    return autoplay('next', 'isLoop', 3000);
}) ();


