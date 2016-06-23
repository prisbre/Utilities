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
                .getPropertyValue('transform'),
            data = /\((.+)\)/.exec(matrix)[0],
            leftNow = parseInt(data.split(',')[4]);
        //console.log('gl', leftNow);
        return leftNow;
    };

    // slide to target picture
    function slide(left, duration) {
        var container = $('#container');
        if (duration) {
            container.style.setProperty('transition-duration', duration);
        };
        container.style.setProperty('transform', 'translate(' + left + 'px, 0px)');
        return;
    };

    // button style: active dot toggle
    function activeDot(index) {
        var activeElement = $('#on');
        if (activeElement) {
            $('#on').removeAttribute('id');
        };
        // console.log(index, document.getElementsByClassName('btn'));
        document.getElementsByClassName('btn')[index - 1].setAttribute('id', 'on');
        return;
    };

    // button click animation
    function buttonClick(target, imgWidth, num) {
        // switch image
        var left = getLeft(),
            index = parseInt(target.dataset.index);
        if (left != -imgWidth * index) {
            left = -imgWidth * index;
        } else {
            return;
        }
        //console.log('bc', left, index)
        slide(left);

        // toggle button style
        return activeDot(index);
    };

    // arrow click animation
    function arrowClick(target, imgWidth, num) {
        // circulate
        var id = target.getAttribute('id'),
            left = getLeft(),
            index = Math.abs(parseInt(left / imgWidth));

        console.log(id);

        // boundry condition
        //console.log('s', index, left)
        switch (id) {
            case 'prev':
                left += imgWidth;
                index--;
                if (left > 0) {
                    left = -imgWidth * num;
                    slide(left, '0s');
                    left = -imgWidth * (num - 1);
                    index = num - 1;

                    // bug? without this carousel won't circulate correctly
                    console.log(window.getComputedStyle($('#container'))
                        .getPropertyValue('transform'));
                };
                //console.log('t',index);
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
                };
                break;
        };
        //console.log('s', index, left);

        // fix index beyond boundry
        if (index >= 5) {
            index = 1;
        } else if (index <= 0) {
            index = 4;
        };

        activeDot(index);
        return slide(left, '0.3s');
    };

    // carousel autoplay
    function autoplay(direction, loop, interval) {
        autoplay.timer = setTimeout(function delay() {
            var imgWidth = 600,
                num = 4;
            console.log('autoplay.timer', direction, autoplay.timer);

            switch (direction) {
                case 'next':
                    arrowClick($('#next'), imgWidth, num);
                    console.log('#next', arrowClick);
                    break;
                case 'prev':
                    arrowClick($('#prev'), imgWidth, num);
                    console.log('#prev',arrowClick);
                    break;
            };


            autoplay.timer = setTimeout(delay, interval);
        }, interval);

    };

    // setting handler
    function settingHandler(event) {
        var event = $.getEvent(event),
            target = $.getTarget(event),
            direction = $('form').direction.value,
            loop =  $('form').loop.value,
            interval = $('input').value * 1000;

        // set timer & autoplay
        if (autoplay.timer) {
            clearTimeout(autoplay.timer);
            console.log('h', autoplay.timer, typeof direction, loop, interval)
        };
        return autoplay(direction, loop, interval);
    };

    // handle button click
    delegateEvent(
        $('article'),
        'li',
        'click',
        function (event) {
            var event = $.getEvent(event),
                target = $.getTarget(event),
                imgWidth = 600,
                num = 4;
            return buttonClick(target, imgWidth, num);
    });

    // handle arrow click
    delegateEvent(
        $('article'),
        'a',
        'click',
        function (event) {
            var event = $.getEvent(event),
                target = $.getTarget(event),
                imgWidth = 600,
                num = 4;
            return arrowClick(target, imgWidth, num);
    });

    // handle setting
    delegateEvent($('form'), 'span', 'click', settingHandler);

    return autoplay('prev', true, 2000);
}) ();


