import { DatesProps } from '../types/types';

export default function CreateDate(props: DatesProps) {
  function handleAddDate() {
    const newDate = prompt("Введите новую дату (ГГГГ-ММ-ДД):");
    if (newDate) {
      const updatedDates = [...props.dates, newDate.trim()];
      console.log('handleAddDate() - new date added:', updatedDates);
      props.setDates(updatedDates); //это вызовет изменением в use effect
    }
  }

  return <button className="table__btn-add-date" onClick={handleAddDate}>Добавить дату</button>;
}