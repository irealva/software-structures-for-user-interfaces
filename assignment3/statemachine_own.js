// Provides the state machine descriptions and creates a new game

//First, load in all of our images
var loadCounter = 0;
var totalImg = 0;

var face = new Image();
totalImg++;
face.onload = function() {
    loadCounter++;
}
face.src = 'balloon.png';

var bluebal = new Image();
totalImg++;
bluebal.onload = function() {
    loadCounter++;
}
bluebal.src = 'blueballoon.png';


var cannon = new Image();
totalImg++;
cannon.onload = function() {
    loadCounter++;
}
cannon.src = 'cannon.png';

var cannon_ball = new Image();
totalImg++;
cannon_ball.onload = function() {
    loadCounter++;
}
cannon_ball.src = 'cannon_ball.jpg';

var explosion = new Image();
totalImg++;
explosion.onload = function() {
    loadCounter++;
}
explosion.src = 'explosion.png';

var crosshair = new Image();
totalImg++;
crosshair.onload = function() {
    loadCounter++;
}
crosshair.src = 'crosshair.png';

// function for randomly generating position
// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Score multiplier, so you get bonuses for multiple hits
var multiplier = 1;

//Create our actors and their FSMs
var gun = new Actor({
    height: 50,
    width: 50,
    x: 0,
    y: 250,
    img: cannon
});

var sight = new Actor({
    height: 50,
    width: 50,
    x: 175,
    y: 125,
    img: crosshair
});

var bullet = new Actor({
    height: 25,
    width: 25,
    x: 45,
    y: 251,
    img: null
});

var target1 = new Actor({
    height: 50,
    width: 50,
    x: getRandomIntInclusive(0, 350),
    y: getRandomIntInclusive(0, 200),
    img: face
});

var target2 = new Actor({
    height: 50,
    width: 50,
    x: getRandomIntInclusive(0, 350),
    y: getRandomIntInclusive(0, 200),
    img: face
});

var blueballoon1 = new Actor({
    height: 50,
    width: 50,
    x: getRandomIntInclusive(0, 350),
    y: getRandomIntInclusive(0, 200),
    img: bluebal
});

var blueballoon2 = new Actor({
    height: 50,
    width: 50,
    x: getRandomIntInclusive(0, 350),
    y: getRandomIntInclusive(0, 200),
    img: bluebal
});

var blueballoon3  = new Actor({
    height: 50,
    width: 50,
    x: getRandomIntInclusive(0, 350),
    y: getRandomIntInclusive(0, 200),
    img: bluebal
});

gun.setFSM('start', {
    'start': {}
});

targetFSM = {
    'ready': {
        'message': {
            predicate: function(event, actor) {
                return event.message == "boom"
            },
            actions: [{
                func: Actions.changeImg,
                params: {
                    img: explosion
                }
            }, {
                func: function(event, params, actor) {
                    var score_ele = document.getElementById("score");
                    var score = parseInt(score_ele.innerHTML) + (100 * multiplier);
                    score_ele.innerHTML = "" + score;
                },
            }, {
                func: function(event, params, actor) {
                    multiplier += 1;
                    setTimeout(function() {
                        multiplier -= 1;
                    }, 1000);
                    setTimeout(function() {
                        actor.parent.directDispatch({
                            type: 'tick'
                        }, actor);
                    }, 300);
                }
            }],
            endState: 'exploded'
        }
    },
    'exploded': {
        'tick': {
            actions: [{
                func: Actions.changeImg,
                params: {
                    img: face
                }
            }, {
                func: function(event, params, actor) {
                    var coords = {
                        targetAbsoluteX: getRandomIntInclusive(0, 350),
                        targetAbsoluteY: getRandomIntInclusive(0, 200)
                    };
                    Actions.moveTo(event, coords, actor);
                },
            }],
            endState: 'ready'
        }
    }
};
target1.setFSM('ready', targetFSM);
target2.setFSM('ready', targetFSM);

