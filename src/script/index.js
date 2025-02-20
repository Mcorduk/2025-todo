"use strict";

import "../css/main.css";

import { TodoController } from "./todoController";
import { DisplayController } from "./displayController";
import { TaskController } from "./taskController";

const todoController = new TodoController();
todoController.initialize();

const displayController = new DisplayController(todoController);
displayController.renderTodo();

const taskController = new TaskController(todoController, displayController);

taskController.setEventListeners();

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
svg.classList.toggle("black");

toggleBtn.addEventListener("click", function () {
    sidebar.classList.toggle("is-closed");
    svg.classList.toggle("black");
});
