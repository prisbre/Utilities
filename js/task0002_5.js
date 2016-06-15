(function () {
    // extend util.js
    $.getEvent = function (event) {
        return event ? event : window.event;
    };
    $.getTarget = function (event) {
        return event.target || event.srcElement;
    };

    // draggable behavior & transfer data
    function dgStart(event) {
        event = $.getEvent(event);
        target = $.getTarget(event);
        if (target.getAttribute('draggable').toLowerCase() == 'true') {
            event.dataTransfer.setData('text', target.id);
            event.dataTransfer.effectAllowed = 'move';
        };
    };
    delegateEvent($('#main'), 'li', 'dragstart', dgStart);

    // drag over behavior
    function dgOver(event) {
        event = $.getEvent(event);
        target = $.getTarget(event);
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };
    delegateEvent($('#main'), 'ul', 'dragover', dgOver);
    delegateEvent($('#main'), 'li', 'dragover', dgOver);

    // drop spot behavior
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
                    list = target.getElementsByTagName('li');console.log(3);
                    console.log(target, list, list.length);
                    break;
                case 'li':
                    list = target.parentNode.getElementsByTagName('li');
                    break;
            };
            console.log(list);
            if (list.length < 6) {
                return true;
            } else {
                return false;
            };
        };

        if (notFull(target, tag)) {
            console.log(2);

            // append element when drop to the end
            if (tag == 'ul') {
                target.appendChild(document.getElementById(data));
                console.log(1);
            // insert element when drop on other element
            } else if (tag == 'li') {
                event.stopPropagation();
                target.parentNode.insertBefore(document.getElementById(data), target);
            };
            event.dataTransfer.clearDate();
        } else {
            return;
        };
    };
    delegateEvent($('#main'), 'ul', 'drop', dropHandler);
    delegateEvent($('#main'), 'li', 'drop', dropHandler);


}) ();



