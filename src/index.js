import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';
import App from './App';
import Login from './Login/Login';
import Forgot_Password from './Forgot Password/Forgot_Password';
import Rider_Dashboard from './Rider Info Dashboard/Rider_Dashboard';
import Admin_View from './Admin View/Admin_View';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/forgot_password" element={<Forgot_Password />} />
      <Route exact path="/rider_info" element={<Rider_Dashboard />} />
      <Route exact path="/admin007" element={<Admin_View />} />
      <Route exact path="*" element={<h1> NOT FOUND </h1>} />
    </Routes>
  </BrowserRouter>

);