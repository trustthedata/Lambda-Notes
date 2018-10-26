import React, { Component } from "react";

class Search extends Component {
  handleSearch = event => {
    this.props.searchNotes(event.target.value);
  };

  render() {
    return (
      <div className="row">
        <div className="input-field">
          <label>Search</label>
          <input type="text" onKeyUp={this.handleSearch} />
        </div>
      </div>
    );
  }
}

export default Search;
