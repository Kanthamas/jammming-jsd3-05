// Get a Spotify user’s access token
// Send a search request to the Spotify API
// Save a user’s playlist to their Spotify account

const usesrAccessToken = "";

export const Spotify = {
	getAccessToken() {
		if (usesrAccessToken) return usesrAccessToken;
	},
};
