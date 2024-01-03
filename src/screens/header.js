import React, { Children, useEffect, useState } from "react";
import Navigation from "./nav";
import FooterData from "./footer";
import { useAuth } from "./auth/context";
import Swal from 'sweetalert2';
import { NavLink } from "react-router-dom";
import useFetchApi from "../hooks/leadfetch";
import useUserLocation from "../hooks/getlocation";
import useAddAPI from "../hooks/add";
import 'animate.css';
import ErrorBoundary from "../ErrorBoundary";


const Header = ({children, heading}) => {
    const [isToggled, setIsToggled] = useState(false);
    const {logout, name} = useAuth();
    const [postData, response, error, custom_postData] = useAddAPI('lead/add');
    const userLocation = JSON.stringify(useUserLocation());

    useEffect(() => {
           const data = {
                url: window.location.href,
                screen:  window.location.pathname,
                username: name,
                location: userLocation,
                table:'logs'
           }

           custom_postData(data);
      }, [window.location.href]);

    const showNavs = () => {
        const body = document.querySelector('body');
        const bodyClasses = body.classList;
        
    
        if (!isToggled) {
    
            // Remove classes
            bodyClasses.remove('sidenav-show', 'bg-white', 'g-sidenav-hidden');
    
            // Add classes
            bodyClasses.add('g-sidenav-show', 'bg-gray-200', 'g-sidenav-pinned');
        } else {
    
            // Remove classes
            bodyClasses.remove('g-sidenav-pinned');
        }
    
        setIsToggled(!isToggled); // Toggle state
    };   

    const handleLogout = () => {
            Swal.fire({
              title: "Do You sure wanted to logout?",
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: "Logout",
              denyButtonText: `Don't Logout`
            }).then((result) => {
              if (result.isConfirmed) {
                logout()
              } else if (result.isDenied) {
                Swal.fire("You are not Logout", "", "info");
              }
            });
    }

    const { isLoggedIn, token, userid } = useAuth();
    const [taskData, setTaskDate] = useState([]);
    const { leadData: fetchTask, error: fetchTaskError } = useFetchApi('lead/fetchtask', 'post' , '/'+userid);
    
    const timeAgo = (assignedDate) => {
        const currentTime = new Date().getTime();
        const timeDifference = currentTime - assignedDate;

        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
            return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
        }
    };

    useEffect(() => {
    if (!fetchTask || !Array.isArray(fetchTask.data)) return;
    const fetchedData = fetchTask.data.map(item => ({
        task: `${item.task ??''}`,
        RecordID: `${item.RecordID ??''}`,
        assigned_date: new Date(item.created_at).getTime(), // Get timestamp
        status: item.status
        }));

        setTaskDate(fetchedData); 
    
    }, [fetchTask]);

    console.log(taskData)

     return (
         <>  
         <ErrorBoundary>
         <style>{`
                /* Example styles, adjust as needed */

                .nav-link {
                    transition: background-color 0.3s, color 0.3s;
                }

                /* Dropdown Styles */
                .dropdown-menu {
                    display: none;
                    position: absolute;
                    background-color: #fff;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                    z-index: 1000;
                }

                .nav-item:hover .dropdown-menu {
                    display: block;
                }

                .dropdown-item {
                    padding: 8px 16px;
                    color: #212529;
                    text-decoration: none;
                    display: block;
                }

                .dropdown-item:hover {
                    background-color: #f8f9fa;
                }
            `}</style>           
                <Navigation /> 
                <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg py-1">

                <nav className="navbar navbar-main navbar-expand-lg px-0 shadow-none border-radius-xl" id="navbarBlur" data-scroll="true">
                    <div className="container-fluid">
                    <div className="card bg-white border-0" style={{ width: '100%' }}>
                        <div className="card-body py-2 px-1">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb bg-white mb-0 pb-1 pt-3">
                            <li className="breadcrumb-item text-lg"><a className="opacity-5 text-dark" href="javascript:;">&nbsp;Pages</a></li>
                            <li className="breadcrumb-item text-lg text-dark active" aria-current="page">{heading}</li>
                                
                                <div className='col-md-7'></div>
                                <div className="d-flex justify-content-end">
                                <ul className="navbar-nav justify-content-end">
                                    <li className="nav-item px-3 d-flex align-items-center">
                                        <a href="javascript:;" className="nav-link text-body p-0">
                                        <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer"  style={{ fontSize: '20px' }}></i>
                                        &nbsp;&nbsp;
                                        </a>
                                    </li>
                                    <li className="nav-item dropdown pe-3 d-flex align-items-center">
                                        <a href="javascript:;" className="nav-link text-body p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                        &nbsp;&nbsp;&nbsp;
                                        {taskData.length > 0 ? (
                                            <i className="fa fa-bell cursor-pointer animate__animated animate__headShake" style={{ fontSize: '20px', color: 'red' }}></i>
                                        ) : (
                                            <i className="fa fa-bell cursor-pointer animate__animated animate__headShake" style={{ fontSize: '20px' }}></i>
                                        )}
                                            &nbsp;&nbsp;&nbsp;
                                        </a>
                                        <ul className="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
                                         {taskData.map(item => (
                                                <li className="mb-2">
                                                    <a className="dropdown-item border-radius-md" href="javascript:;">
                                                    <div className="d-flex py-1">
                                                        <div className="my-auto">
                                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkKezWBxZ_yTud1K0xXUc9WoR796ThO_SICpRwiZLPWQ&s" className="avatar avatar-sm  me-3 " />
                                                        </div>
                                                        <div className="d-flex flex-column justify-content-center">
                                                        <h6 className="text-sm font-weight-normal mb-1">
                                                            <span className="font-weight-bold">New Task Assigned</span> {item.task}
                                                        </h6>
                                                        <p className="text-xs text-secondary mb-0">
                                                            <i className="fa fa-clock me-1"></i>
                                                               {timeAgo(item.assigned_date)}
                                                        </p>
                                                        </div>
                                                    </div>
                                                    </a>
                                                </li>
                                         ))}
                                            
                                        </ul>
                                </li>
                                <li className="nav-item d-flex align-items-center position-relative">
                                    <a className="nav-link text-body font-weight-bold px-0">
                                        &nbsp;
                                        <i className="fa fa-user me-sm-1 animate__animated animate__headShake" style={{ fontSize: '19px' }}></i>
                                        <span className="d-sm-inline d-none " style={{ cursor: 'pointer' }}>{name}</span>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end mt-2 py-0">
                                        <NavLink to={'/login'}>
                                            <a className="dropdown-item">Login</a>
                                        </NavLink>
                                        <div to={'/'}>
                                            <a className="dropdown-item" onClick={handleLogout}>Logout</a>
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                                        <a href="javascript:;" className="nav-link text-body p-0" id="iconNavbarSidenav" onClick={showNavs}>
                                        <div className="sidenav-toggler-inner">
                                            <i className="sidenav-toggler-line"></i>
                                            <i className="sidenav-toggler-line"></i>
                                            <i className="sidenav-toggler-line"></i>
                                        </div>
                                        </a>
                                    </li>
                                </ul>
                                </div>
                            </ol>
                        </nav>
                        </div>
                    </div>
                    </div>
                </nav>

                <div className="container-fluid py-3">
                   
                    {children}

                    {<FooterData />}
                </div>
        </main>
        </ErrorBoundary> 
         </>
     )
}



export default Header;