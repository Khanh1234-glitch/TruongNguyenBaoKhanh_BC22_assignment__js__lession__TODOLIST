import UncompletedTask from "./Modal/unfinish.js";
import CompletedTask from "./Modal/createTask.js";
import TaskList from "./Modal/taskList.js";
import Validation from "./Modal/validation.js";

const validation = new Validation();
const taskList = new TaskList();

getLocalStorage();

// reset input
function resetInput() {
  {
    document.getElementById("newTask").style.border = "none";
    document.getElementById("newTask").setAttribute("placeholder", "Enter an activity...");
    document.getElementById("newTask").removeAttribute("style");
  }
}

// create Task
function getTask() {
  const inputValue = document.getElementById("newTask").value;
  document.getElementById("newTask").focus();

  let isValid = true;

  isValid &= validation.nullCheck(inputValue, "newTask");

  if (isValid) {
    return new UncompletedTask(inputValue);
  }

  document.getElementById("newTask").addEventListener("keyup", resetInput);
  document.getElementById("newTask").addEventListener("blur", resetInput);

  return null;
}

// add task
document.getElementById("addItem").addEventListener("click", () => {
  const task = getTask();

  if (task) {
    taskList.list.push(task);

    renderTaskList(taskList.list);

    setLocalStorage();
  }

  document.getElementById("newTask").value = null;
});

// render ra html 
function renderTaskList(list) {
  if (list) {
    const uncomplete = list.reduce((result, task) => {
      if (task.isCompleted === false) {
        return result + task.renderTask();
      }
    }, "");

    const complete = list.reduce((result, task ) => {
      if (task.isCompleted === true) {
        return result + task.renderTask();
      }
    }, "");

    if (complete) {
      document.getElementById("completed").innerHTML = complete;
    }
    if (uncomplete) {
      document.getElementById("todo").innerHTML = uncomplete;
    }
  }
}
function Delete(id){
    TaskList.deleteTask(id);
    setLocalStorage();
    getLocalStorage();
}

document.getElementsByClassName(".remove ")[0].addEventListener("click",(id)=>{
    Delete(id);
    setLocalStorage();
    getLocalStorage();
})
//sort
function sort(condition) {
  if (condition === "alphabet") {
    taskList.list.sort((taskA, taskB) => {
      if (taskA.text.toLowerCase() < taskB.text.toLowerCase()) {
        return -1;
      }
      if (taskA.text.toLowerCase() > taskB.text.toLowerCase()) {
        return 1;
      }

      return 0;
    });
  } else if (condition === "reverse") {
    taskList.list.sort((taskA, taskB) => {
      if (taskA.text.toLowerCase() > taskB.text.toLowerCase()) {
        return -1;
      }
      if (taskA.text.toLowerCase() < taskB.text.toLowerCase()) {
        return 1;
      }

      return 0;
    });
  }

  renderTaskList(taskList.list);
}

document.getElementById("two").addEventListener("click", () => {
  sort("alphabet");
});

document.getElementById("three").addEventListener("click", () => {
  sort("reverse");
});

// set local storage
function setLocalStorage() {
  const dataString = JSON.stringify(taskList.list);

  localStorage.setItem("TaskList", dataString);
}

//get local storage
function getLocalStorage() {
  const data = localStorage.getItem("TaskList");

  if (data) {
    let dataJSON = JSON.parse(data);
    taskList.list = dataJSON;

    taskList.list = taskList.list.map((task) => {
      const { text, isCompleted } = task;
      if (isCompleted === false) {
        return new UncompletedTask(text, isCompleted);
      } else {
        return new CompletedTask(text, isCompleted);
      }
    });

    renderTaskList(taskList.list);
  }
}