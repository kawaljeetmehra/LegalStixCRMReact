import React, { useEffect, useState } from "react"
import { FormBodyComponent, FormInput, RadioInput, SelectInput, TextAreaComp } from "../../components/FormComponent";
import { DateInput } from "../../components/FormComponent";
import useFormMethods from "../../hooks/manageForm";
import { useLocation } from "react-router-dom";
import useFetchApi from "../../hooks/leadfetch";

const EditTask = () => {
    const [
      showDate,
      dateState,
      setdateState,
      isSubmitted,
      setisSubmitted,
      handleShowDatePicker,
      handleisSubmitted,
      handleUpdateSubmitForm,
      handleSubmitForm,
      handleDateValue,
    ] = useFormMethods('lead/edittask', '/tasks');
  
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const idParam = queryParams.get("id");
  
    const { leadData: taskData, error: taskError } = useFetchApi('lead/fetchtask');
    const { leadData: usersData, error: usersError } = useFetchApi('lead/users', 'get');
  
    const [data, setData] = useState();
    const [datas, setDatas] = useState([]);
  
    useEffect(() => {
      if (!taskData || !Array.isArray(taskData.data)) return;
  
      const filteredData = taskData.data.filter(item => item.RecordID === Number(idParam));
      setData(filteredData[0]);
    }, [taskData, idParam]);
  
    useEffect(() => {
      if (!usersData || !Array.isArray(usersData.data)) return;
  
      const fetchedDatas = usersData.data.map(item => ({
        id: `${item.RecordID ?? ''}`,
        name: `${item.username ?? ''}`,
      }));
  
      setDatas(fetchedDatas);
    }, [usersData]);
    console.table(data)
    
      return (
              <>
                   <FormBodyComponent heading="Edit Task" subheading="Enter details to edit existing task">
                         <form role="form" class="text-start" onSubmit={handleUpdateSubmitForm}>

                              <div className="row mb-4">
                                      <input type="hidden" value={data?.RecordID??''} name="RecordID" />
                                      <FormInput name="Task" value={data?.task??''} type="text"  nameAttr="task" col="6" handleisSubmitted={handleisSubmitted} isSubmitted={isSubmitted} required/>
                              </div>

                              <div className="row mb-4">
                                     <SelectInput name="Assigned To" value={data?.AssignedTo??''}  SelectData={datas}  nameAttr="assigned_to" col="6" handleisSubmitted={handleisSubmitted} isSubmitted={isSubmitted} required/>
                              </div>
  
                              <div className="row mb-4">
                                    <RadioInput name="Status" value={data?.status??''} Radio1="Completed" Radio2="Not-Completed" nameAttr="status" col="6"/>
                              </div>
                              
                              <div className="row mb-4">
                                      <DateInput col="8" handleDateValue={handleDateValue} value={data?.eta??''} name="ETA"/>
                              </div>

                              <div className="row mb-4">
                                     <TextAreaComp name="Remarks" value={data?.remarks??''} nameAttr="remarks"  />
                              </div>
  
                              <div class="text-center">
                                  <button type="submit" onClick={handleisSubmitted} class="btn bg-gradient-primary w-100 my-4 mb-2">Submit</button>
                              </div>
                         </form>
                   </FormBodyComponent>
              </>
      )
}

export default EditTask;