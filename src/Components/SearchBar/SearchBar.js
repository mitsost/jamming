import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  };

  handleTermChange(e) {
    this.search(e.target.value);
  };

  search(term) {
    this.props.onSearch(term);
  };

  render() {
    return (
      <div className="SearchBar">
        <input onChange={this.handleTermChange} placeholder="Enter a song, album, or artist" />
        <a>SEARCH</a>
      </div>
    );
  };
};

export default SearchBar;
