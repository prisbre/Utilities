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
        var container = $('#container'),
        leftNow = parseInt(window.getComputedStyle(container).left);
        return leftNow;
    };


    // slide to target picture
    function slide(leftVal, imgWidth, num) {
        console.log(leftVal);

        // slide transition
        container.style.setProperty('transition-duration', '0.3s');
        container.style.setProperty('transform', 'translate(' + leftVal + 'px' + ', 0px)');
/*
        // circulate
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
    };

    // button click animation
    function buttonClick(target, imgWidth, num) {
        // switch image
        var leftVal = getLeft();
        index = parseInt(target.dataset.index);
        if (leftVal != -imgWidth * (index)) {
            leftVal = -imgWidth * (index);
        };
        console.log(index)
        slide(leftVal, imgWidth, num);

        // toggle button style
        activeDot(index);
    };


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

        // button style: dot toggle
        function activeDot(index) {
            var activeElement = $('#on');
            if (activeElement) {
                $('#on').removeAttribute('id');
            };
            console.log(index, document.getElementsByClassName('btn'));
            document.getElementsByClassName('btn')[index - 1].setAttribute('id', 'on');
        };

        // button click animation
        function buttonClick(target) {
            // switch image
            index = parseInt(target.dataset.index);
            if (leftVal != -imgWidth * (index)) {
                leftVal = -imgWidth * (index);
            };

            // toggle button style
            activeDot(index);
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


