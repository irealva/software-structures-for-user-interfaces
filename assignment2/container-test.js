window.onload = function () {

    var canvas = document.getElementById("myCanvas");

    var context = canvas.getContext("2d");

    var root = new Doodle(context);

    var rotContainer1 = new Container({
        width: 150,
		height: 150,
		left: 700,
		top: 300,
		fill: "cyan",
		borderWidth: 3,
	});
    var rotContainer2 = new Container({
        width: 100,
		height: 100,
		left: 15,
		top: 5,
		fill: "purple",
		borderWidth: 3,
	});
    var rotTextContainer = new Container({
        left: 45,
        top: 15,
    });
    var rotText = new Text({
        height: 40,
        left: 5,
        font: "32pt Helvetica",
        fill: "white",
        content: "HI"
    });

	var imgFrameFrame = new Container(
	{
		width: 220,
		height: 275,
		fill:"#f5f5f5",
		left: 350,
		top: 100,
		borderWidth: 2
	}
	);
	var imgFrame = new Container(
	{
	width: 200,
	height: 200,
	left: 10,
	top: 10,
	borderWidth: 3
	}
	);

	imgFrame.children.push(
		new DoodleImage({src: "kitty.jpg" })
		);
	imgFrameFrame.children.push(imgFrame);
    rotContainer1.children.push(rotContainer2);
    rotContainer2.children.push(rotTextContainer);
    rotTextContainer.children.push(rotText);

    var multiRotContainer = new Container({
        width: 400,
		height: 400,
		left: 400,
		top: 400,
		borderWidth: 0
	});
    for(var i = 0; i < 10; i++) {
        var newRot = new Container({
            width: i*8 + 30,
		    height: 25,
		    left: 200 - i * 20,
		    top: 200 - i * 20,
		    borderWidth: 4,
            fill: "green",
	    });
        newRot.children.push( new Text({  left: 20, height: 17, fill: "white", content: "" + i }));
        multiRotContainer.children.push(newRot);
    }


    var row = new Row({
        width: 400,
		height: 100,
		left: 20,
		top: 20,
		borderWidth: 0
	});
    (function() {
      var item1 = new Container({
          width: 50,
          height: 80,
          borderWidth: 4,
          fill: "green",
      });
      item1.children.push( new Text({  left: 20, height: 17, fill: "white", content: "1" }));
      row.children.push(item1);
      var item2 = new Container({
          width: 50,
          height: 130,
          borderWidth: 4,
          fill: "green",
      });
      item2.children.push( new Text({  left: 20, top: 40, height: 17, fill: "white", content: "2" }));
      row.children.push(item2);
      var item3 = new Container({
          width: 30,
          height: 40,
          borderWidth: 4,
          fill: "green",
      });
      item3.children.push( new Text({  left: 10, height: 17, fill: "white", content: "3" }));
      row.children.push(item3);
      row.children.push(new Text({ left: 360, top: 440, content: "Om nom nom" }));
    })()

    var column = new Column({
        width: 100,
		height: 400,
		left: 20,
		top: 130,
		borderWidth: 0
	});
    (function() {
      var item1 = new Container({
          width: 70,
          height: 80,
          borderWidth: 4,
          fill: "green",
      });
      item1.children.push( new Text({  left: 30, height: 17, fill: "white", content: "1" }));
      column.children.push(item1);
      var item2 = new Container({
          width: 140,
          height: 80,
          borderWidth: 4,
          fill: "green",
      });
      item2.children.push( new Text({  left: 65, top: 20, height: 17, fill: "white", content: "2" }));
      column.children.push(item2);
      var item3 = new Container({
          width: 50,
          height: 80,
          borderWidth: 4,
          fill: "green",
      });
      item3.children.push( new Text({  left: 20, height: 17, fill: "white", content: "3" }));
      column.children.push(item3);
      column.children.push(new Text({ left: 360, top: 440, content: "Om nom nom" }));
    })()

    var circle = new Circle({
        width: 400,
		height: 400,
		left: 20,
		top: 400,
		borderWidth: 0,
        layoutCenterX: 200,
        layoutCenterY: 200,
        layoutRadius: 100,

	});
    for(var i = 0; i < 8; i++) {
        var newRot = new Container({
            width: 30,
		    height: 30,
		    borderWidth: 4,
            fill: "green",
	    });
        circle.children.push(newRot);
    }
    // root.children = [rotContainer1, multiRotContainer,imgFrameFrame,row,column,circle];
    // root.draw();

    var oval = new OvalClip({
        width: 200,
		height: 150,
		left: 700,
		top: 100,
        borderWidth: 4,
	});

	oval.children.push(
		new DoodleImage({src: "kitty.jpg"})
	);
	oval.children.push(imgFrame);
    root.children = [rotContainer1, multiRotContainer,imgFrameFrame,row,column,circle,oval];
    root.draw();

};
