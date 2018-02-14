import React, { Component } from 'react';
import './App.css';
import SearchBar from '../../Components/SearchBar/SearchBar';
import SearchResults from '../../Components/SearchResults/SearchResults';
import Playlist from '../../Components/Playlist/Playlist';
import Spotify from '../../util/Spotify';

const tt1 = { "name": "Blindness", "artist": "The Fall", "album": "Fall Heads Roll" };
const tt2 = { "name": "Overkill", "artist": "Motorhead", "album": "Overkill" };
const tt3 = { "name": "Spent the Day in Bed", "artist": "Morrissey", "album": "Low in High School" };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "searchResults": [],
      "playlistName": "Mitsos's Faves",
      "playlistTracks": []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  };

  search(searchTerm) {
    console.log(searchTerm);
    Spotify.search(searchTerm).then(
      results => {
		    this.setState({
		       searchResults: results
  		  });
      }
    );
  };

  savePlaylist() {
    let trackURIs = [];
    this.state.playlistTracks.map(
      (x) => trackURIs.push(x.uri)
    );

    Spotify.savePlaylist(this.state.playlistName, trackURIs);

    this.setState(
      {
        "searchResults": [],
        "playlistName": "New Playlist",
        "playlistTracks": []
      }
    );
  };

  updatePlaylistName(name) {
    this.setState(
      "playlistName": name
    )
  };

  addTrack(track) {
    const pos = this.state.playlistTracks.findIndex(x => x.id === track.id);
    if (pos === -1) {
      this.setState(
        this.state.playlistTracks.push(track)
      );
    };
  };

  removeTrack(track) {
    this.setState(
      this.playlistTracks.filter(
        (x) => { return x.id !== track.id }
      )
    );
  };

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
            <Playlist
              onNameChange={this.updatePlaylistName}
              onRemove={this.removeTrack}
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
            />
          </div>
        </div>
      </div>
    );
  };
};

export default App;
