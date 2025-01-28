import React, { useEffect, useState } from 'react';
import './App.css';

const students : string[] = ["Лера", "Олег", "Катя", "Виталя", "Лиза", "Игорь"];

// const dates : Date[] = [new Date("2025-01-25"), new Date("2025-01-26"), new Date("2025-01-27"), new Date("2025-01-28"), new Date("2025-01-29")];

const dates : string[] = ["2025-01-25", "2025-01-26", "2025-01-27", "2025-01-28", "2025-01-29"];

console.log(dates);

function AttendanceTable() {
  
  const initAttendanceStatus: string[][] = [];
  
  for (let i = 0; i < students.length; i++) {
    const row = [];//вложенный массив строк []
    for (let j = 0; j < dates.length; j++) {
      row.push('');//вложенный массив строк ['', '', '', ...]
    }
    initAttendanceStatus.push(row);
    // [ 
    //   ['', '', '', ...],
    //   ['', '', '', ...],
    //   ...
    // ]
  }
  
  const [attendanceStatus, setAttendanceStatus] = useState<string[][]>(initAttendanceStatus);

  const handleAttendanceStatus = (rowIndex: number, colIndex: number) => {  
    //предыдущий двумерный массив prevStatusArray
    setAttendanceStatus((prevStatusArray) => {
      console.log('#prevStatus arrray', prevStatusArray);

      //копия существующ массива
      const newStatusArray = prevStatusArray.map((row) => [...row]);
      newStatusArray[rowIndex][colIndex] = (newStatusArray[rowIndex][colIndex] === '' ? 'X' : '');
      console.log('#newStatus arrray', newStatusArray);
      return newStatusArray;
    });
  };

  return (
      <div>
          <h2>Посещаемость</h2>
          <table>
              <thead>
                  <tr>
                      <th>Студенты</th>
                      {dates.map((currDate, index) => (
                          <th key={index}>{currDate}</th>
                      ))}
                  </tr>
              </thead>
              <tbody>
                  {students.map((currStudent, studentIndex) => (
                      <tr key={studentIndex}>
                          <td>{studentIndex + 1}. {currStudent}</td>
                          {dates.map((currDate, dateIndex) => (
                              <td 
                                  key={studentIndex + dateIndex} 
                                  onClick={() => handleAttendanceStatus(studentIndex, dateIndex)}
                              >
                                  {attendanceStatus[studentIndex][dateIndex]}
                              </td>
                          ))}
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  );
}



function SaveAttendaceTableData() {
  return <button>Сохранить</button>
}

function App() {
  return (
    <div className="App">
      <AttendanceTable/>
      <SaveAttendaceTableData></SaveAttendaceTableData>
    </div>
  );
}

export default App;
