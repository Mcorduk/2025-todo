"use strict";

import "../css/common-style.css";
import "../css/body-style.css";
import "../css/nav-style.css";
import "../css/add-task-dialog.css";
import "../css/icon-select-dialog.css";
import "../css/hamburger.css";
import "../css/reset.css";

import { Todo } from "./todo";
import { Task } from "./task";
import { TodoController } from "./todoController";
import { DisplayController } from "./displayController";
import { AddTaskController } from "./addTaskController";
import { TASK_STATUS, TASK_PRIORITY } from "./constants";

const todoController = new TodoController();
const displayController = new DisplayController(todoController);
const addTaskController = new AddTaskController(todoController, displayController);


// make hamburger button active
//
//
const button = document.querySelector('.hamb')
button.addEventListener('click',()=>{button.classList.toggle('active')})