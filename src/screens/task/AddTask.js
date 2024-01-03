import React, { useEffect, useState } from "react"
import { FormBodyComponent, FormInput, RadioInput, SelectInput, TextAreaComp } from "../../components/FormComponent";
import { DateInput } from "../../components/FormComponent";
import useFormMethods from "../../hooks/manageForm";
import useFetchApi from "../../hooks/leadfetch";


const AddTask = () => {

    const [showDate, dateState, setdateState, isSubmitted, setisSubmitted, handleShowDatePicker, handleisSubmitted, handleUpdateSubmitForm, handleSubmitForm, handleDateValue] = useFormMethods('lead/addtask', '/tasks')
    const { leadData, error } = useFetchApi('lead/users', 'get');
    const [data, setData] = useState([]); 
       
    useEffect(() => {
      if (!leadData || !Array.isArray(leadData.data)) return;
    
      const fetchedData = leadData.data.map(item => ({
        id:`${item.RecordID ??''}`,
        name: `${item.username ??''}`
      }));
      
    
      setData(fetchedData);
      console.log(data); 
    
    }, [leadData]);

    return (
            <>
                  <FormBodyComponent heading="Create Task" subheading="Enter details to create new task">
                         <form role="form" class="text-start" onSubmit={handleSubmitForm}>

                              <div className="row mb-4">
                                      <FormInput name="Task" type="text"  nameAttr="task" col="6" handleisSubmitted={handleisSubmitted} isSubmitted={isSubmitted} required/>
                              </div>

                              <div className="row mb-4">
                                     <SelectInput name="Assigned To" SelectData={data}  nameAttr="asssigned_to" col="6" handleisSubmitted={handleisSubmitted} isSubmitted={isSubmitted} required/>
                              </div>
  
                              <div className="row mb-4">
                                    <RadioInput name="Status"  Radio1="Completed" Radio2="Not-Completed" nameAttr="status" col="6"/>
                              </div>

                              <div className="row mb-6">
                                     <DateInput col="8" value="" handleDateValue={handleDateValue} name="ETA"/>
                              </div>

                              <div className="row mb-4">
                                  <TextAreaComp name="Remarks" nameAttr="remarks"  />
                              </div>
  
                              <div class="text-center">
                                  <button type="submit" onClick={handleisSubmitted} class="btn bg-gradient-primary w-100 my-4 mb-2">Submit</button>
                              </div>
                         </form>
                   </FormBodyComponent>
            </>
    )
}

export default AddTask;