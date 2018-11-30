import React, { Component } from "react";
import NoteCard from "../NoteCard/NoteCard";
import Search from "../Search/Search";
import { connect } from "react-redux";
import { fetchNote } from "../../Actions/index";
import "../ListView/ListView.css";

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    };
  }

  componentDidMount() {
    this.props.fetchNote();
  }

  updateSearch = event => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    const { searchTerm } = this.state;
    let filteredNotes = this.props.notes.filter(note => {
      return (
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    return (
      <div className="ListView">
        <Search
          query={this.state.searchTerm}
          updateSearch={this.updateSearch}
        />
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

const mapStateToProps = state => {
  return {
    notes: state.notes.notes,
    fetching: state.fetchingNotes,
    success: state.success,
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  { fetchNote }
)(ListView);
