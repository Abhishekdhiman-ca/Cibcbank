import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './HomePage';
import TransactionForm from './TransactionForm';
import ETransferForm from './ETransferForm';
import Login from './Login';
import SignUp from './SignUp';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const allowedAccountNumbers = {
  checking: '783783',
  savings: '971971',
  creditCard: '21212',
  investment: '38686'
};

const App = () => {
  const [balances, setBalances] = useState({
    checking: 128,
    savings: 1322,
    creditCard: 100,
    investment: 100,
  });
  const [transactions, setTransactions] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const contacts = [
    'Abhishek Dhiman', 'Sukhjeet Singh', 'Arpan Silwal', 'Nawaz Chowdhry', 
    'Surjeet Singh', 'Sejal Josan', 'Nabdeep Kaur', 'Jasdeep Kaur', 'Riya Mankotia'
  ];

  useEffect(() => {
    addSampleTransactions();
  }, []);

  const addSampleTransactions = () => {
    const sampleTransactions = [
      {
        type: 'deposit',
        accountNumber: '783783',
        amount: 100,
        accountType: 'checking',
        timestamp: new Date().toLocaleString()
      },
      {
        type: 'withdraw',
        accountNumber: '971971',
        amount: 50,
        accountType: 'savings',
        timestamp: new Date().toLocaleString()
      },
      {
        type: 'deposit',
        accountNumber: '21212',
        amount: 7,
        accountType: 'creditCard',
        timestamp: new Date().toLocaleString()
      },
      {
        type: 'withdraw',
        accountNumber: '38686',
        amount: 50,
        accountType: 'investment',
        timestamp: new Date().toLocaleString()
      }
    ];

    setTransactions(prevTransactions => [...prevTransactions, ...sampleTransactions]);

    setBalances({
      checking: 228,
      savings: 1272,
      creditCard: 107,
      investment: 50,
    });
  };

  const handleTransaction = ({ accountNumber, amount, type, accountType }) => {
    if (allowedAccountNumbers[accountType] !== accountNumber) {
      alert('Incorrect account number for the specified account type.');
      return;
    }

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

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div>
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<ProtectedRoute element={<HomePage balances={balances} transactions={transactions} allowedAccountNumbers={allowedAccountNumbers} />} />} />
            <Route path="/deposit" element={<ProtectedRoute element={<TransactionForm type="deposit" onSubmit={handleTransaction} />} />} />
            <Route path="/withdraw" element={<ProtectedRoute element={<TransactionForm type="withdraw" onSubmit={handleTransaction} />} />} />
            <Route path="/etransfer" element={<ProtectedRoute element={<ETransferForm contacts={contacts} onSubmit={handleETransfer} />} />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
            <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <SignUp />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
