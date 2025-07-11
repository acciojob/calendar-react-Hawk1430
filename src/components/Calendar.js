import React, { useEffect, useState } from "react";

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const Calendar = () => {
	const [month, setMonth] = useState(new Date().getMonth());
	const [year, setYear] = useState(new Date().getFullYear());
	const [editingYear, setEditingYear] = useState(false);

	console.log(month);
	const handleYearDoubleClick = () => {
		setEditingYear(true);
	};

	const handleMonthChange = (e) => {
		const index  = months.indexOf(e.target.value);
		setMonth(index);
	};

	const handleYearChange = (e) => {
		if (e.key === "Enter") {
			setYear(parseInt(e.target.value))
			setEditingYear(false);
		}
	};

	const daysInMonth = (month, year) => new Date(year, month, 0).getDate();

	const createTableCells = (selectedMonth, selectedYear) => {
        let cells = [];
        const numberOfDays = daysInMonth(selectedMonth + 1, selectedYear);
        const startingDay = new Date(selectedYear, selectedMonth).getDay();
        let date = 1;
        for (let i = 0; i < 6; i++) {
            let row = [];
            for (let j = 0; j < 7; j++) {
                let cellId = `cell${i + j + 1}`;

                if (i === 0 && j < startingDay) {
                    row.push(<td key={j} id={cellId}></td>);
                } else if (date > numberOfDays) {
                    row.push(<td key={j} id={cellId}></td>);
                } else {
                    let currentDate = new Date();
                    if (
                        selectedYear === currentDate.getFullYear() &&
                        selectedMonth === currentDate.getMonth() &&
                        date === currentDate.getDate()
                    ) {
                        cellId = "today";
                    }
                    row.push(
                        <td key={j} id={cellId}>
                            {date}
                        </td>
                    );
                    date++;
                }
            }
            cells.push(<tr key={i}>{row}</tr>);
        }
        return cells;
    };

	const prevYear = () => setYear((prev) => prev - 1);
	const nextYear = () => setYear((prev) => prev + 1);

	const prevMonth = () => {
		if (month === 0) {
			setMonth(11);
			prevYear();
		} else {
			setMonth((prev) => prev - 1);
		}
	};

	const nextMonth = () => {
		if (month === 11) {
			setMonth(0);
			nextYear();
		} else {
			setMonth((prev) => prev + 1);
		}
	};

	return (
		<div>
			<h1 id="heading">Calendar</h1>
			<select id="month" value={months[month]} onChange={handleMonthChange}>
				{months.map((month, idx) => (
					<option key={month}>
						{month}
					</option>
				))}
			</select>

			{!editingYear ? (
				<span id="year" onDoubleClick={handleYearDoubleClick}>
					{year}
				</span>
			) : (
				<input
					id="year-text-box"
					type="number"
					defaultValue={year}
					onKeyDown={handleYearChange}
					autoFocus
				/>
			)}

			<div id="current-month" style={{ display: 'none' }}>
				{months[month]}
			</div>

			<table id="calendar-table">
				<thead>
					<tr>
						<th>Sun</th>
						<th>Mon</th>
						<th>Tue</th>
						<th>Wed</th>
						<th>Thu</th>
						<th>Fri</th>
						<th>Sat</th>
					</tr>
				</thead>
				<tbody>{createTableCells(month, year)}</tbody>
			</table>

			<div>
				<button id="prev-year" onClick={prevYear}>
					&lt;&lt;
				</button>
				<button id="previous-month" onClick={prevMonth}>
					&lt;
				</button>
				<button id="next-month" onClick={nextMonth}>
					&gt;
				</button>
				<button id="next-year" onClick={nextYear}>
					&gt;&gt;
				</button>
			</div>
		</div>
	);
};

export default Calendar;
