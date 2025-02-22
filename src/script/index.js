import "../css/main.css";

import { TodoController } from "./todoController";
import { DisplayController } from "./displayController";
import { EventController } from "./eventController";

const todoController = new TodoController();
todoController.initialize();

const displayController = new DisplayController(todoController);
displayController.renderTodo();

const eventController = new EventController(todoController, displayController);

eventController.setEventListeners();

// make hamburger button active
//
//
const button = document.querySelector(".hamb");
button.addEventListener("click", () => {
    button.classList.toggle("active");
});

const toggleBtn = document.querySelector(".hamb");
const svg = document.querySelector(".hamb > svg.ham");
const sidebar = document.querySelector(".sidebar");

toggleBtn.addEventListener("click", function () {
    sidebar.classList.toggle("is-closed");
    svg.classList.toggle("black");
});
