import React, { useState, useEffect } from "react";
import axios from "axios";


const useGetLatestLead = () => {
     const [newLeadData, setnewLeadData] = useState([]);
     const [show, setShow] = useState(false); 
     const [isLoading, setisLoading] = useState(true);

     const handleNextNewLead = async(data) => {
            let config = {
              method: 'get',
              maxBodyLength: Infinity,
              url: 'https://legalstixlawschool.com/api/democlasslead',
              headers: {}
            };

            const response = await axios.request(config);
            const fetchedData = response.data.DemoClassLead.map(item => ({
                name: item.name ?? '',
                phone: item.phone ?? '',
                email: item.email ?? '',
                source: 'Demo Class',
                convert:item.id ?? '',
              }));
            setnewLeadData([...fetchedData, ...data]);
     }

     useEffect(() => {
        const fetchData = async () => {
          let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://legalstixlawschool.com/api/OtherLead',
            headers: {}
          };
    
          try {
            const response = await axios.request(config);
            const fetchedData = response.data.OtherLead.map(item => ({
                name: item.name ?? '',
                phone: item.phone ?? '',
                email: item.email ?? '',
                source: item.type ?? '',
                convert:item.id ?? '',
              }));
            handleNextNewLead(fetchedData)
            setShow(true);
            setisLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
      }, []);

     return [newLeadData, show, isLoading]
}

export default useGetLatestLead;