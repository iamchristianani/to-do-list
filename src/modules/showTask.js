import { allList, inputList } from './variableList.js';

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

      /** REMOVE FUNCTION */
      const removeList = (index) => {
        tasksArr.splice(index, 1);
        for (let i = 0; i < tasksArr.length; i += 1) {
          tasksArr[i].index = i + 1;
        }
        updateList();
        const jsonData = JSON.stringify(tasksArr);
        localStorage.setItem('lists', jsonData);
      };
      removeList(buttonId);
    });
  });

  const inputText = document.querySelectorAll('#input-text');
  inputText.forEach((input) => {
    input.addEventListener('focusout', () => {
      const dataSet = parseInt(input.dataset.id, 10);
      const inputId = tasksArr.findIndex((object) => object.index === dataSet);
      tasksArr[inputId].description = input.value;

      /** EDIT FUNCTION */
      const editTask = () => {
        updateList();
        const jsonData = JSON.stringify(tasksArr);
        localStorage.setItem('lists', jsonData);
      };
      editTask();
    });
    input.addEventListener('focusin', () => {
      input.parentElement.style.backgroundColor = '#fffed7';
      input.style.backgroundColor = '#fffed7';
    });
  });
};

const displayList = () => {
  const getJsonData = localStorage.getItem('lists');
  if (getJsonData) {
    tasksArr = JSON.parse(getJsonData);
  }
  updateList();
};

const addList = () => {
  const eachList = {};
  eachList.description = inputList.value;
  eachList.completed = false;
  eachList.index = tasksArr.length + 1;
  tasksArr.push(eachList);
  updateList();
  const jsonData = JSON.stringify(tasksArr);
  localStorage.setItem('lists', jsonData);
};

export { displayList, updateList, addList };
