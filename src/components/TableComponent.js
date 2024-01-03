import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import useDeleteAPI from "../hooks/delete";
import Loader from "./loader";
import UserMap from "../hooks/map";

const TableComponent = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [postData, response, error] = useDeleteAPI(props.deleteRoute);
  
  const showConfirmBox = (name, RecordID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
          if(props.table){
                postData({RecordID:RecordID, table: props.table});
          }else{
                postData({RecordID:RecordID});
          }
        props.updateDataTable(RecordID);
        Swal.fire("Deleted!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("It's not deleted", "", "info");
      }
    });
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  let currentItems = [];
  if (props.show && Array.isArray(props.tableData) && props.tableData.length > 0) {
    currentItems = props.tableData ? props.tableData.slice(indexOfFirstItem, indexOfLastItem) : [];
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };



  return (
    <>
      <div className="table-responsive p-0">
        <table className="table align-items-center mb-0">
          <thead>
            <tr>
              {props.tableHead.map((element, index) => (
                <th key={index} className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{element}</th>
              ))}
            </tr>
          </thead>
          <tbody>
          {props.isLoading ? (
              <tr>
                <td colSpan={props.tableHead.length} style={{paddingLeft: '45%'}}>
                       <Loader />
                </td>
              </tr>
            ) : (
              <>
            {props.show && currentItems.map((value, key) => (
              <tr key={key}>
                {Object.entries(value).map(([key, data], index) => (
                  <td key={index}>
                    {key === 'status' ? (
                      data === 1 ? (
                        <span className="badge badge-sm bg-gradient-success">Closed</span>
                      ) : (
                        <span className="badge badge-sm bg-gradient-warning">Open</span>
                      )
                    ) :
                    key === 'location' ? (
                      <>
                        {data == null || data == ' ' || data == '' ? "":
                          <UserMap latitude={data['latitude']} longitude={data['longitude']} />
                    }
                      </>
                    ) : key === 'name' && props.showTableNameImage ? (
                      <div className="d-flex px-2 py-1">
                        <div>
                          <img src="../assets/img/team-2.jpg" className="avatar avatar-sm me-3 border-radius-lg" alt="user1" />
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                          <span className="text-secondary text-xs font-weight-bold">{data}</span>
                        </div>
                      </div>
                    ) : key === 'RecordID' ? (
                      <div className="d-flex px-2 py-1">
                        <button onClick={() => showConfirmBox(value.name, value.RecordID)} type="button" className="btn btn-danger btn-sm" title="delete">
                          <i className="fa fa-trash-o"></i>
                        </button>
                        &nbsp;&nbsp;
                        <Link to={{ pathname: props.editRoute, search: '?id=' + data }} className="btn btn-success btn-sm" title="edit">
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                    ) : key === 'convert' ? (
                        <Link to={{ pathname: props.editRoute, search: '?id=' + data }} className="btn btn-success btn-sm" title="Convert to Lead">
                          <i className="fa fa-user"></i>
                        </Link>
                    ): typeof data === "object" ? (
                      <>
                        <p className="text-xs font-weight-bold mb-0">{Object.values(data)[0]}</p>
                        <p className="text-xs text-secondary mb-0">{Object.values(data)[1]}</p>
                      </>
                    ) : (
                      <span className="text-secondary text-xs font-weight-bold">{data}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
            
            {props.tableData.length == 0 && (
              <tr>
                <td colSpan={props.tableHead.length} style={{fontSize: '15px'}}><b>No Record Found</b></td>
              </tr>
              )}
              </>
            )}
          </tbody>
        </table>
      </div>
      {props.show && Array.isArray(props.tableData) && (
          <ul className="pagination" style={{marginLeft: '20px', color: 'white'}}>
            {Array.from({ length: Math.ceil(props.tableData.length / itemsPerPage) }, (_, i) => (
              (Math.abs(currentPage - (i + 1)) <= 2 || i === 0 || i === Math.ceil(props.tableData.length / itemsPerPage) - 1) && (
                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <button  onClick={() => paginate(i + 1)} className="page-link">
                    {i + 1}
                  </button>
                </li>
              )
            ))}
          </ul>
        )}
    </>
  );
};

export default TableComponent;