bullet.setFSM('start', {
    'start': {
        'buttonpress': {
            predicate: function(event, actor) {
                return event.target.id == "fire"
            },
            actions: [{
                func: Actions.changeImg,
                params: {
                    img: cannon_ball
                }
            }, {
                func: Actions.runAnim,
                params: {
                    movingActor: bullet,
                    targetActor: sight,
                    duration: 2000,
                    passOverMessage: "boom",
                    endMessage: "hit"
                }
            }],
            endState: "start",
        },
        "message": {
            predicate: function(event, actor) {
                return event.message == "hit"
            },
            actions: [{
                func: Actions.moveTo,
                params: {
                    targetAbsoluteX: 45,
                    targetAbsoluteY: 251
                }
            }],
            endState: "start",
        },
        "animstart": {
            actions: [{
                func: Actions.changeImg,
                params: {
                    img: cannon_ball
                }
            }],
            endState: "start"
        },
        "animmove": {
            actions: [{
                func: Actions.followEventPosition
            }],
            endState: "start"
        },
        "animend": {
            actions: [{
                func: Actions.followEventPosition
            }, {
                func: Actions.changeImg
            }, {
                func: Actions.moveTo,
                params: {
                    targetAbsoluteX: 45,
                    targetAbsoluteY: 251
                }
            }],
            endState: "start"
        }

    }

});

sight.setFSM('unfocused', {
    'unfocused': {
        "mousedown": {
            actions: [{
                func: Actions.getDragFocus
            }],
            endState: "focused"
        }
    },
    'focused': {
        "dragmove": {
            actions: [{
                func: Actions.followEventPosition
            }],
            endState: "focused"
        },
        "dragend": {
            actions: [{
                func: Actions.dropDragFocus
            }, {
                func: Actions.changeImg,
                params: {
                    img: crosshair
                }
            }],
            endState: "unfocused"
        }
    }
});

targetBalloon = {
    'start': {
        'message': {
            predicate: function(event, actor) {
                return event.message == "boom"
            },
            actions: [{
                func: Actions.changeImg,
                params: {
                    img: explosion
                }
            }, {
                func: function(event, params, actor) {
                    var score_ele = document.getElementById("score");
                    var score = parseInt(score_ele.innerHTML) + (100 * multiplier);
                    score_ele.innerHTML = "" + score;
                },
            }, {
                func: function(event, params, actor) {
                    multiplier += 1;
                    setTimeout(function() {
                        multiplier -= 1;
                    }, 1000);
                    setTimeout(function() {
                        actor.parent.directDispatch({
                            type: 'tick'
                        }, actor);
                    }, 300);
                }
            }],
            endState: 'exploded'
        },
        'getAnimated': {
            actions: [{
                func: Actions.moveRandom,
                params: {
                    targetAbsoluteX: getRandomIntInclusive(0, 350),
                    targetAbsoluteY: getRandomIntInclusive(0, 350)
                }
            },
            {
                func: Actions.changeImg,
                params: {
                    img: bluebal
                }
            }
        ],
            endState: "start",
        }

    },
    'exploded': {
        'tick': {
            actions: [{
                func: Actions.changeImg,
                params: {
                    img: face
                }
            }, {
                func: function(event, params, actor) {
                    var coords = {
                        targetAbsoluteX: getRandomIntInclusive(0, 350),
                        targetAbsoluteY: getRandomIntInclusive(0, 200)
                    };
                    Actions.moveTo(event, coords, actor);
                },
            }],
            endState: 'start'
        }
    }
};

blueballoon1.setFSM('start', targetBalloon);
blueballoon2.setFSM('start', targetBalloon);
blueballoon3.setFSM('start', targetBalloon);


//When the DOM has loaded, actually setup our game
window.onload = function() {
    var game = new Game(document.getElementById("game"));
    game.addActor(target1);
    game.addActor(target2);
    game.addActor(bullet);
    game.addActor(gun);
    game.addActor(sight);
    game.addActor(blueballoon1);
    game.addActor(blueballoon2);
    game.addActor(blueballoon3);

    game.constantAnim.push(blueballoon1);
    game.constantAnim.push(blueballoon2);
    game.constantAnim.push(blueballoon3);

    document.getElementById("fire").addEventListener("click", function(event) {
        event = _.clone(event);
        event.type = "buttonpress";
        game.dispatchToAll(event);
    });

    // Send a getAnimated event every 3 seconds so blue balloons change position at random
    setInterval(() => {
        for (var i = 0; i < game.constantAnim.length ; i++) {
            game.directDispatch({
                type: "getAnimated"
            }, game.constantAnim[i]);
        }
    }, 3000);

    //Wait for all of the imaages to load in before we start the game
    var runGame = function() {
        if (loadCounter >= totalImg)
            game.run();
        else
            setTimeout(function() {
                runGame()
            }, 200);
    }
    runGame();
};
