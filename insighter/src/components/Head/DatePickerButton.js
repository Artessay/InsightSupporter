import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePickerButton.css"

const DatePickerButton = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  return (
    <>
      <button  className='DataSelect' onClick={() => setShowDatePicker(true)}>
        {selectedDate
          ? selectedDate.toLocaleDateString()
          : "v"}
      </button>
      {
        showDatePicker && (
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                // inline
                // customInput={<div />}
                popperPlacement="bottom-end"
                calendarClassName="custom-calendar-wrapper"
            />
        )
      }
    </>
  );
};

export default DatePickerButton;