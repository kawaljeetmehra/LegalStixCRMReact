import React, { useEffect, useReducer, useState } from "react"
import { FormBodyComponent, FormInput, RadioInput, SelectInput, TextAreaComp } from "../../components/FormComponent";
import { DateInput } from "../../components/FormComponent";
import useFormMethods from "../../hooks/manageForm";
import { useLocation } from "react-router-dom";
import useGetLatestLead from "../../hooks/getlateslead";
import useGetCategory from "../../hooks/getCategory";
import useUserLocation from "../../hooks/getlocation";
import { useAuth } from "../auth/context";

const reducer = (state, action) => {
      switch(action.type) {
          case "ADD": 
              return {count: state.count + 1 };
          case "set":
              return { ...state, count: action.value };
          default:
              return state;
      }
  }
  

const initalState = {
       count: 1,
}

const AddLeads = () => {
    
    const [showDate, dateState, setdateState, isSubmitted, setisSubmitted, handleShowDatePicker, handleisSubmitted, handleUpdateSubmitForm, handleSubmitForm, handleDateValue]= useFormMethods('lead/generateLead', '/leads')
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const idParam = queryParams.get("id");

    const [newLeadData, show, isLoading] = useGetLatestLead();
    const [data] = useGetCategory();
    const [value, setValue] = useState([]);
    const [state, dispatch] = useReducer(reducer, initalState);
    const {name} = useAuth();


    useEffect(() => {
            if (!newLeadData || !Array.isArray(newLeadData)) return;
            
            const data = newLeadData.filter(element => element.convert === Number(idParam));

            setValue(data);
    }, [newLeadData, idParam]);


    const userLocation = JSON.stringify(useUserLocation());
    return (
            <>
                  <FormBodyComponent heading="Create Lead" subheading="Enter details to create new lead">
                         <form role="form" class="text-start" onSubmit={handleSubmitForm}>

                         <div className="row mb-1">
                                      <input type="hidden" name="created_by" value={name} />
                                      <input type="hidden" name="location" value={userLocation} />
                                      <FormInput name="First Name" type="text" value={value[0]?.name??''}  nameAttr="first_name" col="4" handleisSubmitted={handleisSubmitted} isSubmitted={isSubmitted} required/>
                                      <RadioInput name="Gender" Radio1="Male" Radio2="Female" nameAttr="gender" col="4"/>
                                      <FormInput name="Email" type="email" value={value[0]?.email??''}   nameAttr="email" col="4"/>
                              </div>
  
                              <div className="row mb-1">
                                     <FormInput name="Phone Number" type="number" value={value[0]?.phone??''}  nameAttr="phoneNo"  col="4" handleisSubmitted={handleisSubmitted} isSubmitted={isSubmitted} required/>
                                     <FormInput name="Highest Qualification" type="text" nameAttr="qualification"  col="4"/>
                                     <RadioInput name="Query"  Radio1="Closed" Radio2="Open" value="2" nameAttr="status" col="4"/>
                              </div>
  
                              <div className="row mb-1">
                                    <FormInput name="Father Name" type="text" nameAttr="father_name"  col="4" handleisSubmitted={handleisSubmitted} isSubmitted={isSubmitted} required/>
                                    <FormInput name="Father Mobile Number" type="number" nameAttr="father_phoneNo"  col="4"/>
                                    <FormInput name="Mother Name" type="text" nameAttr="mother_name"  col="4"/>
                              </div>
  
                              <div className="row mb-1">
                                    <FormInput name="Mother Mobile Number" type="number" nameAttr="mother_phoneNo"  col="4"/>
                                    <FormInput name="Aadhar Number" type="number"  nameAttr="aadhar_number" col="4"/>
                                    <FormInput name="Pan Card Number" type="number"  nameAttr="pan_number" col="4"/>
                              </div>
  
                              {/* <div className="row mb-1">
                                     <SelectInput name="Country" SelectData={[{id:1, name:'Option 1'}, {id:100, name:'Option 2'}]}  nameAttr="country_id" col="4" />
                                     <SelectInput name="State" SelectData={[{id:1, name:'Option 1'}, {id:100, name:'Option 2'}]}  nameAttr="state_id" col="4" />
                                     <SelectInput name="City" SelectData={[{id:1, name:'Option 1'}, {id:100, name:'Option 2'}]}  nameAttr="city_id" col="4" />
                              </div> */}
  
                              <div className="row mb-1">
                                    <SelectInput name="Category" SelectData={data}  nameAttr="category_id" col="4"/>
                                    <SelectInput name="Lead Stage" SelectData={[{id:1, name:'Hot'}, {id:2, name:'Cold'}, {id:3, name:'Warm'}]}   nameAttr="stage" col="4" handleisSubmitted={handleisSubmitted} isSubmitted={isSubmitted} required/>
                                    <SelectInput name="Eligiblity" SelectData={[{id:1, name:'Eligible'}, {id:0, name:'Not Eligible'}]}  nameAttr="eligiblity" col="4" handleisSubmitted={handleisSubmitted} isSubmitted={isSubmitted} required/>
                              </div>
  
                              <div className="row mb-1">
  
                                    <div className="col-md-4">
                                          <p><b style={{fontSize: '13px'}}>Book Counselling:</b></p>
                                          <div class="form-check form-check-inline" style={{marginTop: '-10px'}}>
                                              <input class="form-check-input" type="radio" checked={showDate == 1} onChange={(e) => handleShowDatePicker(e)} name="book_counselling" id="yes" value="1" />
                                              <label class="form-check-label" for="open">Yes</label>
                                          </div>
                                          <div class="form-check form-check-inline" style={{marginTop: '-10px'}}>
                                              <input class="form-check-input" type="radio" checked={showDate == 0}  onChange={(e) => handleShowDatePicker(e)} name="book_counselling" id="no" value="0" />
                                               <label class="form-check-label" for="no">No</label>
                                          </div>
                                    </div>
                                    {showDate == 1 ? 
                                          <DateInput col="4" handleDateValue={handleDateValue} value={data?.appointment_date??''} name="appointment_date"/>
                                     :  <DateInput col="4" handleDateValue={handleDateValue} value={data?.follow_up??''} name="Follow Up Date" AttrName="follow_up"/>}
  
                                    <FormInput name="Source" type="text" value={value[0]?.source??''} nameAttr="source"  col="4"/>
  
                              </div>

                              <div className="row mb-1 mt-2">
                                    <div className="col-md-3">
                                          <button type="button" onClick={() => dispatch({ type: 'ADD' })} className="btn btn-warning">
                                                <i className="fa fa-plus">&nbsp; &nbsp;</i>Add Remark
                                          </button>
                                    </div>
                              </div>

                              <div className="row mb-1">
                                    {Array.from({ length: state.count }, (_, index) => (
                                          <TextAreaComp key={index}  name={`Remarks ${index + 1}`} nameAttr="remarks[]" value={JSON.parse(data?.remarks??"[]")[index] ?? ''} />
                                     ))}
                              </div>
  
                              <div class="text-center">
                                  <button type="submit" onClick={handleisSubmitted} class="btn bg-gradient-primary w-100 my-4 mb-2">Submit</button>
                              </div>
                         </form>
                   </FormBodyComponent>
            </>
    )
}

export default AddLeads;