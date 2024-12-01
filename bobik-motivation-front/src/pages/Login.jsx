import React from 'react';
import FormAuthorization from "../components/UI/FormAuthorization/FormAuthorization";
import { AuthProvider } from '../context/AuthContext';

const Login = () => {
  
    return (
 /*      <AuthProvider> */
      <div>
         <FormAuthorization/>
      </div>
   /*    </AuthProvider> */
    );
};

export default Login; 