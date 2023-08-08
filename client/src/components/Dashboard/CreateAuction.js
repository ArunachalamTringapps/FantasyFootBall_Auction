import React,{useState} from 'react'
import '../../css/Dashboardcss/CreateAuction.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateAuction() {
  // const [date, setDate] = useState();
    const [date, setDate] = useState(null); // Changed initial state to null
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleDateInputClick = () => {
    setCalendarOpen(true);
  };
  return (
    <div className='createAuction'>
      <div className='Container'>
         <form className='form_createAuction'>  
        <div className='inputbox'>
            <input type="text" name="Auction_id" className='all-fields' ></input>
            <label for="email" class="label-name">
              <span className='content-name'>Auction_id...</span>
            </label>
        </div>
        <div className='inputbox'>
            <input type="text" name="Auction Name" className='all-fields' ></input>
            <label for="email" class="label-name">
              <span className='content-name'>Auction Name...</span>
            </label>
        </div>
        {/* <div className='inputbox Date'>

            <input type="date" name="Auction Date" value="" className='all-fields'></input> 
            <DatePicker placeholderText=""  className='all-fields' />
            <DatePicker selected={date} className='all-fields' onChange={(date) => setDate(date)} />

            <label for="email" class="label-name">
              <span className='content-name'>Auction Date...</span>
            </label>
        </div> */}
        <div className='inputbox Date'>
  
            <div
              className='all-fields'
              onClick={handleDateInputClick}
            >
              {date ? date.toDateString() : ''}
            </div>
            <label htmlFor="email" className="label-name">
              <span className='content-name'>Auction Date...</span>
            </label>
            {calendarOpen && (
              <DatePicker
                selected={date}
                onChange={newDate => {
                  setDate(newDate);
                  setCalendarOpen(false);
                }}
                onClickOutside={() => setCalendarOpen(false)}
                className='date-picker-calendar'
                inline
              />
            )}
          </div>
        <div className='inputbox'>
            <input type="text" name="Points Per Team" className='all-fields' ></input>
            <label for="email" class="label-name">
              <span className='content-name'>Points Per Team...</span>
            </label>
        </div>
        <div className='inputbox'>
            <input type="text" name="Players Per Team" className='all-fields' ></input>
            <label for="email" class="label-name">
              <span className='content-name'>Players Per Team...</span>
            </label>
        </div>
        <div className='inputbox'>
            <input type="email" name="Email" className='all-fields'></input>
            <label for="email" class="label-name">
              <span className='content-name'>Email_id...</span>
            </label>
        </div>
        </form>
      </div>
      <button className='bt'>Add Auction</button>
    </div>
  )
}

// export default CreateAuction
// import React, { useState } from 'react';
// import '../../css/Dashboardcss/CreateAuction.css';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// function CreateAuction() {
//   const [date, setDate] = useState(null); // Changed initial state to null
//   const [calendarOpen, setCalendarOpen] = useState(false);

//   const handleDateInputClick = () => {
//     setCalendarOpen(true);
//   };

//   return (
//     <div className='createAuction'>
//       <div className='Container'>
//         <form className='form_createAuction'>
//           {/* ...Other input fields */}
//           <div className='inputbox Date'>
//             {/* Changed input field to div with click event */}
//             <div
//               className='all-fields'
//               onClick={handleDateInputClick}
//             >
//               {date ? date.toDateString() : 'Select Auction Date'}
//             </div>
//             <label htmlFor="email" className="label-name">
//               <span className='content-name'>Auction Date...</span>
//             </label>
//             {calendarOpen && (
//               <DatePicker
//                 selected={date}
//                 onChange={newDate => {
//                   setDate(newDate);
//                   setCalendarOpen(false);
//                 }}
//                 onClickOutside={() => setCalendarOpen(false)}
//                 className='date-picker-calendar'
//                 inline // Display the calendar inline with the input
//               />
//             )}
//           </div>
//           {/* ...Other input fields */}
//         </form>
//       </div>
//       <button className='bt'>Add Auction</button>
//     </div>
//   );
// }

export default CreateAuction;
