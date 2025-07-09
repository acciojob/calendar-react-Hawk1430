import React, { useEffect, useState } from 'react'

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const Calender = () => {
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [editingYear, setEditingYear] = useState(false);
    const [daysMatrix, setDaysMatrix] = useState([]);

    const handleYearDoubleClick = () =>{
        setEditingYear(true);
    }

    const handleMonthChange = (e) => {
        setMonth(parseInt(e.target.value));
    }

    const handleYearChange = (e) => {
        if(e.key === 'Enter'){ 
            setYear(e.target.value)
            setEditingYear(false);
        }
    }

    useEffect(() => {
        setDaysMatrix(generateCalender(month, year));
    }, [month, year]);

    function generateCalender(month, year){
        const firstDay = new Date(month, year, 1).getDay();
        const daysInMonth = new Date(year, month+1, 0).getDate();
        let matrix = [];
        let date = 1;

        for(let i=0;i<6;i++){
            let row= [];
            for(let j=0;j<7;j++){
                if(i===0 && j < firstDay){
                    row.push(null);
                } else if(date > daysInMonth){
                    row.push(null);
                } else{
                    row.push(date++);
                }
            }
            matrix.push(row);
        }
        return matrix;
    }

    const prevYear = () => setYear(prev => prev-1);
    const nextYear = () => setYear(prev => prev+1);

    const prevMonth = () => {
        if(month === 0){
            setMonth(11);
            prevYear();
        } else{
            setMonth(prev => prev-1);
        }
    }

    const nextMonth = () => {
        if(month === 11){
            setMonth(0);
            nextYear();
        } else {
            setMonth(prev => prev-1);
        }
    }

  return (
    <div>
        <h1 id='heading'>Calender</h1>
        <select id='month-select' value={month} onChange={handleMonthChange}>
            {months.map((month, idx) => (
                <option key={idx} value={idx}>{month}</option>
            ))}
        </select>

        {!editingYear ? (
            <span id='year' onDoubleClick={handleYearDoubleClick}>{year}</span>
        ) : (
            <input 
                id='year-text-box'
                type='number'
                defaultValue={year}
                onKeyDown={handleYearChange}
                autoFocus
            />
        )}

        <table id='calender-table'>
            <thead>
                <tr>
                <th>Sun</th><th>Mon</th><th>Tue</th>
                <th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>
                </tr>
            </thead>
            <tbody>
                {daysMatrix.map((week, idx) => (
                    <tr key={idx}>
                        {week.map((day, i) => (
                            <td key={i}>{day || ''}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>

        <div>
            <button id="prev-year" onClick={prevYear}>&lt;&lt;</button>
            <button id="prev-month" onClick={prevMonth}>&lt;</button>
            <button id="next-month" onClick={nextMonth}>&gt;</button>
            <button id="next-year" onClick={nextYear}>&gt;&gt;</button>
      </div>
    </div>
  )
}

export default Calender