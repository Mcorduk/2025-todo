import { Todo } from "./todo";
import { Task } from "./task";
import { todos } from "./data";

// "gen" means generated
function generateExampleTodos() {
    let exampleTodos = [];

    if (!todos) {
        return [];
    }

    for (let todo of todos) {
        const newTodo = new Todo(todo.icon, todo.name);

        for (let task of todo.tasks) {
            const newTask = new Task(...Object.values(task));

            newTodo.addTask(newTask);
        }

        exampleTodos.push(newTodo);
    }

    return exampleTodos;
}

// FIXME: this function is a bandaid, event listeners shouldnt be added twice anyways
function clearEventListeners(node) {
    const newNode = node.cloneNode(true);
    node.replaceWith(newNode);

    return newNode;
}

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export { generateExampleTodos, clearEventListeners, capitalizeFirstLetter };
