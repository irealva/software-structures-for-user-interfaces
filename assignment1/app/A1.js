import './style.scss';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Board from './Board.jsx';
import Instructions from './Instructions.jsx';

export default class Game extends Component {
    constructor(props) {
		super(props);
        this.state = {
            reset: 0,
            moves: 0
        }
        this.newGame = this.newGame.bind(this);
        this.addMove = this.addMove.bind(this);
	}

    addMove() {
        let num = this.state.moves + 1;
        this.setState({ moves: num });
    }

    newGame() {
        let num = this.state.reset + 1;
        this.setState({ reset: num, moves: 0 });
    }

	render() {
		return (
			<div className='flex-column'>
                <div className='flex-row'>
                    <div className='title'>Sliding Puzzle Game</div>
                </div>

                <div className='flex-row'>
                    <Board reset={this.state.reset} addMove={this.addMove}/>
                    <Instructions newGame={this.newGame} moves={this.state.moves}/>
                </div>
			</div>
		);
	}
}

const gameEl = document.getElementById('game');
ReactDOM.render(<Game />, gameEl);
