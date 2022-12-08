import './css/style.css';
import { inputList, clearButton, allList } from './modules/variableList.js';
import {
  displayList,
  addList,
  removeList,
  editTask,
  checkCompleted,
  changeTaskBg,
  clearCompleted,
} from './modules/showTask.js';

import knowCheckValue from './modules/checkCompleted.js';

window.addEventListener('load', () => {
  displayList();
});

inputList.addEventListener('keypress', (e) => {
  const { target } = e;
  if (target.value === '') return;
  if (e.key === 'Enter') {
    addList();
  }
});

allList.addEventListener('click', (e) => {
  const { target } = e;
  const parentElement = target.parentNode;
  if (!parentElement.classList.contains('each-list')) return;
  const eachListId = Number(parentElement.id);
  // target the data action
  const { action } = target.dataset;

  if (action === 'delete') {
    removeList(eachListId);
  }
});

allList.addEventListener('change', (e) => {
  const { target } = e;
  const parentElement = target.parentNode;
  if (!parentElement.classList.contains('each-list')) return;
  const eachListId = Number(parentElement.id);
  // target the data action
  const { action } = target.dataset;

  if (action === 'checkbox') {
    checkCompleted(eachListId, target);
    knowCheckValue(target);
  }
});

clearButton.addEventListener('click', () => {
  clearCompleted();
});

allList.addEventListener('focusout', (e) => {
  const { target } = e;
  const parentElement = target.parentNode;
  if (!parentElement.classList.contains('each-list')) return;
  const eachListId = Number(parentElement.id);

  // target the data action
  const { action } = target.dataset;
  if (action === 'edit') {
    editTask(eachListId, target);
  }
});

allList.addEventListener('focusin', (e) => {
  const { target } = e;
  const parentElement = target.parentNode;
  if (!parentElement.classList.contains('each-list')) return;

  // target the data action
  const { action } = target.dataset;
  if (action === 'edit') {
    changeTaskBg(target);
  }
});