import React, { Component } from "react";
import { connect } from "react-redux";
import { editNote } from "../../Actions/index";
import { Link } from "react-router-dom";
import "../CreateNote/CreateNoteView.css";
import AuthService from "../../Auth/authservice";

const Auth = new AuthService();

class EditNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      user: Auth.getProfile().user_id
    };
  }

  matchedNote = this.props.notes.filter(note => {
    return note.NoteID === this.props.match.params.id;
  })[0];

  componentDidMount() {
    this.setState({
      title: this.matchedNote.title,
      content: this.matchedNote.content
    });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleUpdate = () => {
    const id = this.props.match.params.id;
    const editedNote = this.state;
    this.props.editNote(id, editedNote);
  };

  render() {
    return (
      <div className="NoteView">
        <p className="CreateNote-Header">Edit Note:</p>
        <form className="Form">
          <input
            className="TitleInput"
            type="text"
            placeholder="Note Title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <p>
            <textarea
              className="ContentInput"
              row="50"
              cols="50"
              placeholder="Note Content"
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
            />
          </p>
          <Link to="/home">
            <button className="CreateViewButton" onClick={this.handleUpdate}>
              Update
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes.notes
  };
};

export default connect(
  mapStateToProps,
  { editNote }
)(EditNote);
