import React from "react";
import "./Track.css";

export default class Track extends React.Component {
	/// constructor part///
	constructor(props) {
		super(props);
		this.renderAction = this.renderAction.bind(this);
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
	}
	/// logic part ///
	renderAction() {
		if (this.props.isRemoval) {
			return <button onClick={this.removeTrack}>-</button>;
		} else {
			return <button onClick={this.addTrack}>+</button>;
		}
	}

	addTrack() {
		this.props.onAdd(this.props.track);
	}

	removeTrack() {
		this.props.onRemove(this.props.track);
	}

	/// render part///
	render() {
		return (
			<div className='Track'>
				<div className='Track-information'>
					<h3>{this.props.track.name}</h3>
					<p>
						{this.props.track.artist} | {this.props.track.album}
					</p>
				</div>
				{this.renderAction}
			</div>
		);
	}
}
