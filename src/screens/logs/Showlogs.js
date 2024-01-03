import React, { useEffect, useState } from "react";
import SearchComponent from "../../components/searchComponent";
import ShowTableComp from "../../components/ShowTableComponent";
import useFetchApi from "../../hooks/leadfetch";
import TableComponent from "../../components/TableComponent";


const ShowLogs = () => {
    const { leadData, error } = useFetchApi('lead/showData', 'post', '', 'logs');
    const [data, setData] = useState([]); 
    const [show, setShow] = useState(false); 
    const [isLoading, setisLoading] = useState(true);
       
    useEffect(() => {
      if (!leadData || !Array.isArray(leadData.data)) return;
      
      const fetchedData = leadData.data.map(item => {
           const name = item.username ?? '';
           const ip_address = item.ip_address ?? '';
           let CreatedAtDate = '';
           if(item.created_at){
                    const isoDateString = item.created_at;
                    const date = new Date(isoDateString);
                    
                    const options = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    timeZone: 'Asia/Kolkata'
                    };
                    
                    const formattedDate = date.toLocaleString('en-US', options);
                    
                    CreatedAtDate = formattedDate;
                // }
           }

           const Action = item.action ?? '';
           const Url = item.url ?? '';
           const location = JSON.parse(item.location) ?? '';
           return {
               name,
               ip_address,
               Action,
               Url,
               CreatedAtDate,
               location
           }
           
        });
      
    
      setData(fetchedData);
      setShow(true); 
      setisLoading(false)
      console.log(data); 
    
    }, [leadData]);


    const updateDataTable = (id) => {
        const filteredData = data.filter(item => item.RecordID !== id)
        setData(filteredData);
    };
    
    const [tableHeading, settableHeading] = useState(['UserName', 'IP Address', 'Action', 'Url', 'Time', 'location'])


    return (
        <>
           <div class="container-fluid py-1">

                {/* SEARCH FILTERS START HERE */}
                <div className="row">
                    {/* <SearchComponent data={data} setData={setData}/> */}
                </div>
                {/* SEARCH FILTERS END HERE */}

                    {/* DATE TABLE START HERE*/}
                        <ShowTableComp heading={'Users Logs Table'}>
                            <TableComponent updateDataTable={updateDataTable} isLoading={isLoading} show={show} tableHead={tableHeading} tableData={data}/>
                        </ShowTableComp>
                    {/* DATA TABLE END HERE */}
                </div>
        </>
    )
}


export default ShowLogs;