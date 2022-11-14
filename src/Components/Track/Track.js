import React from "react";
import "./Track.css";

export default class Track extends React.Component {
	/// constructor part///
	constructor(props) {
		super(props);
		this.addTrack = this.addTrack.bind(this);
	}
	/// logic part ///
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
				{/* {/* <button class="Track-action"><!-- + or - will go here --></button> */}
			</div>
		);
	}
}
