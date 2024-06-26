import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../context/notes/UserContext';

const Navbar = () => {
  let navigate= useNavigate();

  const {user,fetchUserDetails} = useContext(UserContext);
  console.log(user);

  useEffect (()=>{
    if(localStorage.getItem('token')){
      fetchUserDetails();
    }
  },[fetchUserDetails]);

  
  const handlelogout=()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }

  
  let location = useLocation();


  

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">iNoteBook</Link>
          <div className="d-flex align-items-center ms-auto me-3">
          <p className="text-white mb-0">{`Hi, ${user?.name}`}</p>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} aria-current="page" to="/about">About</Link>
              </li>
            </ul>
            {!localStorage.getItem('token')?<form className="d-flex" role="search">
              <Link className="btn btn-secondary mx-1" to="/login" role="button">Login</Link>
              <Link className="btn btn-secondary mx-1" to="/signup" role="button">Signup</Link>
            </form>: <button onClick={handlelogout} className='btn btn-primary'>Logout</button>}
          </div>
        </div>
      </nav>
    </div>

  )
}

export default Navbar
