import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ShowTableComp from "../../components/ShowTableComponent";
import TableComponent from "../../components/TableComponent";
import { Link } from "react-router-dom";
import useFetchApi from "../../hooks/leadfetch";
import SearchComponent from "../../components/searchComponent";

const ShowTableUser = () => {
    const { leadData, error } = useFetchApi('lead/users', 'get');
    const [data, setData] = useState([]); 
    const [show, setShow] = useState(false); 
    const [isLoading, setisLoading] = useState(true);
       
    useEffect(() => {
      if (!leadData || !Array.isArray(leadData.data)) return;
    
      const fetchedData = leadData.data.map(item => {
           const name = item.name ?? '';
           const role = item.RoleName ?? '';
           let lastLoginDate = '';
           if(item.last_login){
                    const isoDateString = item.last_login;
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
                    
                    lastLoginDate = formattedDate;
                // }
           }

           const RecordID = item.RecordID ?? '';
           return {
               name,
               role,
               lastLoginDate,
               RecordID
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
    
    const [tableHeading, settableHeading] = useState(['Name', 'Role', 'Last LoginIn', ''])

      return (
          <>
            <div class="container-fluid py-1">

                {/* SEARCH FILTERS START HERE */}
                <div className="row">
                      <div className="col-md-2">
                            <Link to="/adduser" className="btn btn-warning"><i className="fa fa-plus">&nbsp; &nbsp;</i>Add User</Link>
                      </div>

                      <SearchComponent data={data} setData={setData}/>

                </div>
                {/* SEARCH FILTERS END HERE */}

                    {/* DATE TABLE START HERE*/}
                        <ShowTableComp heading={'Users Table'}>
                            <TableComponent table="users" deleteRoute='lead/delete' editRoute='/edituser' updateDataTable={updateDataTable} isLoading={isLoading} show={show} tableHead={tableHeading} tableData={data}/>
                        </ShowTableComp>
                    {/* DATA TABLE END HERE */}
                </div>
          </>
      )
}

export default ShowTableUser