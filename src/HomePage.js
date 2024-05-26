import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Carousel, Button } from 'react-bootstrap';
import RewardOffer from './RewardOffer';
import CongratulationsPage from './CongratulationsPage';
import './App.css';
import CIBC from './Img/cibc-0224-ph-2-transformed.webp';
import Content from './Img/cq5dam.web.1280.1280.avif';

const HomePage = ({ balances, transactions, allowedAccountNumbers }) => {
  const [hoveredBalance, setHoveredBalance] = useState(null);
  const [visibleTransactions, setVisibleTransactions] = useState({
    chequing: false,
    savings: false,
    credit: false,
    investment: false,
    total: false
  });
  const [currentAccountType, setCurrentAccountType] = useState(null);

  const totalBalance = Object.values(balances).reduce((acc, balance) => acc + balance, 0);

  const handleHover = (balanceType) => {
    setHoveredBalance(balanceType);
  };

  const toggleTransactions = (balanceType) => {
    setVisibleTransactions(prevState => ({
      ...prevState,
      [balanceType]: !prevState[balanceType]
    }));
    setCurrentAccountType(balanceType);
  };

  const toggleAllTransactions = () => {
    setVisibleTransactions(prevState => ({
      ...prevState,
      total: !prevState.total
    }));
    setCurrentAccountType('total');
  };

  return (
    <div>
      <Carousel>
        <Carousel.Item style={{ maxHeight: "450px" }}>
          <img
            className="d-block w-100"
            src={CIBC}
            alt="Welcome to CIBC Bank"
            style={{ objectFit: "cover", maxHeight: "600px" }}
          />
        </Carousel.Item>
        <Carousel.Item style={{ maxHeight: "450px" }}>
          <img
            className="d-block w-100"
            src={CIBC}
            alt="Welcome to CIBC Bank"
            style={{ objectFit: "cover", maxHeight: "600px" }}
          />
        </Carousel.Item>
      </Carousel>

      <div className="text-center mb-4">
        <h2 className="display-4">
          Welcome to
          <span style={{ color: 'red', fontWeight: 'bold', animation: 'bounce-in-right 1s' }}> CIBC</span> Bank
        </h2>
      </div>

      <Container className="my-5">
        <Row className="justify-content-center">
          {Object.keys(balances).map((accountType) => (
            <Col md={4} key={accountType}>
              <Card
                className="shadow"
                onMouseEnter={() => handleHover(accountType)}
                onMouseLeave={() => handleHover(null)}
              >
                <Card.Body>
                  <h5 className="card-title">
                    <span className="text-danger">{accountType.charAt(0).toUpperCase() + accountType.slice(1)}</span> 
                    {" ("}{allowedAccountNumbers[accountType]}{")"} Balance
                  </h5>
                  <p className="card-text">${balances[accountType].toFixed(2)}</p>
                  {hoveredBalance === accountType && (
                    <Button
                      variant="danger"
                      className="mt-2"
                      onClick={() => toggleTransactions(accountType)}
                    >
                      {visibleTransactions[accountType] ? `Hide ${accountType.charAt(0).toUpperCase() + accountType.slice(1)} Transactions` : `Show ${accountType.charAt(0).toUpperCase() + accountType.slice(1)} Transactions`}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
          <Col md={4}>
            <Card
              className="shadow"
              onMouseEnter={() => handleHover('total')}
              onMouseLeave={() => handleHover(null)}
            >
              <Card.Body>
                <h5 className="card-title"><span className="text-danger">Total</span> Balance</h5>
                <p className="card-text">${totalBalance.toFixed(2)}</p>
                {hoveredBalance === 'total' && (
                  <Button
                    variant="danger"
                    className="mt-2"
                    onClick={toggleAllTransactions}
                  >
                    {visibleTransactions.total ? 'Hide All Transactions' : 'Show All Transactions'}
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {Object.keys(visibleTransactions).some(accountType => visibleTransactions[accountType]) && (
        <Container className="my-5">
          <h3 className="mb-3">
            {currentAccountType === 'total' ? 'All Transactions' : `${currentAccountType.charAt(0).toUpperCase() + currentAccountType.slice(1)} Account Transactions`}:
          </h3>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Account Type</th>
                <th>Account Number</th>
              </tr>
            </thead>
            <tbody>
              {currentAccountType === 'total'
                ? transactions.map((transaction, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{transaction.timestamp}</td>
                      <td>{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</td>
                      <td>${transaction.amount.toFixed(2)}</td>
                      <td>{transaction.accountType.charAt(0).toUpperCase() + transaction.accountType.slice(1)}</td>
                      <td>{allowedAccountNumbers[transaction.accountType]}</td>
                    </tr>
                  ))
                : transactions
                    .filter(transaction => transaction.accountType === currentAccountType)
                    .map((transaction, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{transaction.timestamp}</td>
                        <td>{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</td>
                        <td>${transaction.amount.toFixed(2)}</td>
                        <td>{transaction.accountType.charAt(0).toUpperCase() + transaction.accountType.slice(1)}</td>
                        <td>{allowedAccountNumbers[transaction.accountType]}</td>
                      </tr>
                    ))}
            </tbody>
          </Table>
        </Container>
      )}

      <RewardOffer />
      <CongratulationsPage />

      <Container className="my-5">
        <Row className="d-flex align-items-stretch">
          <Col md={4} className="offset-md-1">
            <Card className="p-4 bg-light shadow rounded d-flex flex-column justify-content-between h-100">
              <div>
                <h2>About <span className="text-danger">CIBC</span> Bank</h2>
                <p>Here you can provide information about CIBC Bank.</p>
                <h3>Our Services</h3>
                <p>Here you can list the services provided by CIBC Bank.</p>
              </div>
              <div className="d-grid gap-2">
                <Link to="/deposit" className="btn btn-danger btn-lg">Deposit</Link>
                <Link to="/withdraw" className="btn btn-danger btn-lg">Withdraw</Link>
                <Link to="/etransfer" className="btn btn-danger btn-lg">E-Transfer</Link>
              </div>
            </Card>
          </Col>
          <Col md={7}>
            <img src={Content} alt="Welcome to CIBC Bank" className="img-fluid rounded h-100" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
