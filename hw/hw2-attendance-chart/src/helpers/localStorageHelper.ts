const LOCAL_STORAGE_KEY = "attendance-key";

export type AttendanceData = string[][];
const TIMEOUT_MS = 2000;

export function loadStoredData() {
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

export function saveDataToStore(
  students: string[],
  dates: string[],
  attendanceStatusData: AttendanceData,
  setLoading: (loading: boolean) => void) {
    
  setLoading(true);

  setTimeout(() => {
    try {
      const dataToSave = {
        students,
        dates,
        attendanceStatusData,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
      console.log("Данные успешно сохранены:", dataToSave);
    } catch (error) {
      console.error("Ошибка сохранения данных в localStorage:", error);
    }
    setLoading(false);
  }, TIMEOUT_MS);
}