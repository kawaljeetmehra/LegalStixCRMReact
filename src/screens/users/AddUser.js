import React, { useEffect, useState } from "react"
import { FormBodyComponent, FormInput, RadioInput, SelectInput, TextAreaComp } from "../../components/FormComponent";
import { DateInput } from "../../components/FormComponent";
import useFormMethods from "../../hooks/manageForm";
import { useLocation } from "react-router-dom";
import useFetchApi from "../../hooks/leadfetch";
import useGetCategory from "../../hooks/getCategory";

const AddUser = () => {
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
    ] = useFormMethods('lead/add', '/users');
  
    const location = useLocation();
  
    const [datas, setDatas] = useState([]);

    const { leadData: usersData, error: usersError } = useFetchApi('lead/showData', 'post', '', 'roles');
    const [data] = useGetCategory();

    useEffect(() => {
        if (!usersData || !Array.isArray(usersData.data)) return;
    
        const fetchedData = usersData.data.map(item => ({
          id: `${item.RecordID ?? ''}`,
          name: `${item.name ?? ''}`,
        }));
    
        setDatas(fetchedData);
      }, [usersData]);

    
      return (
              <>
                   <FormBodyComponent heading="Add User" subheading="Enter details to add new user">
                         <form role="form" class="text-start" onSubmit={handleSubmitForm}>

                              <div className="row mb-4">
                                      <input type="hidden" value={'users'} name="table" />
                                      <FormInput name="Name" type="text"  nameAttr="name" col="6" handleisSubmitted={handleisSubmitted} isSubmitted={isSubmitted} required/>
                                      <FormInput name="User Name" type="text"  nameAttr="username" col="6" handleisSubmitted={handleisSubmitted} isSubmitted={isSubmitted} required/>
                              </div>

                              <div className="row mb-4">
                                     <FormInput name="Password" type="text"  nameAttr="password" col="6" handleisSubmitted={handleisSubmitted} isSubmitted={isSubmitted} required/>
                                     <SelectInput name="Role" SelectData={datas}  nameAttr="role_id" col="6" handleisSubmitted={handleisSubmitted} isSubmitted={isSubmitted} required/>
                              </div>

                              <div className="row mb-4">
                                     <SelectInput name="Assign Lead Categories" multiple SelectData={data}  nameAttr="category_id[]" col="6" handleisSubmitted={handleisSubmitted} isSubmitted={isSubmitted} required/>
                                     <RadioInput name="Status" Radio1="Active" Radio2="In-Active" nameAttr="status" col="6"/>
                              </div>
  
                              <div class="text-center">
                                  <button type="submit" onClick={handleisSubmitted} class="btn bg-gradient-primary w-100 my-4 mb-2">Submit</button>
                              </div>
                         </form>
                   </FormBodyComponent>
              </>
      )
}

export default AddUser;