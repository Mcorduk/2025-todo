import { genExample } from "./helper";

class TodoController {
    static #instance = null;

    constructor() {

        if(TodoController.#instance) {
            return TodoController.#instance;
        };

        this._todos = []; // local storage check
        this._currentTodo;
        this._currentTodoIndex;

        TodoController.#instance = this;
    }

    get todos() { return this._todos}

    get currentTodo() {
        const app = document.getElementById('app');
        this.currentTodoIndex = app.dataset.todoIndex;
        // app.setAttribute("data-todo-index", todoIndex)
        this._currentTodo = this.todos[this.currentTodoIndex];
        return this._currentTodo;
    }

    get currentTodoIndex (){ return this._currentTodoIndex }

    set currentTodoIndex(index) { 
        const app = document.getElementById('app')
        app.setAttribute("data-todo-index", index)

        this._currentTodoIndex = index
    }

    initialize() {
        // checkLocalStorage for todos
        let localStorage = false;

        if (!localStorage){
            this._todos = genExample();
            this.currentTodoIndex = 0;
        }
    }

    addTodo(todo) {
        this._todos.push(todo);
    }

    deleteTodo(index) {
        if (index > -1 && index < this._tasks.length) {
          this._todos.splice(index, 1);
        }
      }
}

export { TodoController };