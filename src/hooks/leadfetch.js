import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../screens/auth/context';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const useFetchApi = (url, method='post', param = '', table='') => {
  const [leadData, setLeadData] = useState(null);
  const [error, setError] = useState(null);
  const { isLoggedIn, token } = useAuth();
  const navigate = useNavigate();

  const fetchData = async (formData = {}) => {
    let data = {...formData, table};
    let config = {
      method: method,
      maxBodyLength: Infinity,
      url: process.env.REACT_APP_API_URL+url+param,
      headers: { 
        'Authorization': token.slice(7)
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      setLeadData(response.data);
    } catch (error) {
      setError(error);
         if(error.response.status == 401){
            Swal.fire({
              icon:'info',
              title: "Session Expired",
              showDenyButton: false,
              showCancelButton: false,
              confirmButtonText: "Ok",
            }).then((result) => {
              if (result.isConfirmed) {
                    navigate('/login');
                    localStorage.clear()
              }
            });
         }
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // This will run only once on component mount

  return { leadData, error, fetchData };
};

export default useFetchApi;
