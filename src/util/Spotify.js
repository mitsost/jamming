const client_id = "6b5cafe7221248eaa29df5ccf0cc2d9c";
const redirect_uri = "http://localhost:3000"
let access_token = "";
let expiration = "";

let Spotify = {

  getAccessToken() {
    if (access_token) {
      console.log("123");
      return(access_token);
    };
    access_token = window.location.href.match(/access_token=([^&]*)/)[1];
    expiration = window.location.href.match(/expires_in=([^&]*)/)[1];
    console.log(access_token);

    if (access_token && expiration) {
      window.setTimeout(function () {
        access_token = "";
      }, expiration * 1000);
      window.history.pushState("Access Token", null, '/');
    } else {
      let token_url = "https://accounts.spotify.com/authorize?client_id=" + client_id + "&response_type=token&scope=playlist-modify-public&redirect_uri=" + redirect_uri;
      window.location(token_url);
    }
  },

  search(term) {
    const access_token = Spotify.getAccessToken();
    const search_url = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    const headers = { "headers": { "Authorization": `Bearer ${access_token}` } };
    let tracks = [];

    fetch(search_url, headers).then(
      response => {
        return response.json();
      }
    ).then(
      jsonResponse => {
        jsonResponse.map(
          track => {
            tracks.push(
              {
                "id": track.id,
                "name": track.name,
                "artist": track.artist[0].name,
                "album": track.album.name,
                "uri": track.uri
              }
            );
          }
        );
      }
    );
    return tracks;
  },

  savePlaylist(playlistName, trackURIs) {
    if (!(playlistName && trackURIs)) {
      return;
    }


    let access_token = Spotify.getAccessToken();
    let headers = {
      "Authorization": "Bearer " + access_token
    };
    let userID = "";
    let playlistID="";

    fetch('https://api.spotify.com/v1/me', { "headers": headers }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!')
    },
      networkError => console.log(networkError.message)
    ).then(jsonResponse => { userID = jsonResponse.id } );

    const newPlaylistURL = "https://api.spotify.com/v1/users/" + userID + "/playlists"

    fetch(newPlaylistURL, {
      "headers": headers,
      "method": "POST",
      "body": JSON.stringify({ "name": playlistName })
    }).then(
      (response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request failed!');
      },
      (networkError) => { console.log(networkError.message) }
    ).then(
      (jsonResponse) => { playlistID = jsonResponse.id }
    );
  }
};



export default Spotify;
