import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ShowTableComp from "../../components/ShowTableComponent";
import TableComponent from "../../components/TableComponent";
import { Link } from "react-router-dom";
import useFetchApi from "../../hooks/leadfetch";
import SearchComponent from "../../components/searchComponent";

const ShowTableTask = () => {
    const { leadData, error } = useFetchApi('lead/fetchtask');
    const [data, setData] = useState([]); 
    const [show, setShow] = useState(false); 
    const [isLoading, setisLoading] = useState(true);
       
    useEffect(() => {
      if (!leadData || !Array.isArray(leadData.data)) return;
    
      const fetchedData = leadData.data.map(item => ({
        name: item.task ?? '',
        status: item.status ?? '',
        remarks: item.remarks ?? '',
        RecordID: item.RecordID ?? ''
      }));
      
    
      setData(fetchedData);
      setShow(true); 
      setisLoading(false)
      console.log(data); 
    
    }, [leadData]);


    const updateDataTable = (id) => {
        const filteredData = data.filter(item => item.RecordID !== id)
        setData(filteredData);
    };
    


      const [tableHeading, settableHeading] = useState(['Task', 'Status', 'Remarks', ''])

      return (
          <>
            <div class="container-fluid py-1">

                {/* SEARCH FILTERS START HERE */}
                <div className="row">
                      <div className="col-md-2">
                            <Link to="/addtask" className="btn btn-warning"><i className="fa fa-plus">&nbsp; &nbsp;</i>Add Task</Link>
                      </div>

                      <SearchComponent data={data} setData={setData}/>

                </div>
                {/* SEARCH FILTERS END HERE */}

                    {/* DATE TABLE START HERE*/}
                        <ShowTableComp heading={'Tasks Table'}>
                            <TableComponent deleteRoute='lead/deletetask' editRoute='/edittask' updateDataTable={updateDataTable} isLoading={isLoading} show={show} tableHead={tableHeading} tableData={data}/>
                        </ShowTableComp>
                    {/* DATA TABLE END HERE */}
                </div>
          </>
      )
}

export default ShowTableTask