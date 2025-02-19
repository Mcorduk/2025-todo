"use strict";

import "../css/main.css";

import { TodoController } from "./todoController";
import { DisplayController } from "./displayController";
import { TaskController } from "./taskController";

const todoController = new TodoController();
const displayController = new DisplayController(todoController);
const taskController = new TaskController(todoController, displayController);

displayController.renderTodo();
taskController.setEventListeners();

// make hamburger button active
//
//
const button = document.querySelector('.hamb')
button.addEventListener('click',()=>{button.classList.toggle('active')})