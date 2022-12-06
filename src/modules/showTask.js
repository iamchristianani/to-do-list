const allList = document.querySelector('.all-list');

const tasksArr = [
  {
    description: "Dance with a girl",
    completed: false,
    index: 1
  },
  {
    description: "Go to the movies",
    completed: false,
    index: 2
  },
  {
    description: "Get home early",
    completed: false,
    index: 3
  },
  {
    description: "Wake up late",
    completed: false,
    index: 4
  },
];


const showList = () => {
  tasksArr.forEach((task) => {
    const oneTask = `<li class="each-list all-box">
    <input class="input-check" type="checkbox"/>
    <span class="input-text">${task.description}</span>
    <i class="fa-solid fa-ellipsis-vertical list-icon"></i>
  </li>`;
  allList.innerHTML += oneTask;
  });
}

export {showList};