
import {  Navigate } from 'react-router-dom';

const PrivateRoute =  ({ children}) => {
        if (localStorage.getItem('JWTBOOKINGTOKEN')) {
         return children;
        }
        return  <Navigate to="/login" />;  
      
      };
  

export default PrivateRoute;