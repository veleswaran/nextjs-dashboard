import Link from 'next/link'
const Header = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" href="javascript:void(0)">
          Logo
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mynavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="mynavbar">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" href="javascript:void(0)">
                Students
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="javascript:void(0)">
                Attendance
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="javascript:void(0)">
                About Us
              </Link>
            </li>
          </ul>
          
        </div>
      </div>
    </nav>
  );
};
export default Header;