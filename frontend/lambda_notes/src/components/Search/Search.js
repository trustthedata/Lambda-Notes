import React from "react";

const Search = props => {
  return (
    <div className="row">
      <div className="input-field">
        <label>Search</label>
        <input type="text" value={props.query} onChange={props.updateSearch} />
      </div>
    </div>
  );
};

export default Search;
