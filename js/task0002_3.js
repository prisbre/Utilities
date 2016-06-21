(function carousel() {
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

        container.style.setProperty('left', leftVal + 'px');
    };

    // autoplay animation
    function slide(imgWidth, num, direction, loop, interval) {
    };

    // carousel setting value
    function controlInfo(event) {
        event = $.getEvent(event);
        target = $.getTarget(event);
        var direction = $('form').direction.value,
            loop =  $('form').loop.value,
            interval = $('input').value;

        return slide(imgWidth, num, direction, loop, interval);

    };
/*
    // slide setting
    //,





    delegateEvent($('article'), 'a', 'click', animate);
    delegateEvent($('article'), 'li', 'click', animate);
    delegateEvent($('form'), 'span', 'click', controlInfo);
}) ();



// carousel.timer = setTimeout(interval)