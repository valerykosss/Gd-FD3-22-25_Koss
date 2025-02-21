import { useEffect, useState } from "react";
import { AttendanceData } from "../helpers/localStorageHelper";

export function useAttendanceStatus(students: string[], dates: string[], initialAttendance: AttendanceData) {
  const [attendanceStatusData, setAttendanceStatusData] = useState<AttendanceData>([]);

  function generateInitialAttendance(students: string[], dates: string[]): AttendanceData {
    const initAttendance = [];
    for (let i = 0; i < students.length; i++) {
      const row = [];//вложенный массив строк []
      for (let j = 0; j < dates.length; j++) {
        row.push('');//вложенный массив строк ['', '', '', ...]
      }
      initAttendance.push(row);
      // [ 
      //   ['', '', '', ...],
      //   ['', '', '', ...],
      //   ...
      // ]
    }
    return initAttendance;
  }

    // Загружаем данные из initialAttendance только при первом рендере
    useEffect(() => {
        console.log("useAttendanceStatus() - initialAttendance:", initialAttendance);
        setAttendanceStatusData(initialAttendance.length ? initialAttendance : generateInitialAttendance(students, dates));
    }, [initialAttendance]);

  useEffect(() => {
    setAttendanceStatusData((prevStatusArray) => {
      const updatedAttendanceData = [...prevStatusArray];

      // если добавлены новые студенты, добавляем новые ячейки с датами для новых студентов
      while (updatedAttendanceData.length < students.length) {
        updatedAttendanceData.push(Array(dates.length).fill(""));
      }
      //тут по студентам 
      for (let i = 0; i < updatedAttendanceData.length; i++) {
        //пока длина каждого студента < массива дат 
        while (updatedAttendanceData[i].length < dates.length) {
          updatedAttendanceData[i].push("");
        }
      }
      console.log('useEffect() [students, dates] - updated attendance data:', updatedAttendanceData);
      return updatedAttendanceData;
    });
  }, [students, dates]);

  function handleAttendanceStatusData(rowIndex: number, colIndex: number) {
    //предыдущий двумерный массив prevStatusArray
    setAttendanceStatusData((prevStatusArray) => {
      console.log('handleAttendanceStatusData() - #prevStatus arrray:', prevStatusArray);

      //копия предыдущий массива
      const newStatusArray = prevStatusArray.map((row) => [...row]);
      newStatusArray[rowIndex][colIndex] = (newStatusArray[rowIndex][colIndex] === '' ? 'X' : '');
      console.log('handleAttendanceStatusData() - #newStatus arrray', newStatusArray);
      return newStatusArray;
    });
  }

  return { attendanceStatusData, handleAttendanceStatusData };
}