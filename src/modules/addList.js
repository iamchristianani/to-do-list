import { inputList } from "./variableList.js";
import { tasksArr, updateList } from "./showTask.js";

const addList = () => {
  const eachList = {};
  eachList.description = inputList.value;
  eachList.completed = false;
  eachList.index = tasksArr.length;
  tasksArr.push(eachList);
  updateList();
  const jsonData = JSON.stringify(tasksArr);
  localStorage.setItem('lists', jsonData);
}

export default addList;