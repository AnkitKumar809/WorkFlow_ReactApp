import React, { useState, useCallback, useEffect } from 'react';
import './edit.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import Alltasks from './Alltasks';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';

function EditPage() {
    const { id } = useParams();
    const {User} = useParams();
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState('All');
    const [newWorkflowName, setNewWorkflowName] = useState('');
    const [newWorkflowtitle, setNewWorkflowtitle] = useState('');
    const [showWorkflowModal, setShowWorkflowModal] = useState(false);
   
    const navigate = useNavigate();
      const logOut=(e)=> {
        e.preventDefault()
        navigate('/');
      };
  
  
      const PerformSearch = useCallback((id) => {
        const fetchData = async () => {
          try {
            const res = await axios.get(`http://localhost:8081/alltask/${id}/${User}`);
            console.log(res.data);
            setTasks(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
      }, []);
     console.log(tasks);
      useEffect(() => {
        PerformSearch(id);
      }, [id, PerformSearch]);

      const CreatenewWorkflowName = useCallback(async (title ,content ) => {
        try {
          const res = await axios.post(`http://localhost:8081/tasksAll/${title}/${content}/${id}`);
          console.log('Workflow created successfully:', res.data);
        } catch (err) {
          console.error('Error creating workflow:', err);
        }
      }, []);
       

      const handleCreateWorkflow = () => {
        setShowWorkflowModal(true); 
      };
    
      const handleWorkflowModalClose = () => {
        setShowWorkflowModal(false); 
      };
    
      const handleWorkflowModalSubmit = () => {
        CreatenewWorkflowName(newWorkflowName , newWorkflowtitle);    
        setNewWorkflowName('');
        setNewWorkflowtitle('');
        setShowWorkflowModal(false);
        PerformSearch(search);
      };
      
  return (
    <>
        <div>
     <nav className="navbar navbar-expand-lg navbar-dark color">
            <div className="container-fluid">
                <a className="navbar-brand ml-3" href="#"><h3>FLOWAPP</h3></a>
                <button className="btn bg-white" style={{ color: 'black' }} onClick={logOut}>Logout</button>
            </div>
        </nav>

      <div className="mt-2 p-3 d-flex ">
        <div className="input-group">
          <input className="mr-3 custom-search" type="text" />
        </div>
        <button className="btn btnn d-flex justify-content-center align-items-center mrg " style={{ background: '#7702ba' }}>
          <i className="fas fa-shuffle fa-lg text-center-dark mr-2"></i> Shuffle
        </button>
        <button className="btn btnn btn-danger d-flex justify-content-center align-items-center mrg">
          <i className="fas fa-xmark fa-lg text-dark mr-2"></i> Delete
        </button>
        <button className="btn btnn btn-success d-flex justify-content-center align-items-center mrg" onClick={handleCreateWorkflow}>
          <i className="fas fa-plus fa-lg text-dark mr-2"></i> +AddNotes
        </button>
        <button className="btn btn-primary d-flex justify-content-center align-items-center text-center">Save</button>
      </div>

      <hr className="mt-4 shadow" style={{ backgroundColor: 'black' }} />
      <div>
          <Alltasks taskcontent={tasks}/>
      </div>
       {/* Workflow Modal */}
       <Modal show={showWorkflowModal} onHide={handleWorkflowModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className="form-control"
            type="text"
            placeholder="Title"
            value={newWorkflowName}
            onChange={(e) => setNewWorkflowName(e.target.value)}
          />
          <br />
          <input
            className="form-control"
            type="text"
            placeholder="Content"
            value={newWorkflowtitle}
            onChange={(e) => setNewWorkflowtitle(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleWorkflowModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleWorkflowModalSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End Workflow Modal */}
    </div>
    </>
  )
}

export default EditPage