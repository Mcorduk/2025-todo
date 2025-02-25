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
        this.editTaskDialog = document.querySelector("#editTaskDialog");
        this.editTaskForm = document.querySelector("#editTaskForm");
        this.addTodoDialog = document.querySelector("#addTodoDialog");
        this.addTodoForm = document.querySelector("#addTodoForm");
        this.deleteTodoDialog = document.querySelector("#deleteTodoDialog");
        this.deleteTodoForm = document.querySelector("#deleteTodoForm");
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
        this.setDeleteTask();
        this.setEditTask();

        this.setCompletedTasks();

        this.setAddTaskDialog();
        this.setAddTodoDialog();
        this.setDeleteTodoDialog();
        this.setEditTaskDialog();
        this.setIconListToggle();

        this.iconDialog.addEventListener("click", (e) => this.selectIcon(e));

        this.handleOutsideClick();
    }

    setAddTaskDialog() {
        let backButton = document.querySelector(
            "#addTaskDialog .dialog-header>button",
        );
        let cancelButton = document.querySelector("#closeAddTaskDialog");
        let addButton = document.querySelector("#showAddTaskDialog");

        backButton.addEventListener("click", () => {
            this.addTaskDialog.close();
        });
        cancelButton.addEventListener("click", () =>
            this.addTaskDialog.close(),
        );

        addButton.addEventListener("click", () => {
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
            this.setDeleteTask();
            this.setEditTask();

            this.addTaskForm.reset();
            this.addTaskDialog.close();
        });
    }

    setEditTaskDialog() {
        let backButton = document.querySelector(
            "#editTaskDialog .dialog-header>button",
        );
        let cancelButton = document.querySelector("#closeEditTaskDialog");

        backButton.addEventListener("click", () => {
            this.editTaskDialog.close();
        });

        cancelButton.addEventListener("click", () =>
            this.editTaskDialog.close(),
        );

        this.editTaskForm.addEventListener("submit", (e) => {
            e.preventDefault();

            let formData = this.sendEditTaskForm();

            let taskIndex = this.editTaskForm.dataset.taskIndex; //task being edited index
            let currentTodo = this.todoController.currentTodo;
            let newTask = this.createFromForm(formData, "edit"); //task with new info

            currentTodo.editTask(taskIndex, newTask);

            this.displayController.renderTodo(); //render

            this.setToggleTaskStatus(); //re-attach event listeners
            this.setEditTask();
            this.setDeleteTask();

            this.editTaskForm.reset();
            this.editTaskDialog.close();
        });
    }

    setAddTodoDialog() {
        let backButton = document.querySelector(
            "#addTodoDialog .dialog-header>button",
        );
        let cancelButton = document.querySelector("#closeAddTodoDialog");
        let addButton = document.querySelector("#showAddTodoDialog");

        backButton.addEventListener("click", () => {
            this.addTodoDialog.close();
        });

        cancelButton.addEventListener("click", () =>
            this.addTodoDialog.close(),
        );
        addButton.addEventListener("click", () => {
            this.addTodoDialog.showModal();
        });

        this.addTodoForm.addEventListener("submit", (e) => {
            e.preventDefault();

            let formData = this.sendTodoForm();
            let newTodo = this.createFromForm(formData, "todo");
            let todoList = this._todoController.todos;
            if (todoList.length >= 10) {
                alert("Max of 10 Todos can be added.");
                this.addTodoForm.reset();
                this.addTodoDialog.close();
                return;
            }
            todoList.push(newTodo);

            this.displayController.renderSidebar();
            this.setSidebarTodos();

            this.addTodoForm.reset();
            this.addTodoDialog.close();
        });
    }

    setDeleteTodoDialog() {
        let backButton = document.querySelector(
            "#deleteTodoDialog .dialog-header>button",
        );
        let cancelButton = document.querySelector("#closeDeleteTodoDialog");
        let deleteButton = document.querySelector("#showDeleteTodoDialog");

        backButton.addEventListener("click", () => {
            this.deleteTodoDialog.close();
        });

        cancelButton.addEventListener("click", () =>
            this.deleteTodoDialog.close(),
        );
        deleteButton.addEventListener("click", () => {
            this.populateTodoSelect();
            this.deleteTodoDialog.showModal();
        });

        this.deleteTodoForm.addEventListener("submit", (e) => {
            e.preventDefault();

            let formData = this.sendDeleteTodoForm();
            let todoList = this._todoController.todos;
            if (todoList.length === 0) {
                alert("No todos are available for deleting.");
                this.deleteTodoForm.reset();
                this.deleteTodoDialog.close();
                return;
            }
            let index = formData.get("todo");

            this.todoController.deleteTodo(index);

            this.displayController.renderTodo();
            this.displayController.renderSidebar();
            this.setSidebarTodos();

            this.deleteTodoForm.reset();
            this.deleteTodoDialog.close();
        });
    }

    setToggleTaskStatus() {
        const completeButtons = document.querySelectorAll("button.complete");

        completeButtons.forEach((button) => {
            const newBtn = clearEventListeners(button);
            newBtn.addEventListener("click", () => {
                let currentTodo = this.todoController.currentTodo;

                const taskIndex = button.dataset.taskIndex;
                let currentTask = currentTodo.tasks[taskIndex];

                currentTask.toggleStatus();

                this.displayController.renderTodo(); //render
                this.setToggleTaskStatus();
                this.setEditTask();
                this.setDeleteTask(); //reattach eventListeners //FIXME
            });
        });
    }

    setDeleteTask() {
        const deleteButtons = document.querySelectorAll("button.delete");

        deleteButtons.forEach((button) => {
            const newBtn = clearEventListeners(button);
            newBtn.addEventListener("click", () => {
                const currentTodo = this.todoController.currentTodo;

                const taskIndex = button.dataset.taskIndex;

                currentTodo.deleteTask(taskIndex);

                this.displayController.renderTodo(); //render
                this.setToggleTaskStatus();
                this.setEditTask();
                this.setDeleteTask(); //reattach eventListeners //FIXME
            });
        });
    }

    setEditTask() {
        const editButtons = document.querySelectorAll("button.edit");

        editButtons.forEach((button) => {
            const newBtn = clearEventListeners(button);
            newBtn.addEventListener("click", () => {
                let taskIndex = newBtn.dataset.taskIndex;
                let task = this.todoController.currentTodo.tasks[taskIndex];

                this.editTaskForm.dataset.taskIndex = taskIndex;
                this.editTaskDialog.showModal();

                this.fillEditForm(task);

                this.setToggleTaskStatus();
                this.setEditTask();
                this.setDeleteTask();
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
        } else if (this.editTaskDialog.open) {
            icon = document.querySelector("#showEditTaskIconList");
        }

        return icon;
    }

    sendTaskForm() {
        const formData = new FormData(this.addTaskForm);

        return formData;
    }

    sendEditTaskForm() {
        const formData = new FormData(this.editTaskForm);

        return formData;
    }

    sendTodoForm() {
        const formData = new FormData(this.addTodoForm);

        return formData;
    }

    sendDeleteTodoForm() {
        const formData = new FormData(this.deleteTodoForm);

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
        } else if (type === "edit") {
            element = new Task();
            icon = document.querySelector("#showEditTaskIconList").textContent;
        }
        icon.trim().replace(/\s+/g, "");
        formData.append("icon", icon);

        for (let [key, value] of formData.entries()) {
            if (key) {
                element[key] = value;
            }
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

        document
            .querySelector("#showEditTaskIconList")
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

                this.toggleSidebar();
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

        //trying to make sidebar close when open and outside is clicked

        // const app = document.querySelector("#app");
        // app.addEventListener("click", (event) => {
        //     const sidebar = document.querySelector("aside");

        //     if (!sidebar.contains(event.target)) {
        //         console.log("Clicked outside the sidebar!");
        //         this.toggleSidebar("close");
        //     }
        // });
    }

    toggleSidebar() {
        let sidebar = document.querySelector(".sidebar");
        let hambButton = document.querySelector(".hamb");
        let svg = document.querySelector(".hamb > svg.ham");

        // const isClosed =
        //     type === "close" ||
        //     (type !== "open" && sidebar.classList.contains("is-closed"));

        // sidebar.classList.toggle("is-closed", isClosed);
        // hambButton.classList.toggle("active", !isClosed);
        // svg.classList.toggle("black", !isClosed);

        sidebar.classList.toggle("is-closed");
        hambButton.classList.toggle("active");
        svg.classList.toggle("black");
    }

    fillEditForm(task) {
        this.editTaskForm
            .querySelectorAll("input, textarea, select")
            .forEach((input) => {
                const fieldName = input.id;
                if (task[fieldName] !== undefined) {
                    // Handling for select elements like status and priority
                    if (input.tagName === "SELECT" && task[fieldName]) {
                        input.value = task[fieldName]; // Set the value of select elements
                    } else {
                        input.value = task[fieldName]; // Handle other input types (text, textarea, etc.)
                    }
                }
            });
    }

    populateTodoSelect() {
        const selectElement = document.querySelector("#todo");
        const todos = this.todoController.todos;

        selectElement.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Select a Todo";
        selectElement.appendChild(defaultOption);

        todos.forEach((todo, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = todo.name;
            selectElement.appendChild(option);
        });
    }
}

export { EventController };
