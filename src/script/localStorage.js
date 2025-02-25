import { Todo } from "./todo";
import { Task } from "./task";

class LocalStorage {
    static saveTodos(todos) {
        let todosJson = todos.map((todo) => ({
            icon: todo.icon,
            name: todo.name,
            tasks: todo.tasks.map((task) => ({
                icon: task.icon,
                name: task.name,
                description: task.description,
                time: task.time,
                date: task.date,
                status: task.status,
                priority: task.priority,
            })),
        }));

        localStorage.setItem("todos", JSON.stringify(todosJson));
    }

    static loadTodos() {
        let savedTodos = localStorage.getItem("todos");

        if (!savedTodos) return [];

        let parsedTodos = JSON.parse(savedTodos);

        return parsedTodos.map((todoData) => {
            let todo = new Todo(todoData.icon, todoData.name);

            // Restore tasks inside each todo
            todo.tasks = todoData.tasks.map(
                (taskData) =>
                    new Task(
                        taskData.icon,
                        taskData.name,
                        taskData.description,
                        taskData.time,
                        taskData.date,
                        taskData.status,
                        taskData.priority,
                    ),
            );

            return todo;
        });
    }

    saveLastTodo(index) {
        localStorage.setItem("currentTodoIndex", index);
    }

    loadLastTodo() {
        let storedIndex = localStorage.getItem("currentTodoIndex");
        if (!storedIndex) {
            storedIndex = 0;
        }
        return storedIndex;
    }

    static hasTodosInLocalStorage() {
        let todos = localStorage.getItem("todos");
        return todos !== null && todos !== "[]" && todos.trim() !== "";
    }
}

export { LocalStorage };
