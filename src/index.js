import './css/style.css';
import { inputList } from './modules/variableList.js';
import { displayList, addList } from './modules/showTask.js';

window.addEventListener('load', () => {
  displayList();
});

inputList.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addList();
  }
});