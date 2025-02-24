import { Task } from "./task";
import { Todo } from "./todo";
import { clearEventListeners } from "./helper";

class EventController {
    static #instance = null;

    constructor(todoController, displayController) {
        if (EventController.#instance) {
            return EventController.#instance;
        }

        this._todoController = todoController;
        this._displayController = displayController;

        this.iconDialog = document.querySelector("#iconDialog");
        this.addTaskDialog = document.querySelector("#addTaskDialog");
        this.addTaskForm = document.querySelector("#addTaskForm");
        this.addTodoDialog = document.querySelector("#addTodoDialog");
        this.addTodoForm = document.querySelector("#addTodoForm");

        EventController.#instance = this;

        this.initializeEventListeners();
    }

    static get instance() {
        return this.#instance;
    }

    get todoController() {
        return this._todoController;
    }

    get displayController() {
        return this._displayController;
    }

    initializeEventListeners() {
        this.setSidebarTodos();
        this.setToggleTaskStatus();

        this.setCompletedTasks();

        this.setAddTaskDialog();
        this.setAddTodoDialog();
        this.setIconListToggle();

        this.iconDialog.addEventListener("click", (e) => this.selectIcon(e));

        this.handleOutsideClick();
    }

    setAddTaskDialog() {
        document
            .querySelector("#addTaskDialog .dialog-header>button")
            .addEventListener("click", () => {
                this.addTaskDialog.close();
            });
        document
            .querySelector("#closeAddTaskDialog")
            .addEventListener("click", () => this.addTaskDialog.close());

        document
            .querySelector("#showAddTaskDialog")
            .addEventListener("click", () => {
                this.addTaskDialog.showModal();
            });

        this.addTaskForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = this.sendTaskForm();
            const newTask = this.createFromForm(formData, "task");

            const currentTodo = this.todoController.currentTodo;
            currentTodo.tasks = [...currentTodo.tasks, newTask];

            this.displayController.renderTodo(); //render
            this.setToggleTaskStatus(); //re-attach event listeners

            this.addTaskForm.reset();
            this.addTaskDialog.close();
        });
    }
    setAddTodoDialog() {
        document
            .querySelector("#addTodoDialog .dialog-header>button")
            .addEventListener("click", () => {
                this.addTodoDialog.close();
            });

        document
            .querySelector("#closeAddTodoDialog")
            .addEventListener("click", () => this.addTodoDialog.close());
        document
            .querySelector("#showAddTodoDialog")
            .addEventListener("click", () => {
                this.addTodoDialog.showModal();
            });

        this.addTodoForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const formData = this.sendTodoForm();
            const newTodo = this.createFromForm(formData, "todo");
            let todoList = this._todoController.todos;
            if (todoList.length >= 10) {
                alert("Max of 10 Todos can be added.");
                this.addTodoForm.reset();
                this.addTodoDialog.close();
                return;
            }
            todoList.push(newTodo);

            this.displayController.renderSidebar();
            this.displayController.setRenderSidebarTodos();

            this.addTodoForm.reset();
            this.addTodoDialog.close();
        });
    }

    setToggleTaskStatus() {
        const completeButtons = document.querySelectorAll(
            "button.complete-task",
        );

        completeButtons.forEach((button) => {
            const newBtn = clearEventListeners(button);
            newBtn.addEventListener("click", () => {
                const currentTodo = this.todoController.currentTodo;

                const taskIndex = button.dataset.taskIndex;
                const currentTask = currentTodo.tasks[taskIndex];

                currentTask.toggleStatus();

                this.displayController.renderTodo(); //render
                this.setToggleTaskStatus(); //reattach eventListeners
            });
        });
    }

    toggleIconList() {
        let iconDialog = document.querySelector("#iconDialog");

        if (iconDialog.open) {
            iconDialog.close();
        } else {
            iconDialog.showModal();
        }
    }

    selectIcon(event) {
        if (event.target.tagName === "SPAN") {
            let icon = this.getFormIcon();

            icon.textContent = event.target.textContent;
            icon.classList.add("selected");

            this.iconDialog.close();
        }
    }

    getFormIcon() {
        let icon;
        if (this.addTaskDialog.open) {
            icon = document.querySelector("#showTaskIconList");
        } else if (this.addTodoDialog.open) {
            icon = document.querySelector("#showTodoIconList");
        }

        return icon;
    }

    sendTaskForm() {
        const formData = new FormData(this.addTaskForm);

        return formData;
    }

    sendTodoForm() {
        const formData = new FormData(this.addTodoForm);

        return formData;
    }

    createFromForm(formData, type = "task") {
        if (!formData) {
            throw new Error("Form data is corrupted");
        }

        let element;
        let icon;

        if (type === "task") {
            element = new Task();
            icon = document.querySelector("#showTaskIconList").textContent;
        } else if (type === "todo") {
            icon = document.querySelector("#showTodoIconList").textContent;
            element = new Todo();
        }

        formData.append("icon", icon);

        for (let [key, value] of formData.entries()) {
            element[key] = value;
        }

        return element;
    }

    setIconListToggle() {
        document
            .querySelector("#showTaskIconList")
            .addEventListener("click", () => this.toggleIconList());

        document
            .querySelector("#showTodoIconList")
            .addEventListener("click", () => this.toggleIconList());
    }

    setCompletedTasks() {
        const showCompletedBtn = document.querySelector("#showCompletedTasks");
        const completedTaskCount = document.querySelector(
            "#completedTaskCount",
        );

        const completedTasksContainer = document.querySelector(
            "#completedTasksContainer",
        );
        const completedTaskList = document.querySelector("#completedTaskList");

        if (
            !showCompletedBtn ||
            !completedTasksContainer ||
            !completedTaskList
        ) {
            throw new Error("setCompletedTasks didnt work");
        }

        // Prevent event handler being added twice, replace with fresh btn
        const showCompletedTasks = document.querySelector(
            "#showCompletedTasks",
        );
        const newBtn = clearEventListeners(showCompletedTasks);
        const newCompletedTaskCount = clearEventListeners(completedTaskCount);
        [newBtn, newCompletedTaskCount].forEach((node) => {
            node.addEventListener("click", () => {
                const icon = document.querySelector("span.north");

                completedTasksContainer.classList.toggle("slide-up");
                completedTaskList.classList.toggle("hidden");
                icon.classList.toggle("rotated");
            });
        });
    }

    setSidebarTodos() {
        const app = document.querySelector("#app");

        const todos = document.querySelectorAll(".todo");

        todos.forEach((todoNode) => {
            const todo = clearEventListeners(todoNode);

            todo.addEventListener("click", () => {
                const todoIndex = todo.dataset.todoIndex;
                app.dataset.todoIndex = todoIndex;

                this.displayController.renderTodo();
                this.setToggleTaskStatus();
            });
        });
    }

    handleOutsideClick() {
        //dialogs
        document.querySelectorAll("dialog").forEach((dialog) => {
            dialog.addEventListener("click", (event) => {
                if (event.target === dialog) {
                    dialog.close();
                }
            });
        });
        // const app = document.querySelector("#app");
        // app.addEventListener("click", (event) => {
        //     const sidebar = document.querySelector("aside");

        //     if (!sidebar.contains(event.target)) {
        //         console.log("Clicked outside the sidebar!");
        //         this.toggleSidebar("close");
        //     }
        // });
    }

    toggleSidebar(type) {
        let sidebar = document.querySelector(".sidebar");
        let hambButton = document.querySelector(".hamb");
        let svg = document.querySelector(".hamb > svg.ham");

        const isClosed =
            type === "close" ||
            (type !== "open" && sidebar.classList.contains("is-closed"));

        sidebar.classList.toggle("is-closed", isClosed);
        hambButton.classList.toggle("active", !isClosed);
        svg.classList.toggle("black", !isClosed);
    }
}

export { EventController };
