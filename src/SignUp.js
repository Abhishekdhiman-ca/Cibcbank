import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import A from "./Img/img1.webp";
import { v4 as uuidv4 } from "uuid";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [lastAccountNumber, setLastAccountNumber] = useState(4711);
  const navigate = useNavigate();

  const url = "https://json-storage-api.p.rapidapi.com/datalake";
  const headers = {
    "content-type": "application/json",
    "X-RapidAPI-Key": "737b5b8023msh5dc8759b04faf33p1be655jsn98f86fc2f298",
    "X-RapidAPI-Host": "json-storage-api.p.rapidapi.com",
  };

  useEffect(() => {
    getLastAccountNumber();
  }, []);

  const getLastAccountNumber = async () => {
    try {
      const response = await fetch("https://your-api.com/last-account-number");
      const data = await response.json();
      setLastAccountNumber(data.lastAccountNumber);
    } catch (error) {
      console.error("Error fetching last account number:", error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const newAccountNumber = lastAccountNumber + 1;

      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({
          "@context": [
            "http://schema4i.org/Thing.jsonld",
            "http://schema4i.org/Action.jsonld",
            "http://schema4i.org/CreateAction.jsonld",
          ],
          "@type": "CreateAction",
          Result: {
            "@context": [
              "http://schema4i.org/DataLakeItem.jsonld",
              "http://schema4i.org/UserAccount.jsonld",
              "http://schema4i.org/OfferForPurchase.jsonld",
              "http://schema4i.org/Offer.jsonld",
              "http://schema4i.org/Organization.jsonld",
              "http://schema4i.org/PostalAddress.jsonld",
            ],
            "@type": "DataLakeItem",
            Name: firstName + " " + lastName,
            Creator: {
              "@type": "UserAccount",
              Identifier: "USERID-4711",
            },
            About: {
              "@type": "Organization",
              Email: email,
              Password: password,
              AccountNumber: newAccountNumber,
            },
          },
        }),
      });
      await response.text();
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setMessage("Signup successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Error signing up:", error);
      setMessage("Error signing up. Please try again.");
    }
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
              <h5
                className="fw-normal my-4 pb-3"
                style={{ letterSpacing: "1px" }}
              >
                Sign Up your account
              </h5>
              <form onSubmit={handleSignUp}>
                <div className="mb-4">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="form-control form-control-lg"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="form-control form-control-lg"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
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
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control form-control-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {message && (
                  <div
                    className={`alert ${message.includes("successful") ? "alert-success" : "alert-danger"}`}
                    role="alert"
                  >
                    {message}
                  </div>
                )}
                <button
                  type="submit"
                  className="btn btn-dark btn-lg mb-4 px-5"
                >
                  Sign Up
                </button>
              </form>
              <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                Already have an account?{" "}
                <a href="/login" style={{ color: "#393f81" }}>
                  Login here
                </a>
              </p>
              <div className="d-flex flex-row justify-content-start">
                <a href="#!" className="small text-muted me-1">
                  Terms of use.
                </a>
                <a href="#!" className="small text-muted">
                  Privacy policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
