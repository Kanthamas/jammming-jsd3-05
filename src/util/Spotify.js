const CLIENT_ID = "f9a09e1bf2064dd3ba25ee08516ccb63";
// const REDIRECT_URI = "http://localhost:3000/";
const REDIRECT_URI = "https://jammming-jsd3-05.pages.dev/";

const SPOTIFY_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;

let accessToken;
let expiresIn;

export const Spotify = {
	getAccessToken() {
		if (accessToken) return accessToken;

		const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
		const urlExpirationIn = window.location.href.match(/expires_in=([^&]*)/);
		if (urlAccessToken && urlExpirationIn) {
			accessToken = urlAccessToken[1];

			expiresIn = urlAccessToken[1];
			window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
			window.history.pushState("Access Token", null, "/");
			return accessToken;
		} else {
			window.location = SPOTIFY_URL;
		}
	},

	async search(term) {
		const url = `https://api.spotify.com/v1/search?type=track&q=${term}`;

		accessToken = this.getAccessToken();
		return fetch(url, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
			.then((response) => response.json())
			.then((jsonResponse) => {
				if (!jsonResponse.tracks) return [];
				return jsonResponse.tracks.items.map((track) => {
					return {
						id: track.id,
						name: track.name,
						artist: track.artists[0].name,
						album: track.album.name,
						uri: track.uri,
					};
				});
			})
			.catch((error) => console.error(error));
	},

	async savePlaylist(playlistName, trackURIs) {
		if (!(playlistName && trackURIs)) return;
		let usersID = "";
		accessToken = this.getAccessToken();
		const headers = {
			headers: { Authorization: `Bearer ${accessToken}` },
		};

		const endpointMe = `https://api.spotify.com/v1/me`;
		usersID = await fetch(endpointMe, headers)
			.then((response) => response.json())
			.then((jsonResponse) => jsonResponse.id)
			.catch((error) => console.error(error));

		const endpointPlaylist = `https://api.spotify.com/v1/users/${usersID}/playlists`;
		const requestPOSTPlaylistName = {
			method: "POST",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				// "Content-type": "application/json",
			},
			body: JSON.stringify({
				name: playlistName,
			}),
		};
		let playlistID = await fetch(endpointPlaylist, requestPOSTPlaylistName)
			.then((response) => response.json())
			.then((jsonResponse) => jsonResponse.id)
			.catch((error) => console.error(error));

		const endpointTracks = `https://api.spotify.com/v1/users/${usersID}/playlists/${playlistID}/tracks`;
		const requestPOSTTracks = {
			method: "POST",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				// "Content-type": "application/json",
			},
			body: JSON.stringify({
				uris: trackURIs,
			}),
		};
		await fetch(endpointTracks, requestPOSTTracks)
			.then((response) => console.log("Playlist added successfully"))
			.catch((error) => console.errors(error));
	},
};
