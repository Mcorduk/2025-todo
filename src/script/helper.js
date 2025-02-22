import { Todo } from "./todo";
import { Task } from "./task";
import { todos } from "./data";

// "gen" means generated
function generateExampleTodos() {
    let exampleTodos = [];

    if (!todos) {
        console.log("No example todo's were found.");
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

function clearEventListeners(node) {
    const newNode = node.cloneNode(true);
    node.replaceWith(newNode);

    return newNode;
}

export { generateExampleTodos, clearEventListeners };
