import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "term": ""
    }
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  handleTermChange(e) {
    this.setState(
      {
        "term": e.target.value
      }
    )
    //this.search(e.target.value);
  };

  search(term) {
    console.log("Searchbar search function -- term is: " + this.state.term )
    this.props.onSearch(this.state.term);
  };

  render() {
    console.log("123123   " + this.state.term);
    return (
      <div className="SearchBar">
        <input placeholder="Enter a song, album, or artist" onChange={this.handleTermChange} />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  };
};

export default SearchBar;
