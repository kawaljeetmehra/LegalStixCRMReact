import React, { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import useGetCategory from "../../hooks/getCategory";
import useAddAPI from "../../hooks/add";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css'; // Import toastr styles
import Swal from 'sweetalert2';

const UploadScreen = () => {

    const [data, show, isLoading] = useGetCategory();
    const [categoryData, setCategoryData] = useState([]);
    const [postData, response, error, custom_postData] = useAddAPI('lead/add');

    useEffect(() => {
          setCategoryData(data)
    }, [data])

    const handleFileUpload = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        let timerInterval;
            Swal.fire({
            title: "Auto close alert!",
            html: "I will close in <b></b> milliseconds.",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
            },
        });
        const file = e.target.querySelector('input[type="file"]').files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
          const data = event.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0]; // Assuming you want to read the first sheet
          const sheet = workbook.Sheets[sheetName];
          const excelData = XLSX.utils.sheet_to_json(sheet);
    
          console.log(excelData);

          const FormData = [];

            try{
                    excelData.forEach(item => {
                        const name = item.Name??'';
                        const gender = item.Gender == 'Male'? 1 : 0;
                        const email = item.EmailID??'';
                        const phoneNo = item.PhoneNo??'';
                        const status = item.Status == 'Open' ? 0: 1;
                        const qualification = item.Qualification??'';
                        const father_name = item.FatherName??'';
                        const fatherPhoneNo = item.FatherPhoneNo??'';
                        const mother_name = item.MohterName??'';
                        const motherPhoneNo = item.MotherPhoneNo??'';
                        const aadharNo = item.AadharNumber??'';
                        const pan_num = item.PanNumber??'';
                        const category = item.Category??'';
                        const stage = item.RecordStage == 'Hot' ? 1 : item.RecordStage == 'Cold' ? 2 : item.RecordStage == 'Warm' ? 3 : '';
                        const eligiblity = item.Eligiblity == 'Yes' ? 1 : 2;
                        const source = item.Source??'';
                        const remarks = JSON.stringify(new Array(item.Remarks))??'';
                        const enquiry_date = item.EnquiryDate??''; //2023-11-02
                        const IsIntrested = item.IsIntrested == 'Yes' ? 1 : '';

                        const currentTime = `CURRENT_TIMESTAMP`;

                        const created_at = 'CURRENT_TIMESTAMP';
                        const CategoryID_data = categoryData.filter(item => {
                                return item.name == category;
                        });

                        const category_id = CategoryID_data[0]?.id??'';
                        FormData.push({first_name: name, status: status, gender: gender, email: email, phoneNo: phoneNo, qualification: qualification, father_name: father_name, father_phoneNo: fatherPhoneNo, mother_name: mother_name, 
                                        mother_phoneNo: motherPhoneNo, aadhar_number: aadharNo, pan_number: pan_num, stage: stage, eligibility: eligiblity, source: source, remarks: remarks, category_id: category_id, enquiry_date:enquiry_date, IsIntrested: IsIntrested,
                                        
                                    });
                        
                    });
            }catch(error){
                      toastr.error('Message', 'Something went wrong! '+error.message);
            }

             FormData.forEach(item => {
                custom_postData({table:'leads', ...item})
             })

             Swal.close();

             toastr.success('Uploaded successfully, check Dashboard', 'success');
        };
    
        reader.readAsBinaryString(file);
      };

      const handleFileDownload = () => {
        const downloadUrl = process.env.PUBLIC_URL + '/uploadleads.xlsx';
    
        // Create an anchor element
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'uploadleads.xlsx'; // Set the file name
    
        // Simulate a click on the anchor element to trigger the download
        link.click();
      };

     return(
        <>
            <div className="row">
                 <div className="col-md-6 mb-2">  
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                    <div className="col-md-3">
                                        <i className="fa fa-list-alt" style={{fontSize:'110px'}}></i>
                                    </div>

                                    <div className="col-md-9">
                                         <form onSubmit={handleFileUpload}>
                                                <p onClick={handleFileDownload} style={{ cursor: 'pointer' }}><b>Upload Leads</b></p>
                                                <div className="input-group input-group-outline" style={{marginTop: '-10px'}}>
                                                    <input type="file" class="form-control"/>
                                                </div>
                                                <div className="input-group input-group-outline justify-content-center mt-2">
                                                    <input type="submit" className="btn btn-secondary btn-sm" value={'Upload'}/>
                                                </div>
                                         </form>
                                    </div>
                            </div>
                        </div>
                    </div>
                 </div>

                 <div className="col-md-6 mb-2">  
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                    <div className="col-md-3">
                                        <i className="fa fa-user" style={{fontSize:'105px'}}></i>
                                    </div>

                                    <div className="col-md-9">
                                         <form>
                                                <p><b>Upload User</b></p>
                                                <div className="input-group input-group-outline" style={{marginTop: '-10px'}}>
                                                    <input type="file" className="form-control"/>
                                                </div>
                                                <div className="input-group input-group-outline justify-content-center mt-2">
                                                    <input type="submit" className="btn btn-secondary btn-sm" value={'Upload'}/>
                                                </div>
                                         </form>
                                    </div>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        </>
     )
}

export default UploadScreen;