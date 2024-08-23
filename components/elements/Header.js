import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

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
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          Logo
        </Link>

        <div className="navbar-collapse collapse" id="mynavbar">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" href="/user">
                Students
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/attendance">
                Attendance
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/about">
                About Us
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto me-5">
            {token !== undefined ? (
              <li className="nav-item">
                <Link className="nav-link" onClick={handleLogout} href='#'>
                  logout
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" href="/login">
                    login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/register">
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
