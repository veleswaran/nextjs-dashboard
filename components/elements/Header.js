import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const Header = () => {
  let router = useRouter();
  let [token, setToken] = useState(null);
  useEffect(() => {
    let t = Cookies.get('vel');
    console.log(t);
    setToken(t);
  }, []);
  async function handleLogout(e) {
    e.preventDefault();
    try {
      await axios.get('/api/auth/logout');
      Cookies.remove('vel');
      setToken(null);
      router.push('/');
    } catch (error) {
      console.error('There was an error submitting the form:', error);
    }
  }
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand ms-4" href="/">
          <Image src='/images/logo.png' width={150} height={55} alt='logo'/>
        </Link>

        <div className="navbar-collapse collapse" id="mynavbar">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item ms-2">
              <Link className="nav-link btn1" href="/user">
                Students
              </Link>
            </li>
            <li className="nav-item ms-2">
              <Link className="nav-link btn1" href="/attendance">
                Attendance
              </Link>
            </li>
            <li className="nav-item ms-2">
              <Link className="nav-link btn1" href="/about">
                About Us
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto me-5">
            {token !== undefined ? (
              <li className="nav-item ms-2">
                <Link className="nav-link btn1" onClick={handleLogout} href='#'>
                  logout
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item ms-2">
                  <Link className="nav-link btn1" href="/login">
                    login
                  </Link>
                </li>
                <li className="nav-item ms-2">
                  <Link className="nav-link btn1" href="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mynavbar"
          aria-controls="mynavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
};

export default Header;
