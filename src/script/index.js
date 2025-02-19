"use strict";

import "../css/common-style.css";
import "../css/body-style.css";
import "../css/nav-style.css";
import "../css/add-task-dialog.css";
import "../css/icon-select-dialog.css";
import "../css/task-hover.css";
import "../css/hamburger.css";
import "../css/reset.css";

import { TodoController } from "./todoController";
import { DisplayController } from "./displayController";
import { TaskController } from "./taskController";

const todoController = new TodoController();
const displayController = new DisplayController(todoController);
const taskController = new TaskController(todoController, displayController);


// make hamburger button active
//
//
const button = document.querySelector('.hamb')
button.addEventListener('click',()=>{button.classList.toggle('active')})