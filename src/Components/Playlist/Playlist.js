import React from "react";
import "./Playlist.css";
import TrackList from "../TrackList/TrackList";
export default class Playlist extends React.Component {
	/// constructor part ///
	constructor(props) {
		super(props);
		this.handleNameChange = this.handleNameChange.bind(this);
	}

	/// logic part ///
	handleNameChange(event) {
		this.props.handleNameChange(event.target.value);
	}

	/// render part ///
	render() {
		return (
			<div className='Playlist'>
				<input value='New Playlist' onChange={this.handleNameChange} />
				<TrackList
					tracks={this.props.playlistTracks}
					onRemove={this.props.onRemove}
					isRemove={true}
				/>
				<button className='Playlist-save' onClick={this.props.onSave}>
					SAVE TO SPOTIFY
				</button>
			</div>
		);
	}
}
