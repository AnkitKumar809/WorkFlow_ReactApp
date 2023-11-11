import React from 'react'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link , useNavigate } from 'react-router-dom';
import LoginValidation from './LoginValidation';
import axios from 'axios';
import './login.css';

function Login() {
  
    const [message, setMessage] = useState(false);
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors( LoginValidation(values));
        if(errors.email === '' && errors.password === '') {
            axios.post('http://localhost:8081/login', values)
              .then(res => {
                  console.log(res.data);
                  if(res.data.message === "successfully"){
                    console.log("User logged in successfully")
                    navigate(`/home/${res.data.id}`);
                  }else{
                    console.log("User logged in failed")
                    setMessage(true);
                     navigate('/');
                  }
                  
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
     <div className=" d-flex align-items-center justify-content-center vh-100 bg-white ">
        <div className="bg-white p-3 rounded w-30 contbarder shadow">
            <h2>Log in</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={handleInput} className="form-control rounded-2"  name="email" placeholder="Enter Username" />
                    {errors.email && <span className="text-danger">{errors.email}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={handleInput} className="form-control rounded-2"  name="password" placeholder="Enter Username" />
                    {errors.password && <span className="text-danger">{errors.password}</span>}
                </div>
                <div className='mb-3'>
                     {message && <span className="text-danger">Invalid User Email or Password</span>} 
                </div>
                <button type="submit" className="btn btn-success w-100">Log in</button>
                <div className="w-100 mt-3">
                <p>You are agree to aour term and policies?<span><Link to="/signup">Create Account</Link></span></p>
                
                </div>
            </form>
        </div>
    </div>
        </div>
    </>
    
  )
}

export default Login;