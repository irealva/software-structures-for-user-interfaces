/**
 * Irene Alvarado, SUI Web Lab
 *
 * Doodle Drawing Library
 * A library for drawing shapes, text, and images onto an HTML5 Canvas
 */


 /***********************

Doodle

 ************************/

/**
 * Root container for all drawable elements.
 * @param {object} context Canvas drawing context
 */
function Doodle(context) {
    this.context = context;
    this.children = [];
}

/**
 * Draw function for Doodle
 */
Doodle.prototype.draw = function() {
    for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        child.draw(this.context);
    }
};

/***********************

Drawable

************************/

/**
 * Base class for all drawable objects.
 * @param {object} attrs Inherited attributes for the object
 */
function Drawable(attrs) {
    var dflt = {
        left: 0,
        top: 0,
        visible: true,
        theta: 0,
        scale: 1
    };
    attrs = mergeWithDefault(attrs, dflt);
    this.left = attrs.left;
    this.top = attrs.top;
    this.visible = attrs.visible;
    this.theta = attrs.theta * Math.PI / 180;
    this.scale = attrs.scale;
}

/**
 * Returns calculated width of an object
 */
Drawable.prototype.getWidth = function(context) {
    console.log("ERROR: Calling unimplemented draw method on drawable object.");
    return 0;
}

/**
 * Returns calculated height of an object
 */
Drawable.prototype.getHeight = function(context) {
    console.log("ERROR: Calling unimplemented draw method on drawable object.");
    return 0;
}

/*
 * Summary: Uses the passed in context object (passed in by a doodle object)
 * to draw itself.
 */
Drawable.prototype.draw = function(context) {
    console.log("ERROR: Calling unimplemented draw method on drawable object.");
};

/***********************

Primitive

************************/

/**
 * Base class for objects that cannot contain child objects.
 * @param {object} attrs Inherited attributes for the object
 */
function Primitive(attrs) {
    var dflt = {
        lineWidth: 1,
        color: "black"
    };
    attrs = mergeWithDefault(attrs, dflt);
    Drawable.call(this, attrs);



    this.lineWidth = attrs.lineWidth;
    this.color = attrs.color;
}
Primitive.inheritsFrom(Drawable);

/***********************

Text

************************/

/**
 * Class that represents text
 * @param {object} attrs Inherited attributes for the object
 */
function Text(attrs) {
    var dflt = {
        content: "",
        fill: "black", //color
        font: "Helvetica", //font family
        size: 12, //Size in pt
        bold: false //bold boolean,
    };
    attrs = mergeWithDefault(attrs, dflt);
    Drawable.call(this, attrs);

    this.content = attrs.content;
    this.fill = attrs.fill;
    this.font = attrs.font;
    this.size = attrs.size;
    this.bold = attrs.bold;

    var arr = MeasureText(this.content, this.bold, this.font, this.size);
    this.width = arr[0];
    this.height = arr[1];

    this.left = attrs.left;
    this.top = attrs.top;
}
Text.inheritsFrom(Drawable);

/**
 * Draw function for Text
 * @param {object} context Canvas drawing context
 * @param {string} override Option to determine how to position text.
 * Necessary in case the text object was not defined with a default top value
 */
Text.prototype.draw = function(context, override) {
    var height;
    if (this.top === undefined) {
        height = this.height;
    } else {
        height = this.top + this.height;
    }
    context.font = this.font;
    context.fillStyle = this.fill;
    context.fillText(this.content, this.left, height);
};

/***********************

DoodleImage

************************/

/**
 * Class to draw an image
 * @param {object} attrs Inherited attributes for the object
 */
function DoodleImage(attrs) {
    var dflt = {
        width: -1,
        height: -1,
        src: "",
    };
    attrs = mergeWithDefault(attrs, dflt);
    Drawable.call(this, attrs);

    this.width = attrs.width;
    this.height = attrs.height;
    this.src = attrs.src;
    this.left = attrs.left;
    this.top = attrs.top;
}
DoodleImage.inheritsFrom(Drawable);

/**
 * Draw function for DoodleImage
 * @param {object} context Canvas drawing context
 */
DoodleImage.prototype.draw = function(context) {
    var img = new Image();
    var left = this.left;
    var top = this.top;
    var width = this.width;
    var height = this.height;
    img.onload = function() {
        if (left !== undefined) {
            context.drawImage(img, left, top, width, height);
        } else {
            context.drawImage(img, 0, 0);

        }
    };
    img.src = this.src;
};

