import React, { Component } from "react";
import NoteCard from "../NoteCard/NoteCard";
import Search from "../Search/Search";
import { connect } from "react-redux";
import { fetchNote, setSearchField } from "../../Actions/index";
import "../ListView/ListView.css";

const mapStateToProps = state => {
  return {
    notes: state.notes.notes,
    fetching: state.notes.fetchingNotes,
    success: state.notes.success,
    error: state.notes.error,
    searchTerm: state.search.searchTerm
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSearch: event => dispatch(setSearchField(event.target.value)),
    fetchNote: () => dispatch(fetchNote())
  };
};

class ListView extends Component {
  componentDidMount() {
    this.props.fetchNote();
  }

  render() {
    const { notes, searchTerm, updateSearch } = this.props;
    let filteredNotes = notes.filter(note => {
      return (
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    return (
      <div className="ListView">
        <Search query={searchTerm} updateSearch={updateSearch} />
        <h4 className="List-Header">Your Notes:</h4>
        <div className="note">
          {filteredNotes.map(note => {
            return <NoteCard key={note.NoteID} note={note} />;
          })}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListView);
