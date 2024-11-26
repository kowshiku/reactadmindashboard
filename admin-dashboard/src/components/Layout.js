// components/Layout.js
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


const Layout = ({ children }) => {
  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
        <h4>Admin Dashboard</h4>
        <nav>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/users" className="nav-link text-white">
              <FontAwesomeIcon icon={faUser}  style={{marginRight:'5px'}}/>Users
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* Main Content */}
      <div className="flex-grow-1">
        <header className="bg-light p-3 shadow">
          <h5>User Actions</h5>
        </header>
        <main className="p-4">
        {children}
        </main>
      </div>
     
    </div>
    
  );
};


export default Layout;
