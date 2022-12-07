import { tasksArr, updateList } from "./showTask.js";

const editTask = () => {
  updateList();
  const jsonData = JSON.stringify(tasksArr);
  localStorage.setItem('lists', jsonData);
}

export default editTask;