/***********************

Line

************************/

/**
 * Class to draw a line
 * @param {object} attrs Inherited attributes for the object
 */
function Line(attrs) {
    var dflt = {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0
    };
    attrs = mergeWithDefault(attrs, dflt);
    Primitive.call(this, attrs);

    this.startX = attrs.startX;
    this.startY = attrs.startY;
    this.endX = attrs.endX;
    this.endY = attrs.endY;
}
Line.inheritsFrom(Primitive);

/**
 * Draw function for Line
 * @param {object} context Canvas drawing context
 */
Line.prototype.draw = function(context) {
    context.beginPath();
    context.moveTo(this.startX, this.startY);
    context.lineTo(this.endX, this.endY);
    context.lineWidth = this.lineWidth;
    context.strokeStyle = this.color;
    context.stroke();
}


/***********************

Rectangle

************************/

/**
 * Class to draw a Rectangle
 * @param {object} attrs Inherited attributes for the object
 */
function Rectangle(attrs) {
    var dflt = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    };
    attrs = mergeWithDefault(attrs, dflt);
    Primitive.call(this, attrs);

    this.color = attrs.color;
    this.height = attrs.height;
    this.left = attrs.left;
    this.lineWidth = attrs.lineWidth;
    this.top = attrs.top;
    this.width = attrs.width;
    this.x = attrs.x;
    this.y = attrs.y;
}
Rectangle.inheritsFrom(Primitive);

/**
 * Draw function for Rectangle
 * @param {object} context Canvas drawing context
 */
Rectangle.prototype.draw = function(context) {
    context.save()
    context.translate(this.left, this.top);

    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.fillStyle = this.color;
    context.fill();
    context.lineWidth = this.lineWidth;
    context.strokeStyle = this.color;
    context.stroke();

    context.restore();
}

/***********************

Container

************************/

/**
 * Class to draw a container
 * @param {object} attrs Inherited attributes for the object
 */
function Container(attrs) {
    var dflt = {
        width: 100,
        height: 100,
        fill: false,
        borderColor: "black",
        borderWidth: 0,
    };
    attrs = mergeWithDefault(attrs, dflt);
    Drawable.call(this, attrs);
    this.width = attrs.width;
    this.height = attrs.height;
    this.fill = attrs.fill;
    this.borderColor = attrs.borderColor;
    this.borderWidth = attrs.borderWidth;
    this.children = [];
}
Container.inheritsFrom(Drawable);

/**
 * Draw function for Container
 * @param {object} context Canvas drawing context
 */
Container.prototype.draw = function(context) {
    if (this.fill === false) {
        context.fillStyle = "transparent";
    } else {
        context.fillStyle = this.fill;
    }
    context.fillRect(this.left, this.top, this.width, this.height);

    if (this.borderWidth !== 0) {
        context.lineWidth = this.borderWidth;
        context.strokeStyle = this.borderColor;
        context.strokeRect(this.left, this.top, this.width, this.height);
    }

    context.save();

    context.translate(this.left, this.top);

    for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        child.draw(context);
    }
    context.restore();
};

/**
 * Returns calculated width of an object
 */
Container.prototype.getWidth = function() {
    return this.width;
}

/**
 * Returns calculated height of an object
 */
Container.prototype.getHeight = function() {
    return this.height;
}

/***********************

Pile

************************/

function Pile(attrs) {
    Container.call(this, attrs);
    //Rest of constructor code here
}
Pile.inheritsFrom(Container);

/***********************

Row

************************/

/**
 * Class to draw a Row
 * @param {object} attrs Inherited attributes for the object
 */
function Row(attrs) {
    Container.call(this, attrs);

    this.width = attrs.width;
    this.height = attrs.height;
    this.left = attrs.left;
    this.top = attrs.top;
    this.borderWidth = attrs.borderWidth;
    this.children = [];

}
Row.inheritsFrom(Container);

/**
 * Draw function for Row
 * @param {object} context Canvas drawing context
 */
Row.prototype.draw = function(context) {
    var width = this.left;

    for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];

        context.save();

        var rem = this.height - child.height;
        rem = rem / 2;

        context.translate(width, rem);
        child.draw(context);
        width = width + child.width;

        context.restore();
    }
};


/***********************

Column

************************/

/**
 * Class to draw a Column
 * @param {object} attrs Inherited attributes for the object
 */
