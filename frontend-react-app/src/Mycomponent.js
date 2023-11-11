import React, { useState, useEffect } from 'react';
import { Trash, CheckCircle } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import './style2.css';
import axios from 'axios';

function MyComponent({ userID1,noteItem }) {
  const [workId, setWorkId] = useState();
  const User = userID1;
  const navigate = useNavigate();

  const handleCardDoubleClick = (id) => {
    setWorkId(id);
    navigate(`/edit/${id}/${User}`);
  };

  const handleDelete = async (id) => {
    try {
      // Check if id is truthy before making the request
      if (id) {
        await axios.delete(`http://localhost:8081/workflow/${id}/${User}`);
        window.location.reload();
      } else {
        console.error("Invalid id:", id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        {noteItem.map((noteItem, index) => (
          <div key={index} className="col-md-6 col-xl-3 col-sl-6 mb-4">
            <div
              className="mr-2 p-3 custom-container"
              onDoubleClick={() => handleCardDoubleClick(noteItem.Id)}
            >
              <div className="shadow card-item d-flex justify-content-center flex-row">
                <div>
                  <h4 className="card-title wtitle">{noteItem.WorkflowName}</h4>
                  <div className="d-flex">
                    <p className="mlicon">{noteItem.Status}</p>
                    <i className="fas fa-check-circle fa-2x text-secondary">
                      <CheckCircle size={25} />
                    </i>
                  </div>
                </div>
              </div>
              <div className="delete-container">
                <i className="delete-icon fas fa-trash fa-xl text-white">
                  <Trash size={35} onClick={() => handleDelete(noteItem.Id)} />
                </i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyComponent;
