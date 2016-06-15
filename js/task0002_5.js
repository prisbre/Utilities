(function () {
    // extend util.js
    $.getEvent = function (event) {
        return event ? event : window.event;
    };
    $.getTarget = function (event) {
        return event.target || event.srcElement;
    };

    // dragstart handler & transfer data
    function dgStart(event) {
        event = $.getEvent(event);
        target = $.getTarget(event);
        if (target.getAttribute('draggable').toLowerCase() == 'true') {
            event.dataTransfer.setData('text', target.id);
            event.dataTransfer.effectAllowed = 'move';
        };
    };
    delegateEvent($('#main'), 'li', 'dragstart', dgStart);

    // drag over handler
    function dgOver(event) {
        event = $.getEvent(event);
        target = $.getTarget(event);
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };
    delegateEvent($('#main'), 'ul', 'dragover', dgOver);
    delegateEvent($('#main'), 'li', 'dragover', dgOver);

    // drop handler
    function dropHandler(event) {
        event = $.getEvent(event);
        target = $.getTarget(event);
        event.preventDefault();
        var data = event.dataTransfer.getData('text');
        var tag = target.tagName.toLowerCase();

        // check container status, return true when not full
        function notFull(target, tag) {
            var list;
            switch (tag) {
                case 'ul':
                    list = target.getElementsByTagName('li');
                    break;
                case 'li':
                    list = target.parentNode.getElementsByTagName('li');
                    break;
            };
            if (list.length < 6) {
                return true;
            } else {
                return false;
            };
        };

        // DOM manipulate logic
        function manipulate(event, target, tag) {
            var children = target.getElementsByTagName('li');
            var y = event.clientY;
            var height = 57;

            // insert, when drop onto other element
            if (tag == 'li') {
                event.stopPropagation();
                // insert after
                if ((y - target.getBoundingClientRect().top) > height / 2) {
                    target.parentNode.insertBefore(document.getElementById(data), target.nextSibling);

                // insert before
                } else {
                    target.parentNode.insertBefore(document.getElementById(data), target);
                };

            // behave different when drop into space in container
            } else if (tag == 'ul') {
                // append, when drop at the end
                var container = target.getBoundingClientRect();
                var len = children.length;      // element quantity
                if ((y - container.top) > len * height) {
                    target.appendChild(document.getElementById(data));

                // insert, when drop into space between elements
                } else {
                    var index = Math.floor((y - container.top) / height);
                    target.insertBefore(document.getElementById(data), children[index])
                };
            };
            event.dataTransfer.clearDate();
        };

        // when container not full
        if (notFull(target, tag)) {
            manipulate(event, target, tag);

        // when container full
        } else {
            if (tag == 'ul') {
                if (target === document.getElementById(data).parentNode) {
                    manipulate(event, target, tag);
                };
            } else if (tag == 'li') {
                if (target.parentNode === document.getElementById(data).parentNode) {
                    manipulate(event, target, tag);
                };
            };
            return;
        };
    };
    delegateEvent($('#main'), 'ul', 'drop', dropHandler);
    delegateEvent($('#main'), 'li', 'drop', dropHandler);
}) ();