function Column(attrs) {
    Container.call(this, attrs);

    this.width = attrs.width;
    this.height = attrs.height;
    this.left = attrs.left;
    this.top = attrs.top;
    this.borderWidth = attrs.borderWidth;
    this.children = [];

}
Column.inheritsFrom(Container);

/**
 * Draw function for Column
 * @param {object} context Canvas drawing context
 */
Column.prototype.draw = function(context) {
    var height = this.top;

    for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];

        context.save();

        var rem = this.width - child.width;
        rem = rem / 2;

        context.translate(rem, height);

        child.draw(context);
        height = height + child.height;

        context.restore();
    }
};

/***********************

Circle

************************/

/**
 * Class to draw a circle that itself draws shapes on its circumference
 * @param {object} attrs Inherited attributes for the object
 */
function Circle(attrs) {
    Container.call(this, attrs);
    var dflt = {
        layoutCenterX: this.width / 2,
        layoutCenterY: this.height / 2,
        layoutRadius: Math.min(this.width, this.height) / 2 - 30
    };
    attrs = mergeWithDefault(attrs, dflt);

    this.layoutCenterX = attrs.layoutCenterX;
    this.layoutCenterY = attrs.layoutCenterY;
    this.layoutRadius = attrs.layoutRadius;
    this.width = attrs.width;
    this.height = attrs.height;
    this.borderWidth = attrs.borderWidth;
    this.left = attrs.left;
    this.top = attrs.top;
}
Circle.inheritsFrom(Container);

/**
 * Draw function for Circle
 * @param {object} context Canvas drawing context
 */
Circle.prototype.draw = function(context) {
    var centerX = this.left + this.layoutCenterX;
    var centerY = this.top + this.layoutCenterY;

    for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];

        context.save();

        var x = centerX + this.layoutRadius * Math.cos(2 * Math.PI * i / this.children.length);
        var y = centerY + this.layoutRadius * Math.sin(2 * Math.PI * i / this.children.length);

        context.translate(x, y);
        child.draw(context);

        context.restore();
    }
};

/***********************

OvalClip

************************/

/**
 * Class clips an image to an oval
 * @param {object} attrs Inherited attributes for the object
 */
function OvalClip(attrs) {
    Container.call(this, attrs);

    this.borderWidth = attrs.borderWidth;
    this.height = attrs.height;
    this.left = attrs.left;
    this.top = attrs.top;
    this.width = attrs.width;
    this.children = [];
}
OvalClip.inheritsFrom(Container);

/**
 * Draw function for OvalClip
 * @param {object} context Canvas drawing context
 */
OvalClip.prototype.draw = function(context) {
    var centerX = this.left + (this.width / 2);
    var centerY = this.top + (this.height / 2);

    context.beginPath();
    context.ellipse(centerX, centerY, this.width / 2, this.height / 2, 0, 0, 2 * Math.PI);
    context.clip();

    context.translate(this.left, this.top);
    for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        child.draw(context);
    }
    context.restore();



};

/**
 * Returns calculated width of an object
 */
OvalClip.prototype.getWidth = function(context) {
    return this.width;
}

/**
 * Returns calculated height of an object
 */
OvalClip.prototype.getheight = function(context) {
    return this.height;
}

/**
 * Measurement function to measure canvas fonts
 *
 * @return: Array with two values: the first [0] is the width and the seconds [1] is the height
 *          of the font to be measured.
 **/
function MeasureText(text, bold, font, size) {
    // This global variable is used to cache repeated calls with the same arguments
    var str = text + ':' + bold + ':' + font + ':' + size;
    if (typeof(__measuretext_cache__) == 'object' && __measuretext_cache__[str]) {
        return __measuretext_cache__[str];
    }

    var div = document.createElement('DIV');
    div.innerHTML = text;
    div.style.position = 'absolute';
    div.style.top = '-100px';
    div.style.left = '-100px';
    div.style.fontFamily = font;
    div.style.fontWeight = bold ? 'bold' : 'normal';
    div.style.fontSize = size + 'pt';
    document.body.appendChild(div);

    var size = [div.offsetWidth, div.offsetHeight];

    document.body.removeChild(div);

    // Add the sizes to the cache as adding DOM elements is costly and can cause slow downs
    if (typeof(__measuretext_cache__) != 'object') {
        __measuretext_cache__ = [];
    }
    __measuretext_cache__[str] = size;

    return size;
}
