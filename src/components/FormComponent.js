import { elements } from "chart.js";
import React, { Children, useEffect, useRef, useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css'; // Import toastr styles

export const FormInput = (props) => {
      const {name, type, nameAttr, col, handleisSubmitted, isSubmitted, value} = props;
      const inputRef = useRef();

      useEffect(() => {
           if(isSubmitted && props.required){
                const val = inputRef.current.value;

                if(val == '') toastr.info(name+' is mandatry', 'Info');
           }
      })

     const [val, setval] = useState(props.value);
     
     useEffect(() => {
        setval(props.value)
   }, [props.value])

      return (
          <>
             <div className={"mb-2 col-md-"+col}>
                <p><b style={{fontSize: '13px'}}>{name}</b></p>
               <div className="input-group input-group-outline" style={{marginTop: '-10px'}}>
                    <input type={type} onChange={(e) => setval(e.target.value)} ref={inputRef} value={val} class="form-control" required={props.required} name={nameAttr} placeholder={name}/>
                </div>
             </div>
          </>
      )
}


export const RadioInput = (props) => {
     const {name, Radio1, Radio2, nameAttr, value, col} = props;
     const [val, setval] = useState(value);
     const handleChange = (e) => {
          if(e.target.value == 0){
                setval(0)
          }else{
                setval(1)
          }
     }

     useEffect(() => {
          if(value != "" || !value)
          setval(value)
     }, [value])
 
     return (
        <>
           <div className={"mb-2 col-md-"+col}>
                 <p><b style={{fontSize: '13px'}}>{name}:</b></p>
                <div className="form-check form-check-inline"  style={{marginTop: '-10px'}}>
                    <input className="form-check-input" onChange={(e) => handleChange(e)} checked={val == 1} type="radio" name={nameAttr} id={Radio1} value="1" />
                    <label className="form-check-label" for={name}>{Radio1}</label>
                </div>
                <div className="form-check form-check-inline"  style={{marginTop: '-10px'}}>
                    <input className="form-check-input" onChange={(e) => handleChange(e)} checked={val == 0} type="radio" name={nameAttr} id={Radio2} value="0" />
                        <label className="form-check-label" for={name}>{Radio2}</label>
                </div>
            </div>
        </>
     )
}


export const SelectInput = (props) => {
  const { name, SelectData, nameAttr, col, isSubmitted, required, value, multiple } = props;
  const isArray = Array.isArray(value) && value.length > 0;

  const inputRef = useRef();
  useEffect(() => {
    if (isSubmitted && required && inputRef.current.value === '') {
      toastr.info(`${name} is mandatory`, 'Info');
    }
  }, [isSubmitted, required, name]);

  return (
    <>
      <div className={`mb-2 col-md-${col}`}>
        <p><b style={{ fontSize: '13px' }}>{name}</b></p>
        <select className="form-control custom-select" multiple={multiple} ref={inputRef} required={required} name={nameAttr}>
          <option value="">****Select {name}****</option>
          {SelectData.map((element) => (
            <option
              key={element.id}
              value={element.id}
              selected={isArray ? value.includes(String(element.id)) : value == element.id}
            >
              {element.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};





export const DateInput = (props) => {
    const {col, name, AttrName, handleDateValue, value} = props
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = date => {
        handleDateValue(date)
        setSelectedDate(date);
    };

    useEffect(() => {
         if(value == "" || value < 0) return;
         const date = new Date(value);
         setSelectedDate(date);
         handleDateValue(date)
    }, [value])

      return (
          <>
            <div className={"col-md-"+col}>
                <label htmlFor="exampleFormControlTextarea1">
                  <b>{name}</b>
                </label><br />
                <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy" // Customize date format if needed
                        placeholderText={"Select "+name}
                        className="form-control custom-select"
                        name={AttrName}
                    />
            </div>
          </>
      )
}


export const TextAreaComp = (props) => {
    const { name, nameAttr, value } = props;
    const [val, setVal] = useState(value || ''); // Use value prop or default to empty string
  
    useEffect(() => {
      console.log(value);
      setVal(value || ''); // Update val state if value prop changes
    }, [value]);
  
    const handleChange = (e) => {
      setVal(e.target.value); // Update val state when textarea value changes
    };
  
    return (
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">
            <b>{name}</b>
          </label>
          <textarea
            className="form-control custom-select"
            name={nameAttr}
            id="exampleFormControlTextarea1"
            rows="3"
            disabled={props.disabled}
            value={val} // Bind textarea value to the state variable val
            onChange={handleChange} // Update val state when textarea changes
          ></textarea>
        </div>
      </div>
    );
  };
  


export const FormBodyComponent = ({ children, ...props }) => {
     return (
         <>
                <div class="row">
                   <div class="col-12">
                      <div class="card my-4">
                            <div class="card-header justify-content-left">
                                <h4 class="font-weight-bolder text-start">{props.heading}</h4>
                                <p class="mb-0 text-start">{props.subheading}</p>
                            </div>

                      <div class="card-body">{children}</div>
                      </div>
                    </div>
                   </div>
         </>
     )
}