import { shallow } from "enzyme";
import NoteCard from "./NoteCard";
import React from "react";

it("expect to render NoteCard Component", () => {
  const mockNote = {
    NoteID: 1,
    title: "Mary had a little lamb",
    content: "His fleece was white as snow"
  };
  expect(shallow(<NoteCard note={mockNote} />).length).toEqual(1);
});
