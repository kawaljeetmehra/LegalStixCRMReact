// authContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('IsLoggedIn') === 'true');
  const [token, setToken] = useState(localStorage.getItem('token') ?? '');
  const [userid, setroleID] = useState(localStorage.getItem('user_id') ?? '');
  const [roleid, setRoleIDs] = useState(localStorage.getItem('role_id') ?? '');
  const [RoleCategoryID, setRoleCategoryID] = useState(localStorage.getItem('RoleCategoryID') ?? []);
  const [wronglogins, setwronglogins] =  useState(false);
  const [name, setName] = useState(localStorage.getItem('name') ?? '')

  //alert(RoleCategoryID)
  const navigator = useNavigate();

  const login = async (data) => {
    try {
      const userData = JSON.stringify({
        "username": data.username,
        "password": data.password
      });
  
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:4000/auth/login',
        headers: {
          'Content-Type': 'application/json'
        },
        data: userData
      };
  
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
  
      const token = response.data.token;
      setToken(token);
      setIsLoggedIn(true);
      setroleID(response.data.user_id);
      setName(response.data.name);
      setRoleIDs(response.data.role_id);
      setRoleCategoryID(response.data.category_id);
      localStorage.setItem('RoleCategoryID', response.data.category_id);
      localStorage.setItem('token', token);
      localStorage.setItem('IsLoggedIn', true);
      localStorage.setItem('user_id', response.data.user_id);
      localStorage.setItem('name', response.data.name);
      localStorage.setItem('role_id', response.data.role_id);
      navigator('/'); // Use navigate to redirect after successful login
      return true;
    } catch (error) {
      localStorage.clear();
      setIsLoggedIn(false);
      setwronglogins(true);
      console.log(error);
      return false;
    }
  };

  const logout = () => {
    // Perform logout logic, set isLoggedIn to false
      localStorage.clear();
      setIsLoggedIn(false);
      setwronglogins(false);
      navigator('/login')
  };

  const storeDataToSession = (data) => {
    data.forEach(element => {
      sessionStorage.setItem(element.key, element.value);
    });
  }

  return (
    <AuthContext.Provider value={{ token, isLoggedIn, login, logout, storeDataToSession, RoleCategoryID, wronglogins, userid, name, roleid }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const ProtectRoute = ({ children }) => {
  const { isLoggedIn, token } = useAuth();
  const navigator = useNavigate();

  useEffect(() => {
    if (!isLoggedIn || !token) {
      navigator('/login');
    }
  }, [isLoggedIn, token, navigator]);

  return isLoggedIn && token ? children : null;
};
