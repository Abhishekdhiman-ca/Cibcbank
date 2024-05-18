import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const contacts = ['John Doe', 'Jane Smith', 'Mike Johnson'];

const TransactionForm = ({ type, onSubmit }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [accountType, setAccountType] = useState('checking');
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleConfirm = () => {
    const transactionData = {
      accountNumber: accountNumber.trim(),
      amount: parseFloat(amount.trim()),
      type: type,
      accountType: accountType,
      contact: selectedContact,
    };
    onSubmit(transactionData);
    setAccountNumber('');
    setAmount('');
    navigate('/');
    setShowModal(false);
  };

  return (
    <div className="container d-flex justify-content-center my-5">
      <div className="card w-50" style={{ backgroundColor: '#212529', color: 'white' }}>
        <div className="card-body">
          <h1 className="fw-bold mb-0 text-center">
            <span className="text-danger">CIBC</span> Bank
          </h1>
          <h5 className="fw-normal my-4 pb-3 text-center" style={{ letterSpacing: '1px' }}>
            {type === 'deposit' ? 'Deposit' : type === 'withdraw' ? 'Withdraw' : 'E-Transfer'} Funds
          </h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="accountNumber" className="form-label">Account Number</label>
              <input
                type="text"
                id="accountNumber"
                className="form-control form-control-lg"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
              />
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
            <div className="mb-4">
              <label className="form-label">Account Type</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="checking"
                  value="checking"
                  checked={accountType === 'checking'}
                  onChange={() => setAccountType('checking')}
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
                  checked={accountType === 'savings'}
                  onChange={() => setAccountType('savings')}
                />
                <label className="form-check-label" htmlFor="savings">
                  Savings
                </label>
              </div>
            </div>
            {type === 'etransfer' && (
              <div className="mb-4">
                <label htmlFor="contact" className="form-label">Select Contact</label>
                <select
                  id="contact"
                  className="form-control form-control-lg"
                  value={selectedContact}
                  onChange={(e) => setSelectedContact(e.target.value)}
                  required
                >
                  {contacts.map((contact, index) => (
                    <option key={index} value={contact}>
                      {contact}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="text-center">
              <button type="submit" className="btn btn-danger btn-lg mb-4 px-5">
                {type === 'deposit' ? 'Deposit' : type === 'withdraw' ? 'Withdraw' : 'Transfer'}
              </button>
            </div>
          </form>
          <div className="d-flex flex-row justify-content-center" style={{ color: 'white' }}>
            <a href="#!" className="small me-1" style={{ color: 'white' }}>Terms of use.</a>
            <a href="#!" className="small" style={{ color: 'white' }}>Privacy policy</a>
          </div>
        </div>
      </div>

      <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Transaction</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to {type === 'deposit' ? 'deposit' : type === 'withdraw' ? 'withdraw' : 'transfer'} funds?</p>
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

export default TransactionForm;
