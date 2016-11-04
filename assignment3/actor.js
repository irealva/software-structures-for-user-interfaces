/**
 * @constructor
 * @param {props} An object containing properties for the actor
 */
function Actor(props) {
    this.parent = null; //Set in the game.addActor method
    this.height = props.height;
    this.width = props.width;
    this.x = props.x;
    this.y = props.y;
    this.img = props.img;
};

/**
 * Sets the FSM for the particular actor.
 * @param {Object} FSM object as detailed in the instructions
 */
Actor.prototype.setFSM = function(startState, fsm) {
    this.states = fsm;
    this.currentState = fsm[startState];
}

/**
 * Recieves an event from dispatch and transitions the FSM appropriately
 * @param {Event} The event object recieved, which includes certain information
 *  depending on the event type
 * @return {boolean} True if the event was consumed by the actor, false if it
 *  was not consumed
 */
Actor.prototype.deliverEvent = function(event) {
    var type = event.type;

    if (type === 'mouseup') {
        type = 'dragend';
    } else if (type === 'mousemove') {
        type = 'dragmove';
    }

    if (this.currentState.hasOwnProperty(type)) {
        this.makeTransition(event, type);

        return true;
    } else {
        return false;
    }
}

/**
 * Transitions the FMS for a particular transition and event
 * @param {Event} event object recieved, which includes certain information
 *  depending on the event type
 */
Actor.prototype.makeTransition = function(event, transition) {
    var trans = this.currentState[transition];
    var actions = trans.actions;
    var predicate = trans.predicate;

    var cont = true;

    // if there IS a predicate
    if (predicate != undefined) {
        var checkPredicate = predicate(event, this);
        if (checkPredicate === false) {
            cont = false;
        }
    }

    if (cont) {
        for (var i = 0; i < actions.length; i++) {
            var bol = actions[i].func(event, actions[i].params, this);

            if (bol) {
                this.parent.damageActor();
            }
        }

        this.currentState = this.states[trans.endState];
    }
}

/**
 * Draws the actor on the canvas based on its parameters
 * @param {Context} The HTML5 canvas context object to be drawn on.
 */
Actor.prototype.draw = function(context) {
    if (this.img != null) {
        context.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}
