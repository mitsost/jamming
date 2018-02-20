import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track';
import Playlist from '../Playlist/Playlist';

class TrackList extends React.Component {
  render() {
    if (typeof this.props.tracks === 'undefined') {
           let track = [{
               name: 'Search did not return results',
               artist: 'Try some different Search Terms',
               album: ' '
           }];
         };



    return (
      <div className="TrackList">
        {this.props.tracks.map(track => {
          return (
            <Track
              key={track.id}
              track={track}
              onAdd={this.props.onAdd}
              onRemove={this.props.onRemove}
              isRemoval={this.props.isRemoval}
            />
          );
        })}
      </div>
    );
  }
}

/*
class TrackList extends Component {
  render() {

    return (
      <div className="TrackList">
        {this.props.tracks.map(

          (trk) => {

              return (<Track key={trk.id} onRemove={this.props.onRemove} onAdd={this.props.onAdd} track={trk} />);

          }

        )}
      </div>
    );
  }
};
*/
export default TrackList;
