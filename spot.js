getAccessToken() {
    if (access_token) {
      console.log("123");
      return(access_token);
    };
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      access_token = accessTokenMatch[1];
      console.log(access_token);
      expiration=expiresInMatch[1];
      window.setTimeout(function () {
        access_token = "";
      }, expiration * 1000);
      window.history.pushState("Access Token", null, '/');
      return access_token;
    } else {
      let token_url = "https://accounts.spotify.com/authorize?client_id=" + client_id + "&response_type=token&scope=playlist-modify-public&redirect_uri=" + redirect_uri;
      //window.location(token_url);
      window.location = token_url;
    }
  },
