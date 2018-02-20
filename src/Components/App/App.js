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
    console.log(searchTerm + '  xxxxxxoxooxoxooxoxoxoxooxoxoxoxox');
    Spotify.search(searchTerm).then(response => {
		    this.setState({
		       "searchResults": response
  		  });
        console.log("Line 33 of App.js says hello:  " + response);
      }
    );
  };

  savePlaylist() {
    console.log("Entered savePlaylist function in App.js");
    let trackURIs = [];
    this.state.playlistTracks.map(
      (x) => trackURIs.push(x.uri)
    );

    console.log("trackURIs are --- " + trackURIs);
    console.log("this.state.playlistName --- " + this.state.playlistName);

    Spotify.savePlaylist(this.state.playlistName, trackURIs);

    this.setState(
      {
        "searchResults": [],
        "playlistName": "New Playlistxxx",
        "playlistTracks": []
      }
    );
  };

  updatePlaylistName(name) {
    console.log("Entered updatePlaylistName - with name  =  " + name);
    this.setState(
      {
        "playlistName": name
      }

    )
  };

  addTrack(track) {
    console.log("Adding track to playlist:  " + JSON.stringify(track));
    console.log("this.state.playlistTracks is: " + this.state.playlistTracks)
    console.log("track.id is: " + track.id)
    let pos = this.state.playlistTracks.indexOf(track);
    console.log("pos is  " + pos)

    if (pos === -1) {
      console.log("About to set state for playlistTracks")
      const newPlaylist = this.state.playlistTracks;
      newPlaylist.push(track);
      this.setState(
        { playlistTracks: newPlaylist }
      );
      console.log("playlistTracks contains: " + JSON.stringify(this.state.playlistTracks));
    };
  };


  removeTrack(track) {
    console.log("track id is: " + track.id);
    console.log("playlistTracks before: " + JSON.stringify(this.state.playlistTracks));
    const newPlaylistTracks = this.state.playlistTracks.filter(
      (x) => { return x.id !== track.id }
    );
    console.log("playlistTracks after: " + JSON.stringify(newPlaylistTracks));
    this.setState(
      { playlistTracks: newPlaylistTracks }
    );
    console.log("playlistTracks before: " + JSON.stringify(this.state.playlistTracks));
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
              onSave={this.savePlaylist}
              isRemoval={true}
            />
          </div>
        </div>
      </div>
    );
  };
};

export default App;
