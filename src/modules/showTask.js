import { allList, inputList } from "./variableList.js";
import removeList from './removeList.js';
import editTask from './editTask.js';

let tasksArr = [];

const updateList = () => {
  allList.innerHTML = '';
  tasksArr.forEach((task) => {
    const oneTask = document.createElement('li');
    oneTask.classList = 'each-list all-box';
    oneTask.innerHTML = `
      <input class="input-check" type="checkbox"/>
      <input data-id="${task.index}" type="text" id="input-text" class="input-text" value="${task.description}" />
      <i data-id="${task.index}" class="fa-solid fa-trash list-icon" id="delete-btn"></i>
    `;
    allList.appendChild(oneTask);
    inputList.value = '';
  });
  
  const removeListBtn = document.querySelectorAll('#delete-btn');
  removeListBtn.forEach((button) => {
    button.addEventListener('click', () => {
      const dataSet = parseInt(button.dataset.id, 10);
      const buttonId = tasksArr.findIndex((object) => object.index === dataSet);
      // eslint-disable-next-line no-use-before-define
      removeList(buttonId);
    });
  });
  
  const inputText = document.querySelectorAll('#input-text');
  inputText.forEach((input) => {
    input.addEventListener('focusout', () => {
      const dataSet = parseInt(input.dataset.id, 10);
      const inputId = tasksArr.findIndex((object) => object.index === dataSet);
      tasksArr[inputId].description = input.value;
      editTask();
    });
  });
  console.log(tasksArr);
};

const displayList = () => {
  const getJsonData = localStorage.getItem('lists');
  if (getJsonData) {
    tasksArr = JSON.parse(getJsonData);
  }
  updateList();
};

export {tasksArr, displayList, updateList};
