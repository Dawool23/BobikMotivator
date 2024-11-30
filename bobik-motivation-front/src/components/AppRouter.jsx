import React, { useContext } from 'react';
import { Route, Routes, } from 'react-router-dom';
import Error from "../pages/Error";
/*import About from '../pages/About'; */
import {publicRoutes, privateRoutes} from "../router";
import Login from '../pages/Login';
import { AuthContext } from '../context';
import Achievements from '../pages/Achievements';

const AppRouter = () => {
  const {isAuth} = useContext(AuthContext);
    return (
      isAuth
      ?
      <Routes>
        {privateRoutes.map(route => 
          <Route 
            element={route.element}
            path={route.path} 
            exact={route.exact}
            key={route.path} 
          />
        )}
        <Route path="/" element={<Achievements/>} />
        <Route path="*" element={<Error />} /> 
      </Routes>
      :
      <Routes>
        {publicRoutes.map(route => 
          <Route 
            element={route.element}
            path={route.path} 
            exact={route.exact}
            key={route.path} 
          />
        )}
        <Route path="/" element={<Login/>} />
        <Route path="*" element={<Error />} /> 
      </Routes>
    );
  };
  
  export default AppRouter;