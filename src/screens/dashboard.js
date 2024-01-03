import React, { useEffect, useState } from "react";
import BarChart from "../components/BarChart";
import useFetchApi from "../hooks/leadfetch";
import axios from "axios";
import { useAuth } from "./auth/context";
import useGetLatestLead from "../hooks/getlateslead";
import TableComponent from "../components/TableComponent";
import ModalComponent from "../components/model";
import { DateInput } from "../components/FormComponent";
import useFormMethods from "../hooks/manageForm";

const Dashboard = () => {
      const [data, setData] = useState([
        {name: "Kawaljeet Singh", phoneNo: 7056503988,},
        {name: "Kawal Mehra", phoneNo: 9416840483,},
        {name: "Amrit Kaur", phoneNo: 8937878788,},
        {name: "Naman Sharma", phoneNo: 7056503988,},
      ]);

      const [TaskList, setTaskList] = useState([
           {task: "Task Number 1", assigned_date: '22 DEC 7:20 PM'},
           {task: "Task Number 2", assigned_date: '22 DEC 7:20 PM'},
           {task: "Task Number 3", assigned_date: '22 DEC 7:20 PM'},
           {task: "Task Number 4", assigned_date: '22 DEC 7:20 PM'},
      ]);

      const { leadData, error } = useFetchApi('lead/getmonthlytask', 'get');
      const { leadData: usersData, error: usersError } = useFetchApi('lead/getmontlyleads', 'get');
      const { leadData: userData, error: userError } = useFetchApi('lead/users', 'get');
      const { isLoggedIn, token, userid } = useAuth();
      const { leadData: fetchTask, error: fetchTaskError } = useFetchApi('lead/fetchtask', 'post' , '/'+userid);
      const [datas, setDatas] = useState([]); 
      const [datav, setDatav] = useState([]); 
      const [users, setUser] = useState([]);
      const [taskData, setTaskDate] = useState([]);
      const [newLeadData, show, isLoading] = useGetLatestLead();
      const [modalCheck, setModalCheck] = useState({initialRecordID:'', initalShow: false});
      const [showDate, dateState, setdateState, isSubmitted, setisSubmitted, handleShowDatePicker, handleisSubmitted, handleUpdateSubmitForm, handleSubmitForm, handleDateValue, new_handleSubmitForm] = useFormMethods('lead/edit', '')
      const [dateVal, setDateVal] = useState({ start_date: '', end_date: ''});

      const [TaskRecordID, setTaskRecordID] = useState(null);
      const { leadData: fetchRecordWise} = useFetchApi('lead/showData', 'post' , '/'+TaskRecordID, 'tasks');

      useEffect(() => {
        if (!fetchTask || !Array.isArray(fetchTask.data)) return;
        
        const fetchedData = fetchTask.data.map(item => ({
            task: `${item.task ??''}`,
            RecordID: `${item.RecordID ??''}`,
            assigned_date: new Date(item.created_at).toUTCString(),
            status: item.status
          }));

          setTaskDate(fetchedData); 
        
        }, [fetchTask]);

      useEffect(() => {
        if (!leadData || !Array.isArray(leadData.data)) return;
        
        const fetchedData = leadData.data.map(item => ({
            month:`${item.monthName.substring(0,3) ??''}`,
            completed: `${item.completed_task ??''}`,
            pending: `${item.pending_task ??''}`,
          }));

        setDatas(fetchedData); 
        
        }, [leadData]);
        
        useEffect(() => {
            if (!userData || !Array.isArray(userData.data)) return;
        
            const currentDate = new Date(); // Today's date

            // Assuming usersData is an array of objects with a 'created_at' property
            const todayNewUsers = usersData?.data.filter(item => {
            // Assuming item.created_at is a Date object or a string representing a date
            const createdAtDate = new Date(item.created_at);
            // Check if the item's date is today's date
            return (
                    createdAtDate.getDate() === currentDate.getDate() &&
                    createdAtDate.getMonth() === currentDate.getMonth() &&
                    createdAtDate.getFullYear() === currentDate.getFullYear()
                );
            });

            const totalTodayNewUsers = todayNewUsers?.length ?? 0;
            const fetchedData = userData.data.map(item => ({
                id:`${item.RecordID ??''}`,
                name: `${item.username ??''}`,
                todayUser: totalTodayNewUsers
              }));

            setUser(fetchedData);

        }, [userData]);

        useEffect(() => {
            if (!usersData || !Array.isArray(usersData.data)) return;
            
            const date = new Date();
            const monthID = date.getMonth() + 1;
            var today_lead = 0;
            usersData.data.forEach(element => {
                  if(monthID == element.month_id) today_lead = element.today_lead;
            });

            const fetchedData = usersData.data
            .map(item => ({
                month:`${item.monthName.substring(0,3) ??''}`,
                completed: `${item.intrested ??''}`,
                pending: `${item.not_intrested ??''}`,
                total_leads: item.total_leads,
                today_lead: today_lead
              }));

            setDatav(fetchedData);
        }, [usersData]);

        const getCurrentYearFirstDate = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const firstDateOfYear = new Date(currentYear, 0, 1); // Months are 0-based, so 0 is January
        return firstDateOfYear;
        };
        
        const getCurrentYearLastDate = () => {
        const currentDate = new Date();
        return currentDate
        };
        
        // Usage
        const firstDateOfYear = getCurrentYearFirstDate();
        const lastDateOfYear = getCurrentYearLastDate();

        useEffect(() => {
            if (!TaskRecordID || !Array.isArray(fetchRecordWise.data)) return;
            //alert(TaskRecordID)
            const TaskDataList = taskData.filter(item => {
                return item.RecordID != TaskRecordID;
            })

            const fetchedData = fetchRecordWise.data
            .filter(item => {
                 return item.RecordID == TaskRecordID;
            })
            .map(item => {
                const start_date = item.start_date;
                const end_date = item.end_date;
                  return {
                      start_date,
                      end_date
                  }
            });
               setDateVal({start_date: fetchedData[0]?.start_date, end_date: fetchedData[0]?.end_date})
        }, [TaskRecordID]);

        const handleUpdateCheckBox = (e, recordID) => {
            if(e.target.checked){
                    setModalCheck({
                        initialRecordID: recordID,
                        initalShow: true,
                    });

                    setTaskRecordID(recordID);
            }else{
                    setModalCheck({
                        initialRecordID: '',
                        initalShow: false,
                    });
                    setTaskRecordID(null);
            }
            const updatedStatus = e.target.checked ? 1 : 0;
          
            const data = JSON.stringify({
              "status": updatedStatus,
              "RecordID": recordID
            });
          
            const config = {
              method: 'post',
              url: 'http://localhost:4000/lead/updtaskstatus',
              headers: {
                'Authorization': token.slice(7), // Replace with your actual authorization token
                'Content-Type': 'application/json'
              },
              data: data
            };
          
            axios.request(config)
              .then((response) => {
                console.log(JSON.stringify(response.data));
          
                // Assuming response.data contains updated task data from the API
                const updatedTaskData = taskData.map(task => {
                  if (task.RecordID === recordID) {
                    return { ...task, status: updatedStatus };
                  }
                  return task;
                });
          
                setTaskDate(updatedTaskData);
              })
              .catch((error) => {
                console.log(error);
              });
          };

      
      
    const updateDataTable = (id) => {
        const filteredData = data.filter(item => item.RecordID !== id)
        setData(filteredData);
    };

    const [tableHeading, settableHeading] = useState(['Name', 'Phone Number', 'Email', 'Source', 'Convert']);
  
      return (
          <>
                        
             {modalCheck.initalShow && 
                <ModalComponent initialShow={true} initialRecordID={modalCheck.RecordID}>
                        <div className="row">
                            <form role="form" class="text-start" onSubmit={new_handleSubmitForm}>
                              <input type="hidden" value="tasks" name="table" />
                              <input type="hidden" value={modalCheck.initialRecordID} name="RecordID" />
                              <div className="mb-6">
                                     <DateInput col="8" value={dateVal?.start_date??''} AttrName="start_date" handleDateValue={handleDateValue} name="Start Date"/>
                              </div>
                              <div className="mb-6" style={{marginTop: '-10%', marginBottom:'-20%'}}>
                                     <DateInput col="8" value={dateVal?.end_date??''} AttrName="end_date"  handleDateValue={handleDateValue} name="End Date"/>
                              </div>

                              <div className="mb-6" style={{marginTop: '-10%', marginBottom:'-20%'}}>
                                   <input type="submit" className="btn btn-primary" value={"Submit"}/>
                              </div>
                            </form>
                        </div>
                </ModalComponent>
              }
              <h3 className="font-weight-bolder mb-4" align="left">Dashboard</h3>

                    <div className="row"> 
                        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                        <div className="card">
                            <div className="card-header p-3 pt-2 d-flex align-items-center">
                                <div className="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl me-3">
                                <i className="material-icons opacity-10">weekend</i>
                                </div>
                                <div className="text-start">
                                <p className="text-sm mb-0 text-capitalize">Total Users</p>
                                <h4 className="mb-0">{users.length}</h4>
                                </div>
                            </div>
                            <hr className="dark horizontal my-0" />
                            <div className="card-footer p-3">
                                <p className="mb-0"><span className="text-success text-sm font-weight-bolder">+{users[0]?.todayUser??0} </span>added today</p>
                            </div>
                        </div>
                        </div>

                        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                        <div className="card">
                            <div className="card-header p-3 pt-2 d-flex align-items-center">
                            <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl me-3">
                                <i className="material-icons opacity-10">person</i>
                            </div>
                            <div className="text-start">
                                <p className="text-sm mb-0 text-capitalize">Total Students</p>
                                <h4 className="mb-0">-</h4>
                            </div>
                            </div>
                            <hr className="dark horizontal my-0" />
                            <div className="card-footer p-3">
                            <p className="mb-0"><span className="text-success text-sm font-weight-bolder">- </span>added today</p>
                            </div>
                        </div>
                        </div>

                        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                        <div className="card">
                            <div className="card-header p-3 pt-2 d-flex align-items-center">
                            <div className="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl me-3">
                                <i className="material-icons opacity-10">person</i>
                            </div>
                            <div className="text-start">
                                <p className="text-sm mb-0 text-capitalize">Today New Students</p>
                                <h4 className="mb-0">-</h4>
                            </div>
                            </div>
                            <hr className="dark horizontal my-0" />
                            <div className="card-footer p-3">
                            <p className="mb-0"><span className="text-danger text-sm font-weight-bolder">- </span> added today</p>
                            </div>
                        </div>
                        </div>

                        <div className="col-xl-3 col-sm-6">
                            <div className="card">
                            <div className="card-header p-3 pt-2 d-flex align-items-center">
                                <div className="icon icon-lg icon-shape bg-gradient-info shadow-info text-center border-radius-xl me-3">
                                <i className="material-icons opacity-10">weekend</i>
                                </div>
                                <div className="text-start">
                                <p className="text-sm mb-0 text-capitalize">Total Leads</p>
                                <h4 className="mb-0">{datav[0]?.total_leads??0}</h4>
                                </div>
                            </div>
                            <hr className="dark horizontal my-0" />
                            <div className="card-footer p-3">
                                <p className="mb-0"><span className="text-success text-sm font-weight-bolder">+{datav[0]?.today_lead??0} </span>added today</p>
                            </div>
                            </div>
                        </div>
                        </div>

                    <div className="row mt-4">
                        <div className="col-lg-6 col-md-6 mt-4 mb-4">
                        <div className="card z-index-2 ">
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                                <BarChart  data={datas} dataLable={['Completed', 'Not-Completed']}/>
                            </div>
                            <div className="card-body">
                            <h6 className="mb-0 ">Graphical Task Report</h6>
                            <p className="text-sm ">Updated Graph Report from {firstDateOfYear.toDateString()} to {lastDateOfYear.toDateString()}</p>
                            <hr className="dark horizontal" />
                            </div>
                        </div>
                        </div>
                        
                        <div className="col-lg-6 col-md-6 mt-4 mb-4">
                            <div className="card z-index-2 ">
                                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                                    <BarChart  data={datav} dataLable={['Interested', 'Not-Intrested']}/>
                                </div>
                                <div className="card-body">
                                <h6 className="mb-0 ">Graphical Lead Report</h6>
                                <p className="text-sm ">Updated Graph Report from {firstDateOfYear.toDateString()} to {lastDateOfYear.toDateString()}</p>
                                <hr className="dark horizontal" />
                                </div>
                            </div>
                            </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-lg-8 col-md-6 mb-md-0 mb-4">

                      {/* ONLINE API DATA FETCH START */}
                        <div className="card">
                            <div className="card-header pb-0">
                            <div className="row">
                                <div className="col-lg-6 col-7">
                                <h6>Today New Leads</h6>
                                <p className="text-sm mb-0">
                                    <i className="fa fa-check text-info" aria-hidden="true"></i>
                                    <span className="font-weight-bold ms-1">{newLeadData?.length} Records Fetched</span>
                                </p>
                                </div>
                                <div className="col-lg-6 col-5 my-auto text-end">
                                <div className="dropdown float-lg-end pe-4">
                                    <a className="cursor-pointer" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa fa-ellipsis-v text-secondary"></i>
                                    </a>
                                    <ul className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5" aria-labelledby="dropdownTable">
                                    <li><a className="dropdown-item border-radius-md" href="javascript:;">Action</a></li>
                                    <li><a className="dropdown-item border-radius-md" href="javascript:;">Another action</a></li>
                                    <li><a className="dropdown-item border-radius-md" href="javascript:;">Something else here</a></li>
                                    </ul>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="card-body px-0 pb-2">
                            <TableComponent editRoute='/addlead' updateDataTable={updateDataTable} isLoading={isLoading} show={show} tableHead={tableHeading} tableData={newLeadData ?? []}/>
                          </div>
                        </div>

                        {/* ONLINE API DATA FETCH END */}
                    </div>
                       
                       {/* TASK LIST START HERE */}
                        <div className="col-lg-4 col-md-6">
                            <div className="card h-100">
                                <div className="card-header pb-0">
                                <h6>Task List</h6>
                                <p className="text-sm">
                                    <i className="fa fa-check text-info" aria-hidden="true"></i>
                                    <span className="font-weight-bold"> {taskData.length}</span> New Task Assigned
                                </p>
                                </div>
                                <div className="card-body p-3">
                                <div className="timeline timeline-one-side">
                                 
                                {taskData.map(value => (
                                    <div className="timeline-block mb-3">
                                        <span className="timeline-step">
                                            <i className="material-icons text-success text-gradient">notifications</i>
                                        </span>
                                        <div className="timeline-content">
                                            <h6 className="text-dark text-sm font-weight-bold mb-0">{value.task}</h6>
                                            <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">{value.assigned_date}</p>
                                            <p className="text-secondary font-weight-bold text-xs mt-1 mb-0"><input type="checkbox" onChange={(e) => handleUpdateCheckBox(e, value.RecordID)} value={value.RecordID} checked={value.status == 1} /> Is Completed</p>
                                        </div>
                                    </div>
                                ))}
                                </div>
                                </div>
                            </div>
                        </div>

                        {/* TASK LIST END HERE */}
                    </div>
          </>
      )

}

export default Dashboard