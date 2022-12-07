import './css/style.css';
import { inputList } from './modules/variableList.js';
import {displayList} from './modules/showTask.js';
import addList from './modules/addList.js';

window.addEventListener('load', () => {
  displayList();
});

inputList.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault;
    addList();
  }
});