import "./App.css";
import React from "react";

export default class App extends React.Component {
	renders() {
		return (
			<div>
				<h1>
					Ja<span className='highlight'>mmm</span>ing
				</h1>
				<div className='App'>
					{/* <!-- Add a SearchBar component --> */}
					<div className='App-playlist'>
						{/* <!-- Add a SearchResults component --> */}
						{/* <!-- Add a Playlist component --> */}
					</div>
				</div>
			</div>
		);
	}
}
