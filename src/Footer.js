import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle, faInstagram, faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';

const SocialMediaLinks = ({ size }) => (
  <>
    <li className="ms-3">
      <a className="link-light" href="#">
        <FontAwesomeIcon icon={faTwitter} size={size} />
      </a>
    </li>
    <li className="ms-3">
      <a className="link-light" href="#">
        <FontAwesomeIcon icon={faInstagram} size={size} />
      </a>
    </li>
    <li className="ms-3">
      <a className="link-light" href="#">
        <FontAwesomeIcon icon={faFacebookF} size={size} />
      </a>
    </li>
    <li className="ms-3">
      <a className="link-light" href="#">
        <FontAwesomeIcon icon={faGoogle} size={size} />
      </a>
    </li>
    <li className="ms-3">
      <a className="link-light" href="#">
        <FontAwesomeIcon icon={faLinkedinIn} size={size} />
      </a>
    </li>
    <li className="ms-3">
      <a className="link-light" href="#">
        <FontAwesomeIcon icon={faGithub} size={size} />
      </a>
    </li>
  </>
);

const links = [
  { text: 'Home' },
  { text: 'Features' },
  { text: 'Pricing' },
  { text: 'FAQs' },
  { text: 'About' },
];

const Footer = () => (
  <footer className="bg-dark text-white py-4 w-100">
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-4 mb-4 mb-md-0">
          <h3 className="text-danger">Links</h3>
          <ul className="nav flex-column">
            {links.map((link, index) => (
              <li key={index} className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-light">
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-12 col-md-4 mb-4 mb-md-0">
          <h5>Subscribe to our newsletter</h5>
          <p>Monthly digest of what's new and exciting from us.</p>
          <Form className="d-flex gap-2">
            <Form.Control
              type="email"
              placeholder="Email address"
              className="me-2"
            />
            <Button variant="danger" type="button">
              Subscribe
            </Button>
          </Form>
        </div>
        <div className="col-12 col-md-4">
          <h5>Follow us</h5>
          <ul className="list-unstyled d-flex">
            <SocialMediaLinks size="1x" />
          </ul>
        </div>
      </div>
      <div className="row text-center mt-4">
        <div className="col">
          <p>&copy; 2021 Company, Inc. All rights reserved.</p>
          <p>
            &copy; <span className="text-danger fw-bold">CIBC</span> Bank{' '}
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
