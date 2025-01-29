import React, { useEffect, useState } from 'react';
import './App.css';

const students: string[] = ["Лера", "Олег", "Катя", "Виталя", "Лиза", "Игорь"];

const dates: string[] = ["2025-01-25", "2025-01-26", "2025-01-27", "2025-01-28", "2025-01-29"];

console.log(dates);

const LOCAL_STORAGE_KEY = 'attendance-key';
const TIMEOUT_MS = 2000;

type AttendanceData = string[][];


function AttendanceTable() {

  const initAttendanceStatusData: AttendanceData = [];

  for (let i = 0; i < students.length; i++) {
    const row = [];//вложенный массив строк []
    for (let j = 0; j < dates.length; j++) {
      row.push('');//вложенный массив строк ['', '', '', ...]
    }
    initAttendanceStatusData.push(row);
    // [ 
    //   ['', '', '', ...],
    //   ['', '', '', ...],
    //   ...
    // ]
  }

  function getStoredData() {
    try {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedData ? JSON.parse(storedData) : initAttendanceStatusData;
    }
    catch(error) {
      console.error('Ошибка при загрузке данных:', error);
      return initAttendanceStatusData;
    }
  }

  function saveDataToStore() {
    setLoading(true);

    setTimeout(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(attendanceStatusData));

      console.log("Saving attendanceStatusData:", attendanceStatusData);
      setLoading(false)
    }, TIMEOUT_MS)
  }

  const [attendanceStatusData, setAttendanceStatusData] = useState<AttendanceData>(getStoredData);
  const [loading, setLoading] = useState(false);


  function handleAttendanceStatusData(rowIndex: number, colIndex: number) {
    //предыдущий двумерный массив prevStatusArray
    setAttendanceStatusData((prevStatusArray) => {
      console.log('#prevStatus arrray', prevStatusArray);
      //если localStorage был пустым?
      if (!prevStatusArray[rowIndex]) return prevStatusArray;

      //копия предыдущий массива
      const newStatusArray = prevStatusArray.map((row) => [...row]);
      newStatusArray[rowIndex][colIndex] = (newStatusArray[rowIndex][colIndex] === '' ? 'X' : '');
      console.log('#newStatus arrray', newStatusArray);
      return newStatusArray;
    });
  }

  useEffect(() => {
    setAttendanceStatusData(getStoredData());
  }, []);


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
                  onClick={() => handleAttendanceStatusData(studentIndex, dateIndex)}
                >
                  {attendanceStatusData[studentIndex][dateIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={saveDataToStore} disabled={loading}>
        {loading ? 'Загрузка...' : 'Сохранить'}
      </button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <AttendanceTable />
    </div>
  );
}

export default App;
