import React, { useState, useCallback, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Dropdown } from 'semantic-ui-react';
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';
import MyComponent from './Mycomponent';
import { useNavigate } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';

function Header({user}) {
  const userId = user;
  const navigate = useNavigate();
  const [search, setSearch] = useState('All');
  const [searchinput, setSearchinput] = useState('');
  const [result, setResult] = useState([]);
  const [newWorkflowName, setNewWorkflowName] = useState('');
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);

  const logOut = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const [ids, setIds] = useState();

  function reWorkId(id) {
    setIds(id);
    console.log(ids);
  }

  const filterOptions = [
    { key: 'all', text: 'All', value: 'All' },
    { key: 'completed', text: 'Completed', value: 'Completed' },
    { key: 'pending', text: 'Pending', value: 'Pending' },
  ];

  const handleSearch = (val) => {
    setSearch(val);
    PerformSearch(val);
  };

  const PerformSearch = useCallback((searchTerm) => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/workflow/${searchTerm}/${userId}`);
        setResult(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const CreatenewWorkflowName = useCallback(async (name) => {
    try {
      const res = await axios.post(`http://localhost:8081/workflow/${name}/${userId}`);
      console.log('Workflow created successfully:', res.data);
    } catch (err) {
      console.error('Error creating workflow:', err);
    }
  }, []);
   

  useEffect(() => {
    PerformSearch(search ,);
  }, [search, PerformSearch]);

  const handleCreateWorkflow = () => {
    setShowWorkflowModal(true); 
  };

  const handleWorkflowModalClose = () => {
    setShowWorkflowModal(false); 
  };

  const handleWorkflowModalSubmit = () => {
    CreatenewWorkflowName(newWorkflowName);    
    setNewWorkflowName('');
    setShowWorkflowModal(false);
    PerformSearch(search);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark color">
        <div className="container-fluid">
          <a className="navbar-brand ml-3" href="/">
            <h3>FLOWAPP</h3>
          </a>
          <button className="btn bg-white" onClick={logOut}>
            Logout
          </button>
        </div>
      </nav>
      <hr />
      <div className="mt-2 p-3 d-flex">
        <div className="main-box">
          <div className='Search-box'>
            <form>
              <div className="input-group">
                <input
                  className="marg custom-search rounded-5 pl-10"
                  type="search"
                  placeholder="Search Workflows"
                  aria-label="Search"
                  name="search"
                  onChange={(e) => setSearchinput(e.target.value)}
                />
                <div className="input-group-append">
                  <Dropdown
                    className='dropdown_options'
                    placeholder="Filter By"
                    fluid
                    search
                    selection
                    value={search}
                    options={filterOptions}
                    onChange={(e, data) => handleSearch(data.value)}
                  />
                </div>
              </div>
            </form>
          </div>
          <button
            className="btn btn-success filter-button crlef"
            onClick={handleCreateWorkflow}
          >
            + Create WorkFlow
          </button>
        </div>
      </div>
      <hr />
      <MyComponent
        userID1 = {userId}
        noteItem={searchinput
          ? result.filter((item) =>
              item.WorkflowName &&
              item.WorkflowName.toLowerCase().includes(searchinput.toLowerCase())
            )
          : result.length > 0
          ? result
          : [{ WorkflowName: 'No Matches Found' }]
        }
      />
        {/* Workflow Modal */}
        <Modal show={showWorkflowModal} onHide={handleWorkflowModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Workflow Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className="form-control"
            type="text"
            placeholder="Workflow Name"
            value={newWorkflowName}
            onChange={(e) => setNewWorkflowName(e.target.value)}
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
    </>
  );
}

export default Header;
