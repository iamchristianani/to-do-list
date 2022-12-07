import { tasksArr, updateList } from "./showTask.js";

const removeList = (index) => {
  tasksArr.splice(index, 1);
  for (let i = 0; i < tasksArr.length; i++) {
    tasksArr[i].index = i;
  }
  updateList();
  const jsonData = JSON.stringify(tasksArr);
  localStorage.setItem('lists', jsonData);
};

export default removeList;