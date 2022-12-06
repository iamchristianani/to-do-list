import { allList, inputList } from "./variableList.js";

let tasksArr = [];

const ShowList = () => {
  allList.innerHTML = '';
  tasksArr.forEach((task) => {
    const oneTask = document.createElement('li');
    oneTask.classList = 'each-list all-box';
    oneTask.innerHTML = `
      <input class="input-check" type="checkbox"/>
      <span class="input-text">${task.description}</span>
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
};

const addList = () => {
  const eachList = {};
  eachList.description = inputList.value;
  eachList.completed = false;
  eachList.index = tasksArr.length;
  tasksArr.push(eachList);
  ShowList();
  const jsonData = JSON.stringify(tasksArr);
  localStorage.setItem('lists', jsonData);
}

const removeList = (index) => {
  tasksArr.splice(index, 1);
  ShowList();
  const jsonData = JSON.stringify(tasksArr);
  localStorage.setItem('lists', jsonData);
};

const displayList = () => {
  const getJsonData = localStorage.getItem('lists');

  if (getJsonData) {
    tasksArr = JSON.parse(getJsonData);
  }
  ShowList();
};

export {displayList, addList};
