import React, { Component, PropTypes } from 'react';

export default class Cell extends Component {
	constructor(props) {
		super(props);
		this.state = {
			position: this.props.position
		}

		this.onClick = this.onClick.bind(this);
	}


	onClick() {
		this.props.checkMove(this.state.position);
	}

	render() {
		// console.log("rerender");
		return (
			<img ref='cell' src={this.props.src} alt="image1" className='cell' onClick={this.onClick}></img>
		);
	}
}
