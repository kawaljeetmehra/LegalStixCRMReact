import React, { useEffect, useState } from "react"

const SearchComponent = (props) => {
      const [data, setData] = useState([]);
      const [shouldUseEffectRun, setshouldUseEffectRun] = useState(false)

      useEffect(() => {
         if(shouldUseEffectRun == true){
               //    setData(props.data)
           }
      }, [shouldUseEffectRun])

      const handleChange = (e) => {
           const value = e.target.value;
           if(value != '' && shouldUseEffectRun == false){
                setshouldUseEffectRun(true)
                setData(props.data)
           }
           console.log(data)
           const filter_data = data.filter(({ name, details }) => {
            const nameMatch = name.toLowerCase().includes(value.toLowerCase());
            const phoneNumberMatch = details && typeof details.phoneNumber === 'number' && details.phoneNumber.toString().includes(value);
            return nameMatch || phoneNumberMatch;
          });
          
                   

           if(Array.isArray(filter_data) && filter_data.length == 0 && value == '') props.setData(data)
           if(Array.isArray(filter_data)) props.setData(filter_data)
      }
     
      return (
          <>
             <div className="col-md-3 mb-2">
                <input type="text" onChange={handleChange} placeholder="Search..." className="form-control" style={{backgroundColor: 'white', padding: "8px"}}/>
             </div>
          </>
      )
}

export default SearchComponent;