/**
 * Created by nikita.puzanenko on 2/24/17.
 */
$(document).ready(function () {
    var element = document.getElementsByClassName('.center'),
        x = 0, y = 0;
    interact('.panel')
        .draggable({
            snap: {
                mode:'anchor',
                targets: [
                    interact.createSnapGrid({x: 10, y: 10})
                ],
                range: 10,
                offset: 'startCoords',
                relativePoints: [{x: .5, y: .5}]
            },
            inertia: false,
            restrict: {
                restriction: element,
                elementRect: {top: 0, left: 0, bottom: 0, right: 0},
                endOnly: true
            }
        })
        .origin('parent')
        .on('dragmove', function (event) {
            x += event.dx;
            y += event.dy;

            event.target.style.webkitTransform =
                event.target.style.transform =
                    'translate(' + x + 'px, ' + y + 'px)';
        });
    interact.on('dragend', function (event) {
        console.log(event.dx, event.dy);
        x=0
        y=0
    });
});