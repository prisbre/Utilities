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
        var matrix = window.getComputedStyle($('#container')).getPropertyValue('transform'),
            data = /\((.+)\)/.exec(matrix)[0],
            leftNow = parseInt(data.split(',')[4]);
        console.log('gl', leftNow);
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
        console.log('bc', left, index)
        slide(left);

        // toggle button style
        return activeDot(index);
    };

    // arrow click animation
    function arrowClick(target, imgWidth, num) {
        // circulate
        var id = target.getAttribute('id'),
            left = getLeft(),
            index = Math.abs(parseInt(left / imgWidth)),
            compare = index;

        // boundry condition
        console.log('s', index, left)

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
                    console.log(window.getComputedStyle($('#container')).getPropertyValue('transform'));
                };
                console.log('t',index);
                break;

            case 'next':
                left -= imgWidth;
                index ++;
                if (left < -imgWidth * (num + 1)) {
                    left = -imgWidth;
                    slide(left, '0s');
                    left = -imgWidth * 2;
                    index = 2;

                    console.log(window.getComputedStyle($('#container')).getPropertyValue('transform'));
                };
                break;
        };
        console.log('s', index, left);

        if (index >= 5) {
            index = 1;
        } else if (index <= 0) {
            index = 4;
        };
        // change button style
        activeDot(index);

        return slide(left, '0.3s');
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

    //delegateEvent($('article'), 'a', 'click', animate);
    // delegateEvent($('article'), 'li', 'click', animate);
    //delegateEvent($('form'), 'span', 'click', controlInfo);
}) ();














/*
    // animation handler
    function animate(event) {
        event = $.getEvent(event);
        target = $.getTarget(event);
        var imgWidth = 600,
            num = 4,
            container = $('#container'),
            id = target.getAttribute('id'),
            left = parseInt(window.getComputedStyle(container).left);    // control slide position
            index = Math.abs(parseInt(left / imgWidth));    // control button active style

        // arrow click animation
        function arrowClick(target, id) {
            // circulate
            if (id == 'prev') {
                if (left >= -imgWidth) {
                    left = -imgWidth * (num + 1);
                    index = 5;
                };
                left += imgWidth;
                index--;
            } else if (id == 'next') {
                if (left <= -imgWidth * num) {
                    left = 0;
                    index = 0;
                };
                left -= imgWidth;
                index ++;
            };
            slide(left);
            // change button style
            return activeDot(index);
        };


        if (target.tagName.toLowerCase() == 'a') {
            arrowClick(target, id);
        };
        if (target.className == 'btn') {
            buttonClick(target);
        };

        // container.style.setProperty('left', left + 'px');
        slide(left, direction, loop, duration);
    };


    carousel.timer = setTimeout(function refer() {
        slide(left, direction, loop, duration).call(controlInfo);
        carousel.timer = setTimeout(refer, duration);
    }, duration);


    // setting handler
    function controlInfo(event) {
        event = $.getEvent(event);
        target = $.getTarget(event);
        var direction = $('form').direction.value,
            loop =  $('form').loop.value,
            interval = $('input').value;

        // set timer & autoplay
        if (controlInfo.timer) {
            clearTimeout(controlInfo.timer);
        };
        controlInfo.timer = setTimeout(function refer() {
            slide(left, direction, loop, duration).call(controlInfo);
            controlInfo.timer = setTimeout(refer, interval);
        }, interval);

    };
*/


