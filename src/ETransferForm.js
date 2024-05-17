import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ETransferForm = ({ contacts, onSubmit }) => {
  const [fromAccount, setFromAccount] = useState('checking');
  const [toContact, setToContact] = useState('');
  const [amount, setAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleConfirm = () => {
    const transferData = {
      fromAccount,
      toContact,
      amount: parseFloat(amount.trim()),
      type: 'etransfer',
    };
    onSubmit(transferData);
    setFromAccount('checking');
    setToContact('');
    setAmount('');
    navigate('/');
    setShowModal(false);
  };

  return (
    <div className="container d-flex justify-content-center my-5">
      <div className="card w-50">
        <div className="card-body">
          <h1 className="fw-bold mb-0 text-center">
            <span className="text-danger">CIBC</span> Bank
          </h1>
          <h5 className="fw-normal my-4 pb-3 text-center" style={{ letterSpacing: '1px' }}>
            E-Transfer Funds
          </h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label">From Account</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="checking"
                  value="checking"
                  checked={fromAccount === 'checking'}
                  onChange={() => setFromAccount('checking')}
                />
                <label className="form-check-label" htmlFor="checking">
                  Checking
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="savings"
                  value="savings"
                  checked={fromAccount === 'savings'}
                  onChange={() => setFromAccount('savings')}
                />
                <label className="form-check-label" htmlFor="savings">
                  Savings
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="toContact" className="form-label">To Contact</label>
              <select
                id="toContact"
                className="form-control form-control-lg"
                value={toContact}
                onChange={(e) => setToContact(e.target.value)}
                required
              >
                <option value="" disabled>Select contact</option>
                {contacts.map((contact, index) => (
                  <option key={index} value={contact}>{contact}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="amount" className="form-label">Amount</label>
              <input
                type="number"
                id="amount"
                className="form-control form-control-lg"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-dark btn-lg mb-4 px-5">
                Transfer
              </button>
            </div>
          </form>
          <div className="d-flex flex-row justify-content-center">
            <a href="#!" className="small text-muted me-1">Terms of use.</a>
            <a href="#!" className="small text-muted">Privacy policy</a>
          </div>
        </div>
      </div>

      <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Transfer</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to transfer funds?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={handleConfirm}>Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ETransferForm;
