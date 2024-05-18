import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import A from './Img/img1.webp';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Placeholder for login logic
    try {
      // Simulating login process with a delay
      // Replace this with your actual login logic (e.g., API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // If login is successful, navigate to home page
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error.message);
      // Handle login failure (e.g., show error message)
    }
  };

  return (
    <div className="container my-5">
      <div className="card">
        <div className="row g-0">
          <div className="col-md-6">
            <img 
              src={A} 
              alt="login form" 
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
                Sign into your account
              </h5>
              <form onSubmit={handleLogin}>
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
                <button 
                  type="submit" 
                  className="btn btn-dark btn-lg mb-4 px-5"
                >
                  Login
                </button>
              </form>
              <a className="small text-muted" href="#!">Forgot password?</a>
              <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                Don't have an account? <a href="#!" style={{ color: '#393f81' }}>Register here</a>
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

export default Login;
