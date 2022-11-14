import "./App.css";
import React from "react";

import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

export default class App extends React.Component {
	/// constructor part ///
	constructor(props) {
		super(props);
		this.state = {
			searchResults: [{}],
			playlistName: "",
			playlistTracks: [{}],
		};

		this.addTrack = this.addTrack.bind(this);
	}

	/// logic part ///
	addTrack(track) {
		if (
			this.state.playlistTracks.find((savedTrack) => savedTrack.id === track.id)
		) {
			return;
		} else {
			this.setState({ playlistTracks: [...this.state.playlistTracks, track] });
		}
	}

	/// render part ///
	render() {
		return (
			<div>
				<h1>
					Ja<span className='highlight'>mmm</span>ing
				</h1>
				<div className='App'>
					{/* <!-- Add a SearchBar component --> */}
					<div className='App-playlist'>
						{/* <!-- Add a SearchResults component --> */}
						<Playlist
							playlistName={this.state.playlistName}
							playlistTracks={this.state.playlistTracks}
						/>
					</div>
				</div>
			</div>
		);
	}
}
