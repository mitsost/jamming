import React, { Component } from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';
import App from '../App/App';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.handleNameChange=this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    this.props.onNameChange(e.target.value)
  }

  render() {

    return (
      <div className="Playlist">
        <input onChange={this.handleNameChange} defaultValue="New Playlist Name"/>
        <TrackList
          onRemove={this.props.onRemove}
          playlistName={this.props.playlistName}
          tracks={this.props.playlistTracks}
          isRemoval={true}
        />
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  };
};

export default Playlist;
