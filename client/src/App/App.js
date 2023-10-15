import React from 'react';
import Mainpage from '../pages/mainpage';
import Loginpage from '../pages/loginpage';
import Registerpage from '../pages/registerpage'
import Addbookpage from '../pages/addpage';
import Authorpage from '../pages/authorpage';
import Profilepage from '../pages/profilepage';
import './App.css';
// import Navbar from '../components/navbar';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';

function App() {
  return ( 
    <Router>
      <Routes>
          <Route path='/' element={<Mainpage/>}></Route>
          <Route path='/login' element={<Loginpage/>}></Route>
          <Route path='/register' element={<Registerpage/>}></Route>
          <Route path='/addbook' element={<Addbookpage/>}></Route>
          <Route path='/authorSearch' element={<Authorpage/>}></Route>
          <Route path='/profile' element={<Profilepage/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
