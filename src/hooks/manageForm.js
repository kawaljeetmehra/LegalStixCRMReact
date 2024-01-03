import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import useAddAPI from "./add";
import useEditAPI from "./edit";


const useFormMethods = (route, nextRoute) => {
    const [showDate, setshowDate] = useState();
    const navigate = useNavigate();
    const [postData, response, error] =  useAddAPI(route, nextRoute);
    const [postUpdateData, response_edit, error_edit] =  useEditAPI(route, nextRoute);
    const [dateState, setdateState] = useState();
    const [isSubmitted, setisSubmitted] = useState(false)

    const handleShowDatePicker = (e) => {
          if(e.target.value == '1'){
                setshowDate(1)
          }else{
                setshowDate(0)
          }
    }

    
    useEffect(() => {
      setisSubmitted(false)
    })

    const handleisSubmitted = (v) => {
         setisSubmitted(true)
         //setisSubmitted(false)
    }


    const handleSubmitForm = async (e) => {
           e.preventDefault()
            const formData = new FormData(e.target);
            const formValues = {};

            const valueArr = [];
            var keyExists = false;
            var keypair;
            for (let [key, value] of formData.entries()) {
                  if(key == 'remarks[]' || key == 'category_id[]'){
                        keypair = key.replace('[]', '');
                        valueArr.push(value);
                        keyExists = true;
                               // formValues['remarks'] = JSON.stringify(value);
                  }else{
                       formValues[key] = value;
                  }
            }

            
            if(keyExists){
                   formValues[keypair] = JSON.stringify(valueArr);
            }

            const keys = Object.keys(formValues);
            
            if(keys.includes('follow_up')){
                  formValues['follow_up'] = dateState;
            }else{
                  formValues['appointment_date'] = dateState;
            }
            formValues['eta'] = dateState;
            postData(formValues);
    }

    const new_handleSubmitForm = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const formValues = {};
      
      const convertToDate = (dateString) => {
            const [day, month, year] = dateString.split('/').map(Number);
          
            // Ensure the received values represent a valid date
            const date = new Date(Date.UTC(year, month - 1, day, 0, 0, 0)); // Setting hours to zero
          
            // Check if the date is valid
            if (
              isNaN(date) ||
              date.getUTCDate() !== day ||
              date.getUTCMonth() + 1 !== month ||
              date.getUTCFullYear() !== year
            ) {
              return null; // Return null for invalid dates
            }
            
            const formattedDate = date.toISOString().split('T')[0];
            return formattedDate;
          };

          for (let [key, value] of formData.entries()) {
            if (key === 'start_date' || key === 'end_date') {
              formValues[key] = convertToDate(value);
            } else {
              formValues[key] = value;
            }
          }
                    
          postUpdateData(formValues);
      
      }


    const handleUpdateSubmitForm = async (e) => {
            e.preventDefault()
            const formData = new FormData(e.target);
            const formValues = {};
            
            const valueArr = [];
            var keyExists = false;
            var keypair;
            for (let [key, value] of formData.entries()) {
                  if(key == 'remarks[]' || key == 'category_id[]'){
                        keypair = key.replace('[]', '');
                        valueArr.push(value);
                        keyExists = true;
                               // formValues['remarks'] = JSON.stringify(value);
                  }else{
                       formValues[key] = value;
                  }
            }

            
            if(keyExists){
                   formValues[keypair] = JSON.stringify(valueArr);
            }

            //debugger;

            const keys = Object.keys(formValues);

            if(keys.includes('follow_up')){
                  formValues['follow_up'] = dateState;
            }else{
                  formValues['appointment_date'] = dateState;
            }
            formValues['eta'] = dateState;
            //console.log(formValues)
            postUpdateData(formValues);
      }


    const handleDateValue = (v) => {
            const date = new Date(v);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const day = String(date.getDate()).padStart(2, '0');
      
            const formattedDate = `${year}-${month}-${day}`;
             setdateState(formattedDate)
    }

    return [showDate, dateState, setdateState, isSubmitted, setisSubmitted, handleShowDatePicker, handleisSubmitted, handleUpdateSubmitForm, handleSubmitForm, handleDateValue, new_handleSubmitForm]
}

export default useFormMethods;