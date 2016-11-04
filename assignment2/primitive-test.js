window.onload = function () {
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");

  var doodle = new Doodle(context);

  context.save();
  var sline1 = new Line({
    startX: 100,
    startY: 140,
    endX: 140,
    endY: 100,
    color: "red",
    lineWidth: 10
  });
  var sline2 = new Line({
    startX: 100,
    startY: 140,
    endX: 160,
    endY: 180,
    color: "green",
    lineWidth: 8
  });
  var sline3 = new Line({
    startX: 160,
    startY: 180,
    endX: 100,
    endY: 220,
    color: "blue",
    lineWidth: 8
  });
  doodle.children.push(sline1);
  doodle.children.push(sline2);
  doodle.children.push(sline3);
  var s2line1 = new Line({
    startX: 200,
    startY: 140,
    endX: 240,
    endY: 100,
    color: "red",
    lineWidth: 7
  });
  var s2line2 = new Line({
    startX: 200,
    startY: 140,
    endX: 260,
    endY: 180,
    color: "green",
    lineWidth: 3
  });
  var s2line3 = new Line({
    startX: 260,
    startY: 180,
    endX: 200,
    endY: 220,
    color: "blue",
    lineWidth: 2
  });
  doodle.children.push(s2line1);
  doodle.children.push(s2line2);
  doodle.children.push(s2line3);
  var rect = new Rectangle({
    left: 300,
    top: 100,
    width: 90,
    height: 100,
    color: "orange",
    lineWidth: 20
  });
  var line = new Line({
    startX: 300,
    startY: 100,
    endX: 390,
    endY: 100,
    color: "white",
    lineWidth: 20
  });
  doodle.children.push(rect);
  doodle.children.push(line);
  // Draw the I with three lines.
  var lineI1bg = new Line({
      startX: 410,
      startY: 115,
      endX: 490, endY: 115,
      lineWidth: 10,
      color: "black"
  });
  var lineI2bg = new Line({
      startX: 410,
      startY: 275,
      endX: 490, endY: 275,
      lineWidth: 10,
      color: "black"
  });
  var lineI3bg = new Line({
      startX: 450,
      startY: 115,
      endX: 450, endY: 275,
      lineWidth: 10,
      color: "black"
  });
  var lineI1 = new Line({
      startX: 410,
      startY: 115,
      endX: 490, endY: 115,
      lineWidth: 8,
      color: "red"
  });
  var lineI2 = new Line({
      startX: 410,
      startY: 275,
      endX: 490, endY: 275,
      lineWidth: 8,
      color: "red"
  });
  var lineI3 = new Line({
      startX: 450,
      startY: 115,
      endX: 450, endY: 275,
      lineWidth: 8,
      color: "red"
  });
  doodle.children.push(lineI1bg);
  doodle.children.push(lineI2bg);
  doodle.children.push(lineI3bg);
  doodle.children.push(lineI1);
  doodle.children.push(lineI2);
  doodle.children.push(lineI3);


  var pmline1 = new Line({
      color: "black",
      lineWidth: 4,
      startX: 180,
      startY: 360,
      endX: 216.5,
      endY: 396.5
  });
  var pmline2 = new Line({
      color: "black",
      lineWidth: 4,
      startX: 180,
      startY: 360,
      endX: 216.5,
      endY: 323.5
  });
  var pmline3 = new Line({
      color: "black",
      lineWidth: 4,
      startX: 216.5,
      startY: 323.5,
      endX: 150,
      endY: 323.5
  });
  var pmline4 = new Line({
      color: "black",
      lineWidth: 4,
      startX: 150,
      startY: 396.5,
      endX: 150,
      endY: 323.5
  });
  var pmline5 = new Line({
      color: "black",
      lineWidth: 4,
      startX: 150,
      startY: 396.5,
      endX: 216.5,
      endY: 396.5
  });
  doodle.children.push(pmline1);
  doodle.children.push(pmline2);
  doodle.children.push(pmline3);
  doodle.children.push(pmline4);
  doodle.children.push(pmline5);

  var leftValue = 250;
  for (var i = 0; i < 3; i++) {
      var cherry = new DoodleImage({
          src: "cherry.jpg",
          left: leftValue,
          top: 310,
          width: 100,
          height: 100
      });
      doodle.children.push(cherry);
      leftValue += 110;
  }

  // Write some text.
  var text = new Text({ left: 360, top: 440, content: "Om nom nom" });

  doodle.children.push(text);

  doodle.draw();
};
