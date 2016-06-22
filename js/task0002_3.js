(function carousel() {
    // extend util.js
    $.getEvent = function (event) {
        return event ? event : window.event;
    };
    $.getTarget = function (event) {
        return event.target || event.srcElement;
    };

    // get left value of current picture
    function getLeft(){
        var matrix = window.getComputedStyle($('#container')).getPropertyValue('transform'),
            data = /\((.+)\)/.exec(matrix)[0],
            leftNow = parseInt(data.split(',')[4]);
        console.log('gl', leftNow);
        return leftNow;
    };

    // slide to target picture
    function slide(leftVal) {
        $('#container').style.setProperty('transform', 'translate(' + leftVal + 'px, 0px)');
        return;
    };

/*        // circulate
        var circulate = true;
        if (circulate) {
            if (leftVal > -imgWidth) {
                leftVal = -imgWidth * (num - 1);
            };
            if (leftVal < -imgWidth * (num + 1)) {
                leftVal = 0;
            };
            container.style.setProperty('transform', 'translate(' + leftVal + 'px' + ', 0px)');
            // container.style.setProperty('left', leftVal + 'px');
        };*/



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
        var leftVal = getLeft(),
            index = parseInt(target.dataset.index);
        if (leftVal != -imgWidth * index) {
            leftVal = -imgWidth * index;
        } else {
            return;
        }
        console.log('bc', leftVal, index)
        slide(leftVal);

        // toggle button style
        return activeDot(index);
    };

    // arrow click animation
    function arrowClick(target, imgWidth, num) {
        // circulate
        var id = target.getAttribute('id'),
            leftVal = getLeft(),
            index = Math.abs(parseInt(leftVal / imgWidth));
        console.log('s', index, leftVal)
        switch (id) {
            case 'prev':
                if (leftVal = 0) {
                    leftVal = -imgWidth * num;
                    index = 4;
                };
                leftVal += imgWidth;
                index--;
                break;
            case 'next':
                if (leftVal = -imgWidth * (num + 1)) {
                    leftVal = -imgWidth * 1;
                    index = 1;
                };
                leftVal -= imgWidth;
                index ++;
                break;
        };
        console.log('s', index, leftVal);
        slide(leftVal);

        // change button style
        return activeDot(index);
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
            leftVal = parseInt(window.getComputedStyle(container).left);    // control slide position
            index = Math.abs(parseInt(leftVal / imgWidth));    // control button active style

        // arrow click animation
        function arrowClick(target, id) {
            // circulate
            if (id == 'prev') {
                if (leftVal >= -imgWidth) {
                    leftVal = -imgWidth * (num + 1);
                    index = 5;
                };
                leftVal += imgWidth;
                index--;
            } else if (id == 'next') {
                if (leftVal <= -imgWidth * num) {
                    leftVal = 0;
                    index = 0;
                };
                leftVal -= imgWidth;
                index ++;
            };
            slide(leftVal);
            // change button style
            return activeDot(index);
        };


        if (target.tagName.toLowerCase() == 'a') {
            arrowClick(target, id);
        };
        if (target.className == 'btn') {
            buttonClick(target);
        };

        // container.style.setProperty('left', leftVal + 'px');
        slide(leftVal, direction, loop, duration);
    };


    carousel.timer = setTimeout(function refer() {
        slide(leftVal, direction, loop, duration).call(controlInfo);
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
            slide(leftVal, direction, loop, duration).call(controlInfo);
            controlInfo.timer = setTimeout(refer, interval);
        }, interval);

    };
*/


