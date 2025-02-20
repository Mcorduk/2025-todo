import { Todo } from "./todo";
import { Task } from "./task";
import { taskConst } from "./constants";

// FIXME: put tasks and todo's in an object and iterate thru them to create example todo/tasks
function genExample() {
    let todos = [];

    let todo1 = new Todo("home", "Home");
    let task1 = new Task(
        "local_cafe",
        "Brewing Coffee",
        "Dispersing Morning Brain Fog",
        "11am",
        null,
        taskConst.STATUS.COMPLETE,
        "extreme",
    );
    let task2 = new Task(
        "calculate",
        "Doing Leetcode",
        "Study Data Structures and Algorithms",
        "10am",
        null,
        taskConst.STATUS.INCOMPLETE,
        "medium",
    );
    let task3 = new Task(
        "code",
        "Coding Todo App",
        "Code Vanilla JS Todo App",
        "9am",
        null,
        taskConst.STATUS.INCOMPLETE,
        "low",
    );
    let task4 = new Task(
        "code",
        "Doing SQL",
        "I am too stupid even for SQL...",
        "8pm",
        null,
        taskConst.STATUS.INCOMPLETE,
        "medium",
    );

    let todo2 = new Todo("mail", "Post");
    let todo3 = new Todo("group", "Friends");
    let todo4 = new Todo("volunteer_activism", "Oni");
    let task5 = new Task(
        "alarm",
        "Get a Job",
        "Find a Remote Programming Job",
        "9am",
        null,
        taskConst.STATUS.INCOMPLETE,
        "extreme",
    );
    let task6 = new Task(
        "calculate",
        "Marry Snomoni",
        "A Smile Worth Thousand Bouquets",
        "10am",
        null,
        taskConst.STATUS.INCOMPLETE,
        "extreme",
    );
    let task7 = new Task(
        "star",
        "Decide on Marriage",
        "It Only Took Four Years Love",
        "9am",
        null,
        taskConst.STATUS.COMPLETE,
        "low",
    );
    let task8 = new Task(
        "delete",
        "Send Dad Away",
        "She Would be All OVER Him...",
        "8pm",
        null,
        taskConst.STATUS.COMPLETE,
        "medium",
    );
    todo1.addTask(task1);
    todo1.addTask(task2);

    todo1.addTask(task3);
    todo2.addTask(task4);

    todo4.addTask(task5);
    todo4.addTask(task6);
    todo4.addTask(task7);
    todo4.addTask(task8);

    todos.push(todo1, todo2, todo3, todo4);

    return todos;
}

function clearEventListeners(node) {
    const newNode = node.cloneNode(true);
    node.replaceWith(newNode);

    return newNode;
}

export { genExample, clearEventListeners };
