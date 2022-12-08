import { theArr, saveToDir } from "./showTask.js";

const checkCompleted = (buttonId, box) => {
  box.nextElementSibling.classList.toggle('input-strike');
  if (box.checked) {
    theArr[buttonId].completed = true;
  } else {
    theArr[buttonId].completed = false;
  }
  saveToDir(theArr);
  if (theArr[buttonId].completed === true) {
    box.checked = true;
    box.nextElementSibling.classList.add('input-strike');
  }
}

export default checkCompleted;