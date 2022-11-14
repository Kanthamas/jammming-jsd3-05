import React from "react";
import "./SearchBar.css";

export default class SearchBar extends React.Component {
	/// constructor part ///
	constructor(props) {
		super(props);
		this.search = this.search.bind(this);
		this.handleTermChange = this.handleTermChange.bind(this);
	}

	/// logic part ///
	search(term) {
		this.props.onSearch(term);
	}

	handleTermChange(event) {
		this.search(event.target.value);
	}

	/// render part ///
	render() {
		return (
			<div className='SearchBar'>
				<input
					placeholder='Enter A Song, Album, or Artist'
					onChange={this.handleTermChange}
				/>
				<button className='SearchButton'>SEARCH</button>
			</div>
		);
	}
}
