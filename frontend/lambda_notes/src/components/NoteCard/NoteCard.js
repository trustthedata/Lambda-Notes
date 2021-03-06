import React from "react";
import "../NoteCard/NoteCard.css";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

const NoteCard = ({ note }) => {
  return (
    <Link to={`/note/${note.NoteID}`} style={{ textDecoration: "none" }}>
      <Card className="Card-Style" key={note.NoteID}>
        <CardBody className="Card-Body">
          <CardTitle className="Card-Title">{note.title}</CardTitle>
          <CardText className="Card-Text">{note.content}</CardText>
        </CardBody>
      </Card>
    </Link>
  );
};

export default NoteCard;
