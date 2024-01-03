import React, { useState, useEffect } from "react";
import axios from "axios";


const useGetCategory = () => {
     const [data, setData] = useState([]);
     const [show, setShow] = useState(false); 
     const [isLoading, setisLoading] = useState(true);

     useEffect(() => {
        const fetchData = async () => {
          let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://legalstixlawschool.com/api/courses',
            headers: {}
          };
    
          try {
            const response = await axios.request(config);
            const fetchedData = response.data.categories.map(item => ({
                id: item.id ?? '',
                name: item.category ?? '',
              }));

            setData(fetchedData)
            setShow(true);
            setisLoading(false)
          } catch (error) {
            console.log(error);
            console.log(error.response.status);

          }
        };
    
        fetchData();
      }, []);

     return [data, show, isLoading]
}

export default useGetCategory;