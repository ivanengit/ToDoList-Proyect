const addForm = document.querySelector('.add-form');
const input = document.querySelector('.input-text');
const tasksList = document.querySelector('.tasks-list');
const deletteAllBtn = document.querySelector('.deleteAll-btn');

let ID = 1;
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


const createHTMLTask = ({ id, name }) => `<li>${name} <img class="delete-btn" src="./img/delete.svg" alt="boton de borrar" data-id="${id}"/></li>`

const saveToLocalStorage = toDoList => {
    localStorage.setItem("tasks", JSON.stringify(toDoList))
}
const renderTasksList = (tasks = []) => {
    const allTasks = tasks.map((task) => createHTMLTask(task)).join('')
    tasksList.innerHTML = allTasks
}


const addTask = (event) => {
    event.preventDefault();
    const taskName = input.value
    if (taskName.trim().length === 0) return;
    const newTask = {
        id: ID,
        name: taskName
    };


    //tasks.push(newTask)
    tasks = [
        ...tasks, newTask
    ]
    ID++;
    input.value = '';


    renderTasksList(tasks);
    hideDeleteAll(tasks);
    saveToLocalStorage(tasks);
};

const deleteTask = event => {
    if (!event.target.classList.contains('delete-btn')) return;

    const taskIdToDelete = parseInt(event.target.dataset.id);
    tasks = tasks.filter(task => task.id !== taskIdToDelete);
    renderTasksList(tasks);
    hideDeleteAll(tasks);
    saveToLocalStorage(tasks);
};

const deleteAll = () => {
    tasks = [];
    renderTasksList(tasks);
    hideDeleteAll(tasks);
    saveToLocalStorage(tasks);
};

const hideDeleteAll = toDoList => {
    if (toDoList.length === 0) {
        deletteAllBtn.classList.add('hidden');
        return;
    }
    deletteAllBtn.classList.remove('hidden');
};


function init() {
    renderTasksList(tasks);
    hideDeleteAll(tasks);
    addForm.addEventListener('submit', addTask);
    tasksList.addEventListener('click', deleteTask);
    deletteAllBtn.addEventListener('click', deleteAll);
}

init()