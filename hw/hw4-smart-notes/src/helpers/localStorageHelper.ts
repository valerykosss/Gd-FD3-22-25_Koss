import { TagType } from '../types/TagType';
import { NoteType } from '../types/NoteType';

const LOCAL_STORAGE_NOTES_KEY = 'notes';
const LOCAL_STORAGE_TAGS_KEY = 'tags';

function saveDataToLocalStorage<T>(key: string, data: T) {
  try {
    const dataString = JSON.stringify(data);
    localStorage.setItem(key, dataString);
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
}

function loadDataFromLocalStorage<T>(key: string) {
  const dataString = localStorage.getItem(key);
  if (dataString) {
    try {
      return JSON.parse(dataString);
    } catch (error) {
      console.error(`Error loading ${key} data from localStorage:`, error);
    }
  }
  return [];
}

// Функция сохранения заметок, конвертируя Date в строки
export function saveNotesToLocalStorage(notes: NoteType[]) {
  saveDataToLocalStorage(LOCAL_STORAGE_NOTES_KEY, notes);
}

// Функция загрузки заметок, конвертируя строки обратно в Date
export function loadNotesFromLocalStorage(): NoteType[] {
  return loadDataFromLocalStorage<NoteType[]>(LOCAL_STORAGE_NOTES_KEY) || [];
}

// Функции для тегов (тут преобразование не нужно, так как нет Date)
export function saveTagsToLocalStorage(tags: TagType[]) {
  saveDataToLocalStorage(LOCAL_STORAGE_TAGS_KEY, tags);
}

export function loadTagsFromLocalStorage(): TagType[] {
  return loadDataFromLocalStorage<TagType[]>(LOCAL_STORAGE_TAGS_KEY) || [];
}