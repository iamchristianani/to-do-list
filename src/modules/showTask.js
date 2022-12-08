import { allList, inputList} from './variableList.js';

let tasksArr = [];

const updateList = () => {
  // ADD LIST
  allList.innerHTML = '';
  tasksArr.forEach((task, index) => {
    const oneTask = document.createElement('li');
    oneTask.classList = 'each-list all-box';
    oneTask.id = index;
    oneTask.innerHTML = `
      <input data-action="checkbox" data-id="${task.index}" class="input-check" type="checkbox"/>
      <input data-action="edit" data-id="${task.index}" type="text" id="input-text" class="input-text" value="${task.description}" />
      <i data-action="delete" data-id="${task.index}" class="fa-solid fa-trash list-icon" id="delete-btn"></i>
    `;
    allList.appendChild(oneTask);
    inputList.value = '';
  });
};

/** REMOVE FUNCTION */
const removeList = (index) => {
  tasksArr.splice(index, 1);
  resetIndex(tasksArr);
  updateList();
  saveToDir(tasksArr);
};

/** EDIT FUNCTION */
const editTask = (inputId, input) => {
  tasksArr[inputId].description = input.value;
  updateList();
  saveToDir(tasksArr);
};

/** CHANGE BG WHEN EDITING */
const changeTaskBg = (input) => {
  input.parentElement.style.backgroundColor = '#fffed7';
  input.style.backgroundColor = '#fffed7';
};

/** CHECKBOX FUNCTION */
const checkCompleted = (buttonId, box) => {
  box.nextElementSibling.classList.toggle('input-strike');
  if (box.checked) {
    tasksArr[buttonId].completed = true;
  } else {
    tasksArr[buttonId].completed = false;
  }
  saveToDir(tasksArr);
  if (tasksArr[buttonId].completed === true) {
    box.checked = true;
    box.nextElementSibling.classList.add('input-strike');
  }
}

// CLEAR COMPLETED TASK FUNCTION
const clearCompleted = () => {
  tasksArr = tasksArr.filter((obj) => obj.completed !== true);
  updateList();
  resetIndex(tasksArr);
  saveToDir(tasksArr);
}

// RESET THE INDEXES
const resetIndex = (arr) => {
  for (let i = 0; i < arr.length; i += 1) {
    arr[i].index = i + 1;
  }
}

// SAVE TO LOCAL DIRECTORY
const saveToDir = (arr) => {
  const jsonData = JSON.stringify(arr);
  localStorage.setItem('lists', jsonData);
}

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
  saveToDir(tasksArr);
};

export { displayList, updateList, addList, removeList, editTask, checkCompleted, changeTaskBg, clearCompleted };
