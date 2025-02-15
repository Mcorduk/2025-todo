import "./common-style.css";
import "./body-style.css";
import "./nav-style.css";
import "./add-task-dialog.css";
import "./hamburger.css";
import "./reset.css";

import { Todo } from "./todo";
import { Task } from "./task";

let TODO = new Todo("Test Todo");

let task1 = new Task("Coding Todo App", "Code Vanilla JS Todo App",null, null, "progressing", "extreme")
let task2 = new Task("Doing Leetcode", "Study Data Structures and Algorithms", null, null, "progressing", "medium")


TODO.push(task1, task2)
console.log(TODO)
