import {BrowserRouter,Routes, Route}from 'react-router-dom'
import './App.css';

import Header from './components/Header';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import Footer from './components/footer';
import PrivateRoute from './components/PrivateRoute';
import { UserProvider } from './UserContext';

function App() {
  return (
    <BrowserRouter>
    <div className="d-flex flex-column min-vh-100">
    <UserProvider>
     
        <Header />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          </Routes>
        </div>
        <Footer />
        
    </UserProvider>
      </div>
      </BrowserRouter>
  );
}

export default App;
