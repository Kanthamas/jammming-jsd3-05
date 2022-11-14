// Get a Spotify user’s access token
// Send a search request to the Spotify API
// Save a user’s playlist to their Spotify account

const CLIENT_ID = "5d1daae238404fccbba761524037653a";
const REDIRECT_URI = "http://localhost:3000/";

const SPOTIFY_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;

let accessToken;
let expiresIn;

export const Spotify = {
	getAccessToken() {
		//// Case 1 (step 78): if the user’s access token is already set. If it is, return the value saved to access token.

		if (accessToken) return accessToken;

		//// Case 2 (step 79): If the access token is not already set, check the URL to see if it has just been obtained.

		const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
		const urlExpirationIn = window.location.href.match(/expires_in=([^&]*)/);
		if (urlAccessToken && urlExpirationIn) {
			accessToken = urlAccessToken[1];
			expiresIn = urlAccessToken[1];
			window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
			window.history.pushState("Access Token", null, "/");
			return accessToken;
		} else {
			//// Case 3 (step 81-83): if access token variable is empty and is not in the URL

			window.location = SPOTIFY_URL;
		}
	},

	async search(searchTerm) {
		try {
			let searchResultsTracks = await fetch(
				`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
				{
					headers: { Authorization: `Bearer ${accessToken}` },
				}
			)
				.then((response) => response.json())
				.then((jsonResponse) => {
					if (!jsonResponse.tracks) {
						return [];
					}
					return jsonResponse.tracks.items.map((track) => {
						return {
							id: track.id,
							name: track.name,
							artist: track.artist[0].name,
							album: track.album.name,
							uri: track.uri,
						};
					});
				});
		} catch (error) {
			console.error(error);
		}
	},
};
