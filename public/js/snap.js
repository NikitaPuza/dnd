$(document).ready(function() {
    $('.edit-position').click(function () {
        $('.edit-position').toggleClass('hidden')
        $('.save-position').toggleClass('hidden')
        interact('.panel-default')
            .draggable({
                snap: {
                    targets: [
                        interact.createSnapGrid({x: 20, y: 20})
                    ],
                    range: Infinity,
                    relativePoints: [{x: 0, y: 0}]
                },
                restrict: {
                    restriction: "parent",
                    endOnly: true,
                    elementRect: {top: 0, left: 0, bottom: 1, right: 1}
                },
                autoScroll: true,

                onmove: dragMoveListener,
            });

        function dragMoveListener(event) {
            var target = event.target,
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            target.style.webkitTransform =
                target.style.transform =
                    'translate(' + x + 'px, ' + y + 'px)';

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        }

        window.dragMoveListener = dragMoveListener;
    });
    $('.save-position').click(function () {
        $('.save-position').toggleClass('hidden')
        $('.edit-position').toggleClass('hidden')
        var objectID = $('h1').text()
        var save = "/save"
        var postsave = objectID + save
        console.log(postsave);
        // Saving HP
        var hpstyle = $('.hp-panel').attr('style')
        var hpdatax = $('.hp-panel').attr('data-x')
        var hpdatay = $('.hp-panel').attr('data-y')
        // Saving Attibutes
        var atrstyle = $('.atr-panel').attr('style')
        var atrdatax = $('.atr-panel').attr('data-x')
        var atrdatay = $('.atr-panel').attr('data-y')
        //Saving Saving throws
        var ststyle = $('.st-panel').attr('style')
        var stdatax = $('.st-panel').attr('data-x')
        var stdatay = $('.st-panel').attr('data-y')
        //Saving main info
        var infostyle = $('.info-panel').attr('style')
        var infodatax = $('.info-panel').attr('data-x')
        var infodatay = $('.info-panel').attr('data-y')
        //Saving Skills
        var skillsstyle = $('.skills-panel').attr('style')
        var skillsdatax = $('.skills-panel').attr('data-x')
        var skillsdatay = $('.skills-panel').attr('data-y')
        $.ajax({
            method: 'POST',
            url: postsave,
            data: {
                "hpstyle": hpstyle,
                "hpdatax": hpdatax,
                "hpdatay": hpdatay,
                "atrstyle": atrstyle,
                "atrdatax": atrdatax,
                "atrdatay": atrdatay,
                "ststyle": ststyle,
                "stdatax": stdatax,
                "stdatay": stdatay,
                "infostyle": infostyle,
                "infodatax": infodatax,
                "infodatay": infodatay,
                "skillsstyle": skillsstyle,
                "skillsdatax": skillsdatax,
                "skillsdatay": skillsdatay
            }
        });

        interact('.panel-default')
            .draggable(false)
    });
});