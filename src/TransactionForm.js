import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const TransactionForm = ({ type, onSubmit }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [accountType, setAccountType] = useState('checking');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Check if account number is numeric
    if (!/^\d+$/.test(accountNumber.trim())) {
      alert('Please enter a valid account number.');
      return;
    }

    if (!accountNumber.trim() || !amount.trim()) {
      alert('Please enter both account number and amount.');
      return;
    }
    const transactionData = {
      accountNumber: accountNumber.trim(),
      amount: parseFloat(amount.trim()),
      type: type,
      accountType: accountType,
    };
    onSubmit(transactionData);
    setAccountNumber('');
    setAmount('');
    navigate('/');
  };

  return (
    <div className="container d-flex justify-content-center my-5">
      <div className="card w-50">
        <div className="card-body">
          <h1 className="fw-bold mb-0 text-center">
            <span className="text-danger">CIBC</span> Bank
          </h1>
          <h5 className="fw-normal my-4 pb-3 text-center" style={{ letterSpacing: '1px' }}>
            {type === 'deposit' ? 'Deposit' : 'Withdraw'} Funds
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
            <div className="text-center"> {/* Centering div */}
              <button type="submit" className="btn btn-dark btn-lg mb-4 px-5">
                {type === 'deposit' ? 'Deposit' : 'Withdraw'}
              </button>
            </div>
          </form>
          <div className="d-flex flex-row justify-content-center">
            <a href="#!" className="small text-muted me-1">Terms of use.</a>
            <a href="#!" className="small text-muted">Privacy policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;
