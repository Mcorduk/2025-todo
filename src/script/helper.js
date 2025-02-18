import { Todo } from "./todo";
import { Task } from "./task";
import { TASK_STATUS, TASK_PRIORITY } from "./constants";

function genExample() {
    let todos = [] 

    let todo1 = new Todo("Your Things");
    let task1 = new Task("local_cafe","Brewing Coffee", "Dispersing Morning Brain Fog","11am", null,  TASK_STATUS.COMPLETE, "extreme")
    let task2 = new Task("calculate", "Doing Leetcode", "Study Data Structures and Algorithms", "10am", null,  TASK_STATUS.INCOMPLETE, "medium")
    let task3 = new Task("code","Coding Todo App", "Code Vanilla JS Todo App","9am", null,  TASK_STATUS.INCOMPLETE, "low")
    let task4 = new Task("Doing SQL", "I am too stupid even for SQL...", null, null, TASK_STATUS.INCOMPLETE, "medium")
    
    let todo2 = new Todo("Test Todo 2");
    
    todo1.addTask(task1);
    todo1.addTask(task2)
    
    todos.push(todo1)
    
    // console.log(todoList)
    
    todo1.addTask(task3);
    todo2.addTask(task4)
    
    todos.push(todo2)

    return todos;
}

export { genExample };