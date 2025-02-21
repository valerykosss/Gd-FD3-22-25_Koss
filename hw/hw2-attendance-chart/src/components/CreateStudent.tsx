import { StudentsProps } from '../types/types';

export default function CreateStudent(props: StudentsProps) {
  function handleAddStudent() {
    const newStudent = prompt("Введите имя нового студента:");
    if (newStudent) {
      const updatedStudents = [...props.students, newStudent.trim()];
      console.log('handleAddStudent() - new student added:', updatedStudents);
      props.setStudents(updatedStudents); //это вызовет изменением в use effect
    }
  }

  return <button className="table__btn-add-student" onClick={handleAddStudent}>Добавить студента</button>;
}