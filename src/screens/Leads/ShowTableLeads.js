import React, { useEffect, useRef, useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ShowTableComp from "../../components/ShowTableComponent";
import TableComponent from "../../components/TableComponent";
import { Link } from "react-router-dom";
import useFetchApi from "../../hooks/leadfetch";
import SearchComponent from "../../components/searchComponent";
import { useAuth } from "../auth/context";

const ShowTableLeads = () => {
    const { leadData, error, fetchData } = useFetchApi('lead/fetchlead');
    const [data, setData] = useState([]); 
    const [show, setShow] = useState(false); 
    const [isLoading, setisLoading] = useState(false);
    const ref = useRef();
    const ref2 = useRef();
    const {RoleCategoryID} = useAuth();

    useEffect(() => {
      if (!leadData || !Array.isArray(leadData.data)) return;
    
      const fetchedData = leadData.data
      .filter(item => {
           if(!RoleCategoryID) return
           if(RoleCategoryID.length != 0){
                  return RoleCategoryID.includes(String(item.category_id));
             }
      })
      .map(item => {
        const name = `${item.first_name ?? ''} ${item.middle_name ?? ''} ${item.last_name ?? ''}`;
        const details = {
          email: item.email ?? '',
          phoneNumber: item.phoneNo ?? ''
        };
        const status = item.status ?? '';
        let appointmentDate = '';
        if (item.appointment_date) {
          const appointmentDateObj = new Date(item.appointment_date);
          if (!isNaN(appointmentDateObj.getTime())) {
            appointmentDate = appointmentDateObj.toLocaleDateString() ?? '';
          }
        }
        const RecordID = item.RecordID ?? '';
      
        return {
          name,
          details,
          status,
          appointmentDate,
          RecordID
        };
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

    const [tableHeading, settableHeading] = useState(['Name', 'Phone Number', 'Status', 'Appointment Date', ''])

    const handleFilters = (e) => {
          let data = {
              "year" : ref.current.value ?? '',
              "monthID" : ref2.current.value ?? ''
          };

          fetchData(data);
    }
    

      return (
          <>
            <div class="container-fluid py-1">

                {/* SEARCH FILTERS START HERE */}
                <div className="row">
                      <div className="col-md-2">
                            <Link to="/addlead" className="btn btn-warning"><i className="fa fa-plus">&nbsp; &nbsp;</i>Add Lead</Link>
                      </div>

                      <div className="col-md-3 mb-2">
                             <select onChange={handleFilters} ref={ref} class="form-control" style={{backgroundColor: 'white', padding: "8px"}}>
                                    <option value="">***Select Year***</option>
                                    <option>2019</option>
                                    <option>2020</option>
                                    <option>2021</option>
                                    <option>2022</option>
                                    <option>2023</option>
                                    <option>2024</option>
                             </select>
                      </div>

                      <div className="col-md-3 mb-2">
                             <select onChange={handleFilters} ref={ref2} class="form-control" style={{backgroundColor: 'white', padding: "8px"}}>
                                    <option value="">***Select Month***</option>
                                    <option value={1}>January</option>
                                    <option value={2}>Feburary</option>
                                    <option value={3}>March</option>
                                    <option value={4}>April</option>
                                    <option value={5}>May</option>
                                    <option value={6}>June</option>
                                    <option value={7}>July</option>
                                    <option value={8}>August</option>
                                    <option value={9}>September</option>
                                    <option value={10}>October</option>
                                    <option value={11}>November</option>
                                    <option value={12}>December</option>
                             </select>
                      </div>

                      <SearchComponent data={data} setData={setData}/>

                </div>
                {/* SEARCH FILTERS END HERE */}

                    {/* DATE TABLE START HERE*/}
                        <ShowTableComp heading={'Leads Table'}>
                            <TableComponent  editRoute='/editlead' deleteRoute='lead/deletelead' updateDataTable={updateDataTable} isLoading={isLoading} show={show} tableHead={tableHeading} tableData={data}/>
                        </ShowTableComp>
                    {/* DATA TABLE END HERE */}
                </div>
          </>
      )
}

export default ShowTableLeads