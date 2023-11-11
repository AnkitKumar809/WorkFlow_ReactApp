import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'react-bootstrap-icons';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './edit.css';

function Alltasks({ taskcontent }) {
  const tasks = taskcontent;

  return (
    <div className="d-flex justify-content-center align-items-center m-5 row" id="Box-Container">
      {tasks.map((task, index) => (
        <div key={index} className="mr-5 p-3 col-md-6 col-lg-4 col-xl-3 col-sm-8 mb-4 custom-container d-flex flex-wrap">
          <div className="shadow card-item d-flex flex-row">
            <div>
              <input className="mb-4 bod" type="text" value={task.title} readOnly />
              <textarea className="form-control" rows="12" value={task.Content} readOnly />
            </div>
          </div>
          <div className="delete-container">
            <i className="ml-5 fas fa-check-circle fa-2x text-primary">
              <CheckCircle size={25} />
            </i>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Alltasks;
