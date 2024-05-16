import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import CIBC from './cibc-0224-ph-2-transformed.webp';
import Content from './R.jpeg';
import People from './cq5dam.web.1280.1280-transformed.webp';
import { Container, Row, Col, Card, Carousel, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle, faInstagram, faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';

const HomePage = ({ balances, transactions }) => {
  const [hoveredBalance, setHoveredBalance] = useState(null);
  const [clickedBalance, setClickedBalance] = useState(null);
  const totalBalance = balances.checking + balances.savings;

  const handleHover = (balanceType) => {
    setHoveredBalance(balanceType);
  };

  const handleClick = (balanceType) => {
    setClickedBalance(balanceType);
  };

  return (
    <div>
      <Carousel>
        <Carousel.Item style={{ maxHeight: "400px" }}>
          <img
            className="d-block w-100"
            src={CIBC}
            alt="Welcome to CIBC Bank"
            style={{ objectFit: "cover", maxHeight: "600px" }}
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{ maxHeight: "400px" }}>
          <img
            className="d-block w-100"
            src={People}
            alt="Transaction History"
            style={{ objectFit: "cover", maxHeight: "100%" }}
          />
          <Carousel.Caption>
          </Carousel.Caption>
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
          <Col md={4}>
            <Card
              className="shadow"
              onMouseEnter={() => handleHover('checking')}
              onMouseLeave={() => handleHover(null)}
            >
              <Card.Body>
                <h5 className="card-title">Checking Balance</h5>
                <p className="card-text">${balances.checking.toFixed(2)}</p>
                {hoveredBalance === 'checking' && (
                  <Button variant="danger" className="mt-2" onClick={() => handleClick('checking')}>View Chequing Transactions</Button>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card
              className="shadow"
              onMouseEnter={() => handleHover('savings')}
              onMouseLeave={() => handleHover(null)}
            >
              <Card.Body>
                <h5 className="card-title">Savings Balance</h5>
                <p className="card-text">${balances.savings.toFixed(2)}</p>
                {hoveredBalance === 'savings' && (
                  <Button variant="danger" className="mt-2" onClick={() => handleClick('savings')}>View Savings Transactions</Button>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card
              className="shadow"
              onMouseEnter={() => handleHover('total')}
              onMouseLeave={() => handleHover(null)}
            >
              <Card.Body>
                <h5 className="card-title">Total Balance</h5>
                <p className="card-text">${totalBalance.toFixed(2)}</p>
                {hoveredBalance === 'total' && (
                  <Button variant="danger" className="mt-2" onClick={() => handleClick('total')}>View All Transactions</Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {clickedBalance && (
        <Container className="my-5">
          <h3 className="mb-3">{clickedBalance === 'total' ? 'All Transactions' : `${clickedBalance.charAt(0).toUpperCase() + clickedBalance.slice(1)} Account Transactions`}:</h3>
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
              {transactions
                .filter(transaction => clickedBalance === 'total' || transaction.accountType === clickedBalance)
                .map((transaction, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{transaction.timestamp}</td>
                    <td>{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</td>
                    <td>${transaction.amount.toFixed(2)}</td>
                    <td>{transaction.accountType.charAt(0).toUpperCase() + transaction.accountType.slice(1)}</td>
                    <td>{transaction.accountNumber}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Container>
      )}

      <Container className="my-5">
        <Row>
          <Col md={4} className="offset-md-1 d-flex"> {/* Added offset-md-1 for equal spacing */}
            <Card className="p-4 bg-light shadow rounded d-flex flex-column justify-content-between">
              <div>
                <h2>About CIBC Bank</h2>
                <p>Here you can provide information about CIBC Bank.</p>
                <h3>Our Services</h3>
                <p>Here you can list the services provided by CIBC Bank.</p>
              </div>
              <div className="d-grid gap-2">
                <Link to="/deposit" className="btn btn-danger btn-lg">Deposit</Link>
                <Link to="/withdraw" className="btn btn-danger btn-lg">Withdraw</Link>
              </div>
            </Card>
          </Col>
          <Col md={7}>
            <img src={Content} alt="Welcome to CIBC Bank" className="img-fluid rounded" />
          </Col>
        </Row>
      </Container>


      <footer className="bg-dark text-white py-4 text-center">
        <Container>
          <section className='mb-4'>
            <Button
              variant='primary'
              className='m-1'
              href='#!'
              role='button'
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </Button>

            <Button
              variant='info'
              className='m-1'
              href='#!'
              role='button'
            >
              <FontAwesomeIcon icon={faTwitter} />
            </Button>

            <Button
              variant='danger'
              className='m-1'
              href='#!'
              role='button'
            >
              <FontAwesomeIcon icon={faGoogle} />
            </Button>

            <Button
              variant='primary'
              className='m-1'
              href='#!'
              role='button'
            >
              <FontAwesomeIcon icon={faInstagram} />
            </Button>

            <Button
              variant='primary'
              className='m-1'
              href='#!'
              role='button'
            >
              <FontAwesomeIcon icon={faLinkedinIn} />
            </Button>

            <Button
              variant='secondary'
              className='m-1'
              href='#!'
              role='button'
            >
              <FontAwesomeIcon icon={faGithub} />
            </Button>

          </section>
          <p>&copy; <span style={{ color: 'red', fontWeight: 'bold', animation: 'bounce-in-right 1s' }}> CIBC</span> Bank {new Date().getFullYear()}</p>
        </Container>
      </footer>
    </div>
  );
};

export default HomePage;
