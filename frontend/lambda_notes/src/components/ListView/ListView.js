import React, { Component } from "react";
import NoteCard from "../NoteCard/NoteCard";
import { connect } from "react-redux";
import { fetchNote, searchNotes } from "../../Actions/index";
import "../ListView/ListView.css";
import Search from "../Search";

class ListView extends Component {
  componentDidMount() {
    this.props.fetchNote();
  }

  searchNotes = query => {
    let filteredNotes = this.props.notes.filter(note => {
      return note.title.includes(query) || note.content.includes(query);
    });
    console.log(filteredNotes);
    this.searchNotes(filteredNotes);
    // this.setState({ notes: filteredNotes });
  };

  render() {
    return (
      <div className="ListView">
        <Search searchNotes={this.searchNotes} />
        <h4 className="List-Header">Your Notes:</h4>
        <div className="note">
          {this.props.notes.map(note => {
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
  { fetchNote, searchNotes }
)(ListView);
