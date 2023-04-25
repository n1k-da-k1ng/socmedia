import React from 'react';
import './login.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';







export default function Login() {



  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // const res = await axios.post('auth/login', {
      //   username: email,
      //   password: password,
      // });
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
    };
    const response = await fetch('auth/login', requestOptions);
    const data = await response.json();
    console.log(data);
      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('user',JSON.stringify(data.user));
      navigate('/home');
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegister = async () => {
    try {
      // const res = await axios.post('auth/login', {
      //   username: email,
      //   password: password,
      // });
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username:username, email: email, password: password })
    };
    const response = await fetch('auth/register', requestOptions);
    const data = await response.json();
    console.log(data);
      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('user',JSON.stringify(data.user));
      navigate('/home');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='LoginRegWrapper'>
      

      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3"><span className='spanLog'>Log In </span><span className='spanLog'>Sign Up</span></h6>
                <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Log In</h4>
                          <div className="form-group">
                            <input type="email" name="logemail" className="form-style"
                              placeholder="Your Email" id="logemail" autoComplete="off" onChange={(e) => setEmail(e.target.value)}/>
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input type="password" name="logpass" className="form-style"
                              placeholder="Your Password" id="logpass" autoComplete="off" onChange={(e) => setPassword(e.target.value)}/>
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <a onClick={handleLogin} className="btn mt-4">submit</a>
                          <p className="mb-0 mt-4 text-center"><a href="#0" className="link">Forgot your
                              password?</a></p>
                        </div>
                      </div>
                    </div>
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Sign Up</h4>
                          <div className="form-group">
                            <input type="text" name="logname" className="form-style"
                              placeholder="Your Full Name" id="logname" autoComplete="off" onChange={(e) => setUsername(e.target.value)}/>
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input type="email" name="logemail" className="form-style"
                              placeholder="Your Email" id="logemail" autoComplete="off" onChange={(e) => setEmail(e.target.value) }/>
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input type="password" name="logpass" className="form-style"
                              placeholder="Your Password" id="logpass" autoComplete="off" onChange={(e) => setPassword(e.target.value) }/>
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <a onClick={handleRegister} className="btn mt-4">submit</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  }

