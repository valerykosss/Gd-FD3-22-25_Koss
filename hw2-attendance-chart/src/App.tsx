import React, { useEffect, useState } from 'react';
import './App.css';


const LOCAL_STORAGE_KEY = 'attendance-key';
const TIMEOUT_MS = 2000;

type AttendanceData = string[][];


function AttendanceTable() {

  const initAttendanceStatusData: AttendanceData = [];

  const [students, setStudents] = useState<string[]>(["Лера", "Олег", "Катя", "Виталя", "Лиза", "Игорь"]);
  const [dates, setDates] = useState<string[]>(["2025-01-25", "2025-01-26", "2025-01-27", "2025-01-28", "2025-01-29"]);

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

  // const [attendanceStatusData, setAttendanceStatusData] = useState<AttendanceData>(loadStoredData);
  const storedData = loadStoredData();
  const [attendanceStatusData, setAttendanceStatusData] = useState<AttendanceData>(storedData.attendanceStatusData.length ? storedData.attendanceStatusData : initAttendanceStatusData);
  const [loading, setLoading] = useState(false);
  const [loadingAddStudent, setLoadingAddStudent] = useState(false);
  const [loadingAddDate, setLoadingAddDate] = useState(false);

  function handleAddStudent() {
    if (loadingAddStudent) return;
    setLoadingAddStudent(true);
    const newStudent = prompt("Введите имя нового студента:");
    if (newStudent) {
      const updatedStudents = [...students, newStudent.trim()];

      //даты для нового студента
      const newDatesForNewStudent: string[] = [];
      for (let i = 0; i < dates.length; i++) {
        newDatesForNewStudent.push('');
      }

      const updatedAttendanceData = [...attendanceStatusData, newDatesForNewStudent];
      setStudents(updatedStudents);
      setAttendanceStatusData(updatedAttendanceData);
    } 
    setLoadingAddStudent(false);
  }

  function handleAddDate() {
    if (loadingAddDate) return;
    setLoadingAddDate(true);
    const newDate = prompt("Введите новую дату (ГГГГ-ММ-ДД):");
    if (newDate) {
      const updatedDates = [...dates, newDate.trim()];

      //каждому студенту в конце массива добавить пусто
      const updatedAttendanceData = attendanceStatusData.map((row) => {
        return [...row, ''];
      });

      setDates(updatedDates);
      setAttendanceStatusData(updatedAttendanceData);
    }
    setLoadingAddDate(false); // Закрыть индикатор загрузки
  }


function loadStoredData() {
  try {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      return JSON.parse(storedData);
    }
  } catch (error) {
    console.error('load error:', error);
  }
  return { students: [], dates: [], attendanceStatusData: [] }; 
}

  function saveDataToStore(students: string[], dates: string[], attendanceStatusData: AttendanceData) {
    setLoading(true);

    setTimeout(() => {
      const dataToSave = {
        students,
        dates,
        attendanceStatusData
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));

      console.log("saved attendanceStatusData ", dataToSave);
      setLoading(false)
    }, TIMEOUT_MS)
  }


  function handleAttendanceStatusData(rowIndex: number, colIndex: number) {
    //предыдущий двумерный массив prevStatusArray
    setAttendanceStatusData((prevStatusArray) => {
      console.log('#prevStatus arrray', prevStatusArray);

      //копия предыдущий массива
      const newStatusArray = prevStatusArray.map((row) => [...row]);
      newStatusArray[rowIndex][colIndex] = (newStatusArray[rowIndex][colIndex] === '' ? 'X' : '');
      console.log('#newStatus arrray', newStatusArray);
      // saveDataToStore(students, dates, newStatusArray);
      return newStatusArray;
    });
  }


  useEffect(() => {
    const { students: storedStudents, dates: storedDates, attendanceStatusData: storedAttendance } = loadStoredData();
  
    //забираб из localstorage или дефолт
    setStudents(storedStudents.length ? storedStudents : students);
    setDates(storedDates.length ? storedDates : dates);
    setAttendanceStatusData(storedAttendance.length ? storedAttendance : initAttendanceStatusData);
  }, []);


  return (
    <div className="table__wrapper">
      <h2>Посещаемость</h2>
      <button className="table__btn-add-student" onClick={handleAddStudent} disabled={loading}>
        {loadingAddStudent ? 'Загрузка...' : 'Добавить студента'}
      </button>

      <button className="table__btn-add-date" onClick={handleAddDate} disabled={loading}>
        {loadingAddDate ? 'Загрузка...' : 'Добавить дату'}
      </button>
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
      <button className = "table__btn-save" onClick={() => saveDataToStore(students, dates, attendanceStatusData)} disabled={loading}>
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
