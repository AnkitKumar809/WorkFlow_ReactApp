import React, { useState } from "react";
import './styles.css';


function CreateAreaforNote(props) {

    const [isExpanded, setExpanded] = useState(false);
    const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => ({
      ...prevNote,
      [name]: value
    }));
  }
  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    setExpanded(false); // Reset the expansion state after submitting
    event.preventDefault();
  }

  return(
     
    <div>
    <form className="create-note">
      {isExpanded && (
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
      )}

      <textarea
        name="content"
        onClick={() => setExpanded(true)} // Expand when clicked
        onChange={handleChange}
        value={note.content}
        placeholder="Take a note..."
        rows={isExpanded ? 3 : 1}
      />
      
    </form>
  </div>
  );
    
}

export default CreateAreaforNote;