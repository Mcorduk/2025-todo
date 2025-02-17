"use strict";

import "../css/common-style.css";
import "../css/body-style.css";
import "../css/nav-style.css";
import "../css/add-task-dialog.css";
import "../css/hamburger.css";
import "../css/reset.css";

import { Todo } from "./todo";
import { Task } from "./task";
import { DisplayController } from "./displayController";

const displayController = new DisplayController()

let todoList = [];
let todo1 = new Todo("Test Todo 1");

let task1 = new Task("Coding Todo App", "Code Vanilla JS Todo App",null, null, "progressing", "extreme")
let task2 = new Task("Doing Leetcode", "Study Data Structures and Algorithms", null, null, "progressing", "medium")

let todo2 = new Todo("Test Todo 2");

todo1.addTask(task1);
todo1.addTask(task2)

todoList.push(todo1)

console.log(todoList)
let task3 = new Task("Brewing Coffee", "Just kidding im broke",null, null, "progressing", "extreme")
let task4 = new Task("Doing SQL", "I am too stupid even for SQL...", null, null, "progressing", "medium")

todo2.addTask(task3);
todo2.addTask(task4)

todoList.push(todo2)
console.log(todoList)

displayController.renderNav();