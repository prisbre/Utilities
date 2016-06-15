(function () {
    // extend util.js
    $.getEvent = function (event) {
        return event ? event : window.event;
    };
    $.getTarget = function (event) {
        return event.target || event.srcElement;
    };

    // draggable element behavior & transfer data
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
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };
    delegateEvent($('#main'), 'ul', 'dragover', dgOver);

    // drop spot behavior
    function dropHandler(event) {
        event = $.getEvent(event);
        target = $.getTarget(event);
        event.preventDefault();
        var data = event.dataTransfer.getData('text');
        console.log(data);
        target.appendChild(document.getElementById(data));
        event.dataTransfer.clearDate();
    };
    delegateEvent($('#main'), 'ul', 'drop', dropHandler);


}) ();



