const addBtn = document.querySelector(".add-btn");
window.addEventListener("DOMContentLoaded", loadTasks);

const time = () => {
  const time = document.querySelector(".time");
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1; 
  const year = now.getFullYear();
  const hours = now.getHours();

   const formattedDateTime = `${day}/${month}/${year}`;
   time.innerHTML = formattedDateTime;

  let greeting;
    if (hours < 12) {
        greeting = "Good Morning !";
    } else if (hours < 18) {
        greeting = "Good Afternoon !";
    } else {
        greeting = "Good Night !";
    }

    const greet = document.querySelector(".greeting");
    greet.innerHTML =  greeting;
}
time();

addBtn.addEventListener("click", () => {
  const newTask = document.createElement("div");
  newTask.className = "wraper";

  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.placeholder = "Enter a task";

  const submitBtn = document.createElement("button");
  const icon = document.createElement("i");
  icon.className = "ri-add-line"; 
  submitBtn.appendChild(icon);
  newTask.appendChild(inputField);
  newTask.appendChild(submitBtn);
  
  submitBtn.addEventListener("click", () => {

    const taskText = inputField.value.trim();

    if (taskText) {
      newTask.innerHTML = `${taskText} `;
      const deleteBtn = document.createElement("button");

    const icon = document.createElement("i");
    icon.className = "ri-delete-bin-line"; 
    deleteBtn.appendChild(icon);


    deleteBtn.addEventListener("click", () => {
      showDeletePopup(taskText, newTask);
      });

      newTask.appendChild(deleteBtn);

      saveTask(taskText);
    } 
    else {
      alert("Please enter a task!");
    }
  });

  const addElement = document.querySelector(".tasks");
  addElement.insertAdjacentElement("afterend", newTask);
});

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const preEle = document.querySelector(".tasks");

  tasks.forEach(task => {
    const newTask = document.createElement("div");
    newTask.className = "wraper";
    newTask.textContent = task;

    const deleteBtn = document.createElement("button");
    const icon = document.createElement("i");
    icon.className = "ri-delete-bin-line"; 
 
    deleteBtn.appendChild(icon);

    deleteBtn.addEventListener("click", () => {
      showDeletePopup(task, newTask);
    });

    newTask.appendChild(deleteBtn);
    preEle.insertAdjacentElement("afterend", newTask);
  });
}

function showDeletePopup(task, taskElement) {

  const overlay = document.createElement("div");
  overlay.classList.add("overlay");


  const popup = document.createElement("div");
  popup.classList.add("popup");

  const message = document.createElement("p");
  message.textContent = `Are you sure you want to delete the task: "${task}"?`;

  const confirmBtn = document.createElement("button");
  confirmBtn.textContent = "Yes";
  confirmBtn.addEventListener("click", () => {
    deleteTask(task, taskElement);
    overlay.remove();
  });

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "No";
  cancelBtn.addEventListener("click", () => {
    overlay.remove();
  });

  popup.appendChild(message);
  popup.appendChild(confirmBtn);
  popup.appendChild(cancelBtn);
  overlay.appendChild(popup);
  document.body.appendChild(overlay);
}

function deleteTask(task, taskElement) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(t => t !== task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskElement.remove();
}
