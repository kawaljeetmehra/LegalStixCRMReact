import React from "react";
import TableComponent from "./TableComponent";
import 'animate.css';

const ShowTableComp = ({children, heading}) => {

       return (
            <>
                <div className="row">
                   <div className="col-12">
                      <div className="card my-4">
                        <div className="card-header p-0 position-relative mt-n4 mx-2 z-index-2">
                        <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                        <h6 className="text-white text-capitalize ps-3 animate__animated animate__bounce">{heading}</h6>
                        </div>
                      </div>
                    <div className="card-body px-0 pb-2">
                       <div className="table-responsive p-0"></div>
                               {children}
                        </div>
                    </div>
                  </div>
                </div>
            </>
       )
}

export default ShowTableComp;