import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import { useState } from 'react';
import Footer from './components/Footer';


function App() {
  const[alert,SetAlert] = useState(null);
  const showAlert=(message, type)=>{
    SetAlert({
      msg:message,
      type:type
    });
    setTimeout(()=>{
      SetAlert(null);
    },1500);
  };
  return (
    <>
      <NoteState showAlert={showAlert}>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className='container'>
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/Login" element={<Login showAlert={showAlert} />} />
              <Route path="/Signup" element={<Signup showAlert={showAlert} />} />
            </Routes>
          </div>
          <Footer />
          {/* <footer><p>• Done By Rohith Rudrapati •</p></footer> */}
        </Router>

      </NoteState>
    </>
  );
}

export default App;
