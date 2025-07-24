const formElement = document.querySelector(".form");

const inputElement = document.querySelector(".input");

const ulElement = document.querySelector(".list");

let list = JSON.parse(localStorage.getItem("list"));

list.forEach((task) => {
  toDoList(task);
});

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  toDoList();
});

function toDoList(task) {
  let newTask = inputElement.value;
  if (task) {
    newTask = task.name;
  }
  const liElement = document.createElement("li");
   if(task && task.checked){
    liElement.classList.add("checked")
  }
  liElement.innerText = newTask;
  ulElement.appendChild(liElement);
  inputElement.value = "";

  const checkButtonElement = document.createElement("div");
  checkButtonElement.innerHTML = `
    <i class="fa-solid fa-square-check">
    `;
  liElement.appendChild(checkButtonElement);
  const trashButtonElement = document.createElement("div");
  trashButtonElement.innerHTML = `
   <i class="fa-solid fa-trash">
    `;
  liElement.appendChild(trashButtonElement);

  checkButtonElement.addEventListener("click", () => {
    liElement.classList.toggle("checked");
    updateLocalStorage();
  });

  trashButtonElement.addEventListener("click", () => {
    liElement.remove();
    updateLocalStorage();
  });
  updateLocalStorage();
}

function updateLocalStorage() {
  const liElements = document.querySelectorAll("li");

  list = [];
  liElements.forEach((liElement) => {
    list.push({
      name: liElement.innerText,
      checked: liElement.classList.contains("checked"),
    });
  });
  localStorage.setItem("list", JSON.stringify(list));
}
