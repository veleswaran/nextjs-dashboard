// components/Footer.js
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-dark text-center text-lg-start text-light">
      <div className="container p-4">
        <div className="row">
          <div className="col-md-3">
            <h5 className="mb-4">About Us</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec eros.</p>
          </div>
          <div className="col-md-3">
            <h5 className="mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link href="#" className="text-light">Home</Link></li>
              <li><Link href="#" className="text-light">Students</Link></li>
              <li><Link href="#" className="text-light">Courses</Link></li>
              <li><Link href="#" className="text-light">Contact</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5 className="mb-4">Contact Us</h5>
            <p>1234 School Ave, City, Country</p>
            <p>Email: info@school.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div className="col-md-3">
            <h5 className="mb-4">Follow Us</h5>
            <Link href="#" className="btn btn-primary btn-sm me-2">Facebook</Link>
            <Link href="#" className="btn btn-primary btn-sm me-2">Twitter</Link>
            <Link href="#" className="btn btn-primary btn-sm">Instagram</Link>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col text-center">
            <p className="mb-0">&copy; 2024 Student Management System. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
