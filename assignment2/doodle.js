/**
 * Irene Alvarado, SUI Web Lab
 *
 * Doodle Example
 * An example use of the drawing library
 */

var width = window.innerWidth;
var height = window.innerHeight;

/**
 * Draw the doodle once the window loads
 */
window.onload = function() {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var root = new Doodle(context);
    var baseContainer = new Container({
        width: width,
        height: height,
        left: 0,
        top: 0,
        fill: 'transparent'
    });
    var baseContainer2 = new Container({
        width: width,
        height: height,
        left: 0,
        top: 0,
        fill: 'transparent'
    });

    squares(root);
    lines(baseContainer2);
    characters(root);

    var CIRCLES = ranBase(10, 50);
    for (var i = 0; i < CIRCLES; i++) {
        circles(baseContainer);
    }

    root.children.push(baseContainer2);
    root.children.push(baseContainer);
    root.draw();
};

/**
 * Draw random rectangles
 * @param {object} container The container in which to draw the rectangles
 */
var squares = function(container) {
    var STEPS = ranBase(200, 600);

    for (var i = 0; i < STEPS; i++) {
        var con = new Container({
            width: ranBase(20, 160),
            height: ranBase(20, 160),
            left: ran(width),
            top: ran(height),
            fill: ranColor()
        });

        container.children.push(con);
    }
}

/**
 * Draw random characters
 * @param {object} container The container within which to draw
 */
var characters = function(container) {
    var STEPS = ranBase(40, 150);
    for (var i = 0; i < STEPS; i++) {
        var s = String.fromCharCode(0x0000 + Math.random() * 1000);

        var rotText = new Text({
            height: ranBase(10, 40),
            top: ran(height),
            left: ran(width),
            font: "32pt Helvetica",
            fill: ranColor(),
            content: s
        });

        container.children.push(rotText);
    }
}

/**
 * Draw random circles with a random number of rectangles around teh circumference
 * @param {object} container The container within which to draw
 */
var circles = function(container) {
    var circle = new Circle({
        width: width,
        height: height,
        left: ranBase(0, width),
        top: ranBase(0, height),
        layoutCenterX: 0,
        layoutCenterY: 0,
        layoutRadius: ranBase(0, width / 3)
    });

    var STEPS = ranBase(3, 12);
    for (var i = 0; i < STEPS; i++) {
        var newRot = new Container({
            width: ranBase(4, 100),
            height: ranBase(4, 100),
            fill: 'transparent',
            borderWidth: ranBase(2, 8),
            borderColor: ranColor()
        });
        circle.children.push(newRot);
    }

    container.children.push(circle);
}

/**
 * Draw random lines
 * @param {object} container The container within which to draw
 */
var lines = function(container) {
    var STEPS = ranBase(4, 80);
    for (var i = 0; i < STEPS; i++) {
        var line = new Line({
            startX: ranBase(0, width),
            startY: ranBase(0, height),
            endX: ranBase(0, width),
            endY: ranBase(0, height),
            color: ranColor(),
            lineWidth: ranBase(2, 12)
        });

        container.children.push(line);
    }
}

/**
 * Return a random number from 0 to num
 * @param {object} num max random number to return
 */
var ran = function(num) {
    return Math.floor(Math.random() * num);
}

/**
 * Return a random number from base to num
 * @param {object} num max random number to return
 * @param {object} base the min random number to return
 */
var ranBase = function(base, num) {
    return Math.floor(Math.random() * num) + base;
}

/**
 * Return a random hex color
 */
var ranColor = function() {
    var ranColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return ranColor;
}
