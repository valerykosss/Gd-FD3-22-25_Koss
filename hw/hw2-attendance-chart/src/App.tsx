import React, { useEffect, useState } from 'react';
import { loadStoredData, AttendanceData, saveDataToStore } from './helpers/localStorageHelper';
import './App.css';
import { useAttendanceStatus } from './hooks/useAttendanceStatus';
import CreateStudent from './components/CreateStudent';
import CreateDate from './components/CreateDate';

function AttendanceTable() {

  const [students, setStudents] = useState<string[]>(["Лера", "Олег", "Катя", "Виталя", "Лиза", "Игорь"]);
  const [dates, setDates] = useState<string[]>(["2025-01-25", "2025-01-26", "2025-01-27", "2025-01-28", "2025-01-29"]);
  const [loading, setLoading] = useState(false);
  const [initialAttendance, setInitialAttendance] = useState<AttendanceData>([]);


  useEffect(() => {
    const storedData = loadStoredData();
    setStudents(storedData.students.length ? storedData.students : students);
    setDates(storedData.dates.length ? storedData.dates : dates);
    setInitialAttendance(storedData.attendanceStatusData);
  }, []);


  const { attendanceStatusData, handleAttendanceStatusData } = useAttendanceStatus(students, dates, initialAttendance);


  return (
    <div className="table__wrapper">
      <h2>Посещаемость</h2>
      <CreateStudent students={students} setStudents={setStudents} />
      <CreateDate dates={dates} setDates={setDates} />

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
                   {attendanceStatusData[studentIndex]?.[dateIndex] || ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button className = "table__btn-save" onClick={() => saveDataToStore(students, dates, attendanceStatusData, setLoading)} disabled={loading}>
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