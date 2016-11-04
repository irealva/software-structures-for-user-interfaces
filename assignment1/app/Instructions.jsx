import React, { Component, PropTypes } from 'react';

export default class Instructions extends Component {
	render() {
		return (
			<div className='flex-column instructions'>
				<div className='flex-row padding'>
					To play this sliding puzzle game try to recreate the original duck image by clicking on tiles to slot into the empty space.
				</div>
				<div className='flex-row padding'>
					<button type='button' onClick={this.props.newGame}>New Game</button>
				</div>
				<div className='flex-row padding'>
					Number of moves: {this.props.moves}
				</div>
			</div>
		);
	}
}
