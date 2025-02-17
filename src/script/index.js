import "../css/common-style.css";
import "../css/body-style.css";
import "../css/nav-style.css";
import "../css/add-task-dialog.css";
import "../css/hamburger.css";
import "../css/reset.css";

import { Todo } from "./todo";
import { Task } from "./task";

let TODO = new Todo("Test Todo");

let task1 = new Task("Coding Todo App", "Code Vanilla JS Todo App",null, null, "progressing", "extreme")
let task2 = new Task("Doing Leetcode", "Study Data Structures and Algorithms", null, null, "progressing", "medium")


TODO.push(task1, task2)
console.log(TODO)
