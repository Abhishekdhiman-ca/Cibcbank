// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './HomePage';
import TransactionForm from './TransactionForm';
import ETransferForm from './ETransferForm';
import Login from './Login';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [balances, setBalances] = useState({ checking: 128, savings: 1322 });
  const [transactions, setTransactions] = useState([]);
  const contacts = ['John Doe', 'Jane Smith', 'Alice Johnson'];

  const handleTransaction = ({ accountNumber, amount, type, accountType }) => {
    const transaction = {
      type,
      accountNumber,
      amount,
      accountType,
      timestamp: new Date().toLocaleString()
    };

    let newBalance;
    if (type === 'deposit') {
      newBalance = balances[accountType] + amount;
    } else if (type === 'withdraw') {
      if (balances[accountType] < amount) {
        alert('Insufficient balance');
        return;
      }
      newBalance = balances[accountType] - amount;
    }

    setBalances({
      ...balances,
      [accountType]: newBalance
    });

    setTransactions(prevTransactions => [...prevTransactions, transaction]);
  };

  const handleETransfer = ({ fromAccount, toContact, amount }) => {
    if (balances[fromAccount] < amount) {
      alert('Insufficient balance');
      return;
    }

    const newBalance = balances[fromAccount] - amount;

    const transaction = {
      type: 'etransfer',
      accountNumber: toContact,
      amount,
      accountType: fromAccount,
      timestamp: new Date().toLocaleString()
    };

    setBalances({
      ...balances,
      [fromAccount]: newBalance
    });

    setTransactions(prevTransactions => [...prevTransactions, transaction]);
  };

  return (
    <Router>
      <div>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<HomePage balances={balances} transactions={transactions} />} />
            <Route path="/deposit" element={<TransactionForm type="deposit" onSubmit={handleTransaction} />} />
            <Route path="/withdraw" element={<TransactionForm type="withdraw" onSubmit={handleTransaction} />} />
            <Route path="/etransfer" element={<ETransferForm contacts={contacts} onSubmit={handleETransfer} />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
