import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import A from './Img/img1.webp';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Perform sign-up logic (can be API call to create user)
    // Here you would typically send username, email, and password to your server

    // For demonstration purposes, just navigate to login page after sign-up
    navigate('/login');
  };

  return (
    <div className="container my-5">
      <div className="card">
        <div className="row g-0">
          <div className="col-md-6">
            <img 
              src={A} 
              alt="signup form" 
              className="img-fluid rounded-start w-100" 
            />
          </div>
          <div className="col-md-6">
            <div className="card-body d-flex flex-column">
              <div className="d-flex flex-row mt-2">
                <i className="bi bi-cube-fill text-warning fs-1 me-3"></i>
                <h1 className="fw-bold mb-0">
                  <span className="text-danger">CIBC</span> Bank
                </h1>
              </div>
              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>
                SignUp your account
              </h5>
              <form onSubmit={handleSignUp}>
                <div className="mb-4">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input 
                    type="text" 
                    id="username" 
                    className="form-control form-control-lg"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="form-control form-control-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input 
                    type="password" 
                    id="password" 
                    className="form-control form-control-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <button 
                  type="submit" 
                  className="btn btn-dark btn-lg mb-4 px-5"
                >
                  Sign Up
                </button>
              </form>
              <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                Already have an account? <a href="/login" style={{ color: '#393f81' }}>Login here</a>
              </p>
              <div className="d-flex flex-row justify-content-start">
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
