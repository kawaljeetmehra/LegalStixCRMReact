import { useState, useEffect } from 'react';
import axios from 'axios';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css'; // Import toastr styles
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../screens/auth/context';

const useEditAPI= (url, nxtroute = '') => {
    const [response, setReponse] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { isLoggedIn, token } = useAuth();

    const postData = async (formValues) => {
        try {
          const data = formValues;
  
          const response = await axios.post(process.env.REACT_APP_API_URL+url, data, {
            headers: {
              'Authorization': token.slice(7),
              'Content-Type': 'application/json'
            },
            maxBodyLength: Infinity // If needed
          });

          setReponse(JSON.stringify(response.data))
          toastr.success('Updated successfully', 'success');
          if(nxtroute != ''){
                navigate(nxtroute);
          }
          
        } catch (error) {
          toastr.error('Message', 'Something went wrong!');
          console.error(error);
        }
      };
       
     return [postData, response, error];
}

export default useEditAPI;