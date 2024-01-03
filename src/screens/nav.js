import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "./auth/context";

const Navigation = () => {
    const location = useLocation();

    const currentRoute = location.pathname;
    const {roleid} =  useAuth();
   return (
      <>
          <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-2 fixed-start ms-3 bg-gradient-dark ps" id="sidenav-main">
                <div class="sidenav-header">
                    <i class="fas fa-times p-4 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
                    <a class="navbar-brand m-0" href="" target="_blank">
                    <img src="../LOGO.png" class="navbar-brand-img h-100" alt="main_logo" /><br />
                    <span class="ms-1 font-weight-bold text-white py-2">Leads Management</span>
                    </a>
                </div>

                <hr class="horizontal light mt-0 mb-2" />
                   <div class="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
                      <ul class="navbar-nav">
                            <li class="nav-item">
                                <NavLink to={'/'}>
                                    <a className={`nav-link text-white ${currentRoute == '/' ? 'active bg-gradient-primary' : ''}`}>
                                                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                                    <i class="material-icons opacity-10">dashboard</i>
                                                </div>
                                        <span class="nav-link-text ms-">Dashboard</span>
                                    </a>
                                </NavLink>
                                </li>

                            <li class="nav-item">
                              <NavLink to={'/leads'}>
                                <a className={`nav-link text-white ${currentRoute == '/leads' || currentRoute == '/addlead' || currentRoute == '/editlead' ? 'active bg-gradient-primary' : ''}`}>
                                            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                                <i class="material-icons opacity-10">table_view</i>
                                            </div>
                                    <span class="nav-link-text ms-">Leads</span>
                                </a>
                              </NavLink>
                            </li>
                                
                            {roleid == 1 ?
                                <>
                                    <li class="nav-item">
                                    <NavLink to={'/tasks'}>
                                        <a className={`nav-link text-white ${currentRoute == '/tasks' || currentRoute == '/addtask' || currentRoute == '/edittask' ? 'active bg-gradient-primary' : ''}`}>
                                                    <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                                        <i class="material-icons opacity-10">receipt_long</i>
                                                    </div>
                                            <span class="nav-link-text ms-">Tasks</span>
                                        </a>
                                    </NavLink>
                                    </li>
                                    <li class="nav-item">
                                        <NavLink to={'/upload'}>
                                            <a className={`nav-link text-white ${currentRoute == '/upload' || currentRoute == '/uploadlead' ? 'active bg-gradient-primary' : ''}`}>
                                                        <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                                            <i class="material-icons opacity-10">view_in_ar</i>
                                                        </div>
                                                <span class="nav-link-text ms-">Upload Data</span>
                                            </a>
                                        </NavLink>
                                    </li>
                                    <li class="nav-item">
                                        <NavLink to={'/users'}>
                                            <a className={`nav-link text-white ${currentRoute == '/users' || currentRoute == '/adduser' || currentRoute == '/edituser' ? 'active bg-gradient-primary' : ''}`}>
                                                        <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                                        &nbsp;<i class="fa fa-user opacity-10">&nbsp;</i>
                                                        </div>
                                                <span class="nav-link-text ms-">User & Roles</span>
                                            </a>
                                        </NavLink>
                                    </li>
                                    <li class="nav-item">
                                        <NavLink to={'/logs'}>
                                            <a className={`nav-link text-white ${currentRoute == '/logs' ? 'active bg-gradient-primary' : ''}`}>
                                                        <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                                            &nbsp;<i class="fa fa-file-archive-o opacity-10">&nbsp;</i>
                                                        </div>
                                                <span class="nav-link-text ms-">Users Logs</span>
                                            </a>
                                        </NavLink>
                                    </li>
                                </>
                                : '' }
                       </ul>
                    </div>
           </aside>
           
      </>

   )
}

export default Navigation