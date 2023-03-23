import React from 'react';

const Calendar = ({ startDate, endDate }) => {
    const days = [];
    const date = new Date(startDate.getTime());

    while (date <= endDate) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }

    return (
        <div className="calendar">
            {days.map((day) => (
                <div className="day" key={day.toISOString()}>
                    {day.getDate()}
                </div>
            ))}
        </div>
    );
}

export default Calendar;
