import './css/style.css';
import { inputList, clearButton } from './modules/variableList.js';
import { displayList, addList, removeList, editTask, checkCompleted, changeTaskBg, clearCompleted } from './modules/showTask.js';
import {allList} from './modules/variableList.js';

const eventFunctions = (e) => {
  const {target} = e;
  const parentElement = target.parentNode;
  if (!parentElement.classList.contains('each-list')) return;
  const eachListId = Number(parentElement.id);
  // target the data action
  const {action} = target.dataset;

  if (action === 'delete') {
    removeList(eachListId);
  } else if (action === 'checkbox') {
    checkCompleted(eachListId, target);
  }
}

window.addEventListener('load', () => {
  displayList();
});

inputList.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addList();
  }
});

allList.addEventListener('click', (e) => {
  eventFunctions(e);
});

allList.addEventListener('change', (e) => {
  eventFunctions(e);
})

clearButton.addEventListener('click', () => {
  clearCompleted();
})

allList.addEventListener('focusout', (e) => {
  const {target} = e;
  const parentElement = target.parentNode;
  if (!parentElement.classList.contains('each-list')) return;
  const eachListId = Number(parentElement.id);

  // target the data action
  const {action} = target.dataset;
  if (action === 'edit') {
    editTask(eachListId, target);
  }
  eventFunctions(e);
})

allList.addEventListener('focusin', (e) => {
  const {target} = e;
  const parentElement = target.parentNode;
  if (!parentElement.classList.contains('each-list')) return;
  const eachListId = Number(parentElement.id);

  // target the data action
  const {action} = target.dataset;
  if (action === 'edit') {
    changeTaskBg(target);
  }
  // eventFunctions(e);
})