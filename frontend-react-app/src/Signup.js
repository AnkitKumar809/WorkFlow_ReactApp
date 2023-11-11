import React from 'react';
import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import SignupValidation from './SignupValidation';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './login.css';

function Signup() {

     
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });
    
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors( SignupValidation(values));
        if(errors.name === '' && errors.email === '' && errors.password === '') {
            axios.post('http://localhost:8081/signup', values)
              .then(res => {
                   console.log(res.data);
                   navigate('/');
               })
              .catch(err => {console.log(err) }); 
        }
    }

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setValues(prev => ({...prev, [name]: [value]}));
    }



  return (

    <>
       <div className='vh-100 '>
       <nav className="navbar navbar-expand-lg navbar-dark color fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand ml-3" href="#"><h3>FLOWAPP</h3></a>
            </div>
        </nav>
       <div className="d-flex justify-content-center align-items-center bg-white vh-100">
    <div className="bg-white p-3 rounded w-30 contbarder">
        <h2>Sign up</h2>
        <form action="" onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor="name">Name</label>
                <input type="text" onChange={handleInput}  className="form-control rounded-2"  name="name" placeholder="Enter Name" />
                {errors.name && <span className="text-danger">{errors.name}</span>}
            </div>
            <div className='mb-3'>
                <label htmlFor="email">Email</label>
                <input type="email" onChange={handleInput} className="form-control rounded-2"  name="email" placeholder="Enter Email" />
                {errors.email && <span className="text-danger">{errors.email}</span>}
            </div>
            <div className='mb-3'>
                <label htmlFor="password">Password</label>
                <input type="password" onChange={handleInput}  className="form-control rounded-2"  name="password" placeholder="Enter Password" />
                {errors.password && <span className="text-danger">{errors.password}</span>}
            </div>
            <button type="submit" className="btn btn-success w-100">Sign up</button>
            <div className="w-100 mt-3">
            <p>You are agree to aour term and policies?<span><Link to="/">Log in </Link></span></p>
            
            </div>
        </form>
    </div>
</div>
       </div>
    </>
  )
}

export default Signup;