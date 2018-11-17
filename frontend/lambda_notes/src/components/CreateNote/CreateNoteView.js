import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addNote } from "../../Actions/index";
import "../CreateNote/CreateNoteView.css";
import AuthService from "../../Auth/authservice";
import { WithContext as ReactTags } from "react-tag-input";

const Auth = new AuthService();
const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class CreateNoteView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      user: Auth.getProfile().user_id,
      tags: []
    };
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitInputChange = () => {
    const { title, content, user, tags } = this.state;
    let note = {
      title: title,
      content: content,
      user: user,
      tags: tags.map(tag => tag.text)
    };
    this.props.addNote(note);
    this.setState({ title: "", content: "", tags: [] });
  };

  handleDelete = i => {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i)
    });
  };

  handleAddition = tag => {
    this.setState(state => ({ tags: [...state.tags, tag] }));
  };

  render() {
    const { tags } = this.state;
    return (
      <div className="NoteView">
        <p className="CreateNote-Header">Create New Note:</p>
        <form className="Form">
          <input
            className="TitleInput"
            type="text"
            placeholder="Note Title"
            name="title"
            value={this.state.title}
            onChange={this.handleInputChange}
          />
          <p>
            <textarea
              className="ContentInput"
              row="50"
              cols="50"
              placeholder="Note Content"
              name="content"
              value={this.state.content}
              onChange={this.handleInputChange}
            />
          </p>
          <ReactTags
            tags={tags}
            handleDelete={this.handleDelete}
            handleAddition={this.handleAddition}
            delimiters={delimiters}
          />
          <Link to="/home">
            <button
              onClick={this.submitInputChange}
              className="CreateViewButton"
            >
              Save
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { addNote }
)(CreateNoteView);
