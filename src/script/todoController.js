import { generateExampleTodos } from "./helper";
import { LocalStorage } from "./localStorage";
class TodoController {
    static #instance = null;

    constructor() {
        if (TodoController.#instance) {
            return TodoController.#instance;
        }

        this._todos = []; // local storage check
        this._currentTodo;
        this._currentTodoIndex = 0;

        TodoController.#instance = this;
    }

    initialize() {
        // checkLocalStorage for todos
        this.currentTodoIndex = LocalStorage.loadLastTodo();

        if (LocalStorage.hasTodosInLocalStorage()) {
            this._todos = LocalStorage.loadTodos();
        } else {
            this._todos = generateExampleTodos();
        }

        LocalStorage.loadLastTodo();
    }

    get todos() {
        return this._todos;
    }

    get currentTodo() {
        const app = document.getElementById("app");
        this.currentTodoIndex = app.dataset.todoIndex;
        // app.setAttribute("data-todo-index", todoIndex)
        this._currentTodo = this.todos[this.currentTodoIndex];
        return this._currentTodo;
    }

    get currentTodoIndex() {
        return this._currentTodoIndex;
    }

    set currentTodoIndex(index) {
        const app = document.getElementById("app");
        app.setAttribute("data-todo-index", index);

        this._currentTodoIndex = index;
    }

    addTodo(todo) {
        this._todos.push(todo);
    }

    deleteTodo(index) {
        if (this.todos.length === 1) {
            alert("There should be at least 1 todo!");
            return;
        }
        if (index > -1 && index < this.todos.length) {
            this.todos.splice(index, 1);
        }

        if (index === "0") {
            this.currentTodoIndex = 1;
        } else {
            this.currentTodoIndex = index - 1;
        }
    }
}

export { TodoController };
