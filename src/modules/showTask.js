import { allList, inputList } from './variableList.js';
import knowCheckValue from './checkCompleted';

let tasksArr = [];

/** RENDER FUNCTION */
const renderDisplay = () => {
  allList.innerHTML = '';
  tasksArr.forEach((task, index) => {
    const oneTask = document.createElement('li');
    oneTask.classList = 'each-list all-box';
    oneTask.id = index;
    oneTask.innerHTML = `
      <input data-action="checkbox" class="input-check" type="checkbox"/>
      <input data-action="edit" type="text" id="input-text" class="input-text" value="${task.description}" />
      <i data-action="delete" class="fa-solid fa-trash list-icon" id="delete-btn"></i>
    `;
    allList.appendChild(oneTask);
    inputList.value = '';
  });
};

/** ADD NEW TO-DO TASK FUNCTION */
const addList = () => {
  const eachList = {};
  eachList.description = inputList.value;
  eachList.completed = false;
  eachList.index = tasksArr.length + 1;
  tasksArr.push(eachList);
  renderDisplay();
  saveToDir(tasksArr);
};

/** REMOVE TO-DO TASK FUNCTION */
const removeList = (index) => {
  tasksArr.splice(index, 1);
  resetIndex(tasksArr);
  renderDisplay();
  saveToDir(tasksArr);
};

/** EDIT TO-DO TASK FUNCTION */
const editTask = (inputId, input) => {
  tasksArr[inputId].description = input.value;
  renderDisplay();
  saveToDir(tasksArr);
};

/** CHECKBOX FUNCTION */
const checkCompleted = (buttonId, box) => {
  box.nextElementSibling.classList.toggle('input-strike');
  tasksArr[buttonId].completed = knowCheckValue(box);
  saveToDir(tasksArr);
  if (tasksArr[buttonId].completed === true) {
    box.checked = true;
    box.nextElementSibling.classList.add('input-strike');
  }
}

/** CLEAR COMPLETED TASK FUNCTION */
const clearCompleted = () => {
  tasksArr = tasksArr.filter((obj) => obj.completed !== true);
  renderDisplay();
  resetIndex(tasksArr);
  saveToDir(tasksArr);
}

// Change Background When Editing
const changeTaskBg = (input) => {
  input.parentElement.style.backgroundColor = '#fffed7';
  input.style.backgroundColor = '#fffed7';
};

// Reset The Indexes
const resetIndex = (arr) => {
  for (let i = 0; i < arr.length; i += 1) {
    arr[i].index = i + 1;
  }
}

// Save To Local Directory
const saveToDir = (arr) => {
  const jsonData = JSON.stringify(arr);
  localStorage.setItem('lists', jsonData);
}

// Extract From Local Directory and Display
const displayList = () => {
  const getJsonData = localStorage.getItem('lists');
  if (getJsonData) {
    tasksArr = JSON.parse(getJsonData);
  }
  renderDisplay();
};

export { displayList, 
  addList, 
  removeList, 
  editTask, 
  checkCompleted, 
  changeTaskBg, 
  clearCompleted };
