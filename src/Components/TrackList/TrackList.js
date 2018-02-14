import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track';
import Playlist from '../Playlist/Playlist';

class TrackList extends Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map(
          (trk) => {
            return (
              <Track onRemove={this.props.onRemove} onAdd={this.props.onAdd} track={trk} />
            );
          }
        )}
      </div>
    );
  };
};

export default TrackList;
