import React, { Component, PropTypes } from 'react';
import Cell from './Cell.jsx';

const SIZE = 4;

function createArray() {
	let imageArray = [];
	for (let i = 0; i < SIZE*SIZE ; i++) {
		imageArray.push(i);
	}

	imageArray = shuffleArray(imageArray);

	return imageArray;
}

let MOVES = [
	[1,4],[0,2,5],[1,3,6],[2,7],
	[0,5,8],[1,4,6,9],[2,5,7,10],[3,6,11],
	[4,9,12],[5,8,10,13],[6,9,11,14],[7,10,15],
	[8,13],[9,12,14],[10,13,15],[11,14]
];

function shuffleArray(array) {
	let zeroPos = array.indexOf(0);
	let steps = Math.floor((Math.random() * 20) + 5);

	let currentArray = array;
	let temp;

	for (let i = 0; i < steps; i++) {
		let validMoves = MOVES[zeroPos];
		let size = validMoves.length;
		let index = Math.floor((Math.random() * size));

		let move = validMoves[index];

		let temp = currentArray[move];
		currentArray[move] = 0;
		currentArray[zeroPos] = temp;
		zeroPos = move;
	}

	return currentArray;
}

export default class Board extends Component {
	constructor(props) {
		super(props);
		let array = createArray();
		this.state = {
			imagesArray: array,
			emptyCell: array.indexOf(0)
		}

		this.gameIteration = 0;
		this.checkMove = this.checkMove.bind(this);
		this.changeOrder = this.changeOrder.bind(this);
		this.onKeyPress = this.onKeyPress.bind(this);
	}

	componentDidMount() {
		document.onkeydown = this.onKeyPress;
	}

	componentWillReceiveProps (nextProps) {
		if (nextProps.reset !== this.gameIteration) {
			this.newGame();
			this.gameIteration = nextProps.reset;
		}
	}

	onKeyPress(e) {
		if (e.key === 'ArrowLeft') {
			this.checkMove(this.state.emptyCell - 1);
		}
		else if (e.key === 'ArrowRight') {
			this.checkMove(this.state.emptyCell + 1);
		}
		else if (e.key === 'ArrowUp') {
			this.checkMove(this.state.emptyCell - 4);
		}
		else if (e.key === 'ArrowDown') {
			this.checkMove(this.state.emptyCell + 4);
		}
	}

 	checkMove(position) {
		if (position >= 0 && position <= 15) {
			if (position + 4 === this.state.emptyCell || position - 4 === this.state.emptyCell) {
				this.changeOrder(position);
			}
			else if (position - 1 === this.state.emptyCell && ([4,8,12].indexOf(position) === -1)) {
				this.changeOrder(position);
			}
			else if (position + 1 === this.state.emptyCell && ([3,7,11].indexOf(position) === -1)) {
				this.changeOrder(position);
			}
		}
	}

	changeOrder(position) {
		this.props.addMove();

		let array = this.state.imagesArray;

		let temp = array[position];
		array[position] = 0;
		array[this.state.emptyCell] = temp;

		this.setState({ emptyCell: position, imagesArray: array });
	}

	newGame() {
		let array = createArray();

		this.setState( {
			imagesArray: array,
			emptyCell: array.indexOf(0)
		});
	}


	render() {
		return (
			<div className='board-row' >
				{this.state.imagesArray.map((result, i) => {
					let result2 = 'images/' + result + '.jpg';
					let divStyle = {
					  order: i
					};

					return (
						<Cell key={i} position={i} src={result2} style={divStyle} checkMove={this.checkMove}></Cell>
					);
				})}
			</div>
		);
	}
}
