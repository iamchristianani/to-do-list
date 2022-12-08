import { allList, inputList, clearButton } from './variableList.js';

let tasksArr = [];

const updateList = () => {
  // ADD LIST
  allList.innerHTML = '';
  tasksArr.forEach((task) => {
    const oneTask = document.createElement('li');
    oneTask.classList = 'each-list all-box';
    oneTask.innerHTML = `
      <input data-id="${task.index}" class="input-check" type="checkbox"/>
      <input data-id="${task.index}" type="text" id="input-text" class="input-text" value="${task.description}" />
      <i data-id="${task.index}" class="fa-solid fa-trash list-icon" id="delete-btn"></i>
    `;
    allList.appendChild(oneTask);
    inputList.value = '';
  });

  // REMOVE LIST
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

  // EDIT LIST
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

  // CHECKBOX IN LIST
  const checkBox = document.querySelectorAll('.input-check');
  checkBox.forEach((box) => {
    const dataSet = parseInt(box.dataset.id, 10);
    const buttonId = tasksArr.findIndex((object) => object.index === dataSet);
    box.addEventListener('change', () => {
      box.nextElementSibling.classList.toggle('input-strike');

      /** CHECKBOX FUNCTION */
      if (box.checked) {
        tasksArr[buttonId].completed = true;
      } else {
        tasksArr[buttonId].completed = false;
      }
      const isComplete = () => {
        const jsonData = JSON.stringify(tasksArr);
        localStorage.setItem('lists', jsonData);
        //console.log('clicked');
      };
      isComplete();
    });
    if (tasksArr[buttonId].completed === true) {
      box.checked = true;
      box.nextElementSibling.classList.add('input-strike');
    }
  });

  // CLEAR COMPLETED
  // clearButton.addEventListener('click', () => {
  //   for (let i = 0; i < tasksArr.length; i += 1) {
  //     console.log(tasksArr[i].description + ' was clicked');
  //     if (tasksArr[i].completed === true) {
  //       const removeCheckedList = () => {
  //         const index = tasksArr[i].index - 1;
  //         tasksArr.splice(index, 1);
  //       }
  //       removeCheckedList();
  //     }
  //   }
  // });
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
