import React from "react";
import "../Search/Search.css";

const Search = props => {
  return (
    <div className="row">
      <div className="input-field">
        <label>Search:</label>
        <input type="text" value={props.query} onChange={props.updateSearch} />
      </div>
    </div>
  );
};

export default Search;
