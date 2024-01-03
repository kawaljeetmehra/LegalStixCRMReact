import React, { useEffect, useState } from "react"
import { FormBodyComponent, FormInput, RadioInput, SelectInput, TextAreaComp } from "../../components/FormComponent";
import { DateInput } from "../../components/FormComponent";
import useFormMethods from "../../hooks/manageForm";
import { useLocation } from "react-router-dom";
import useFetchApi from "../../hooks/leadfetch";
import useGetCategory from "../../hooks/getCategory";

const EditUser = () => {
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
    ] = useFormMethods('lead/edit', '/users');
  
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const idParam = queryParams.get("id");
  
    const { leadData: userData, error: userError } = useFetchApi('lead/showData/', 'post', idParam, 'users');
  
    const [data, setData] = useState();
    const [datas, setDatas] = useState([]);

    const { leadData: usersData, error: usersError } = useFetchApi('lead/showData', 'post', '', 'roles');

    useEffect(() => {
      if (!userData || !Array.isArray(userData.data)) return;
  
      const fetchedData = userData.data.map(item => {
        const id = `${item.RecordID ?? ''}`;
        const name = `${item.name ?? ''}`;
        const roleID = `${item.role_id ?? ''}`;
        const username = `${item.username ?? ''}`;
        const password = `${item.password ?? ''}`;
        const status = `${item.status ?? ''}`;
        const category_value = JSON.parse(item.category_id);

        return {
            id,
            name,
            roleID,
            username,
            password,
            status,
            category_value
        }
      });
  
      setData(fetchedData[0]);
    }, [userData]);

    useEffect(() => {
        if (!usersData || !Array.isArray(usersData.data)) return;
    
        const fetchedData = usersData.data.map(item => ({
          id: `${item.RecordID ?? ''}`,
          name: `${item.name ?? ''}`,
        }));
    
        setDatas(fetchedData);
      }, [usersData]);


    
      const [CategoryData] = useGetCategory();
      return (
              <>
                   <FormBodyComponent heading="Edit User" subheading="Enter details to edit existing user">
                         <form role="form" class="text-start" onSubmit={handleUpdateSubmitForm}>

                              <div className="row mb-4">
                                      <input type="hidden" value={'users'} name="table" />
                                      <input type="hidden" value={data?.id??''} name="RecordID" />
                                      <FormInput name="Name" value={data?.name??''} type="text"  nameAttr="name" col="6" handleisSubmitted={handleisSubmitted} isSubmitted={isSubmitted} required/>
                              </div>

                              <div className="row mb-4">
                                     <FormInput name="User Name" value={data?.username??''} type="text"  nameAttr="username" col="6" handleisSubmitted={handleisSubmitted} isSubmitted={isSubmitted} required/>
                              </div>

                              <div className="row mb-4">
                                     <FormInput name="Password" value={data?.password??''} type="text"  nameAttr="password" col="6" handleisSubmitted={handleisSubmitted} isSubmitted={isSubmitted} required/>
                              </div>

                              <div className="row mb-4">
                                     <SelectInput name="Role" value={data?.roleID??''}  SelectData={datas}  nameAttr="role_id" col="6" handleisSubmitted={handleisSubmitted} isSubmitted={isSubmitted} required/>
                              </div>

                              <div className="row mb-4">
                                     <SelectInput name="Assign Lead Categories" value={data?.category_value??''} multiple SelectData={CategoryData}  nameAttr="category_id[]" col="6" handleisSubmitted={handleisSubmitted} isSubmitted={isSubmitted} required/>
                              </div>
  
                              <div className="row mb-4">
                                    <RadioInput name="Status" value={data?.status??''} Radio1="Active" Radio2="In-Active" nameAttr="status" col="6"/>
                              </div>
  
                              <div class="text-center">
                                  <button type="submit" onClick={handleisSubmitted} class="btn bg-gradient-primary w-100 my-4 mb-2">Submit</button>
                              </div>
                         </form>
                   </FormBodyComponent>
              </>
      )
}

export default EditUser;