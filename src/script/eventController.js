import { MATERIAL_ICONS } from "./constants";
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
        this._currentIcon = MATERIAL_ICONS[0];

        this.iconDialog = document.querySelector("#iconDialog");
        this.addTaskDialog = document.querySelector("#addTaskDialog");
        this.addTaskForm = document.querySelector("#addTaskForm");
        this.addTodoDialog = document.querySelector("#addTodoDialog");
        this.addTodoForm = document.querySelector("#addTodoForm");

        EventController.#instance = this;

        this.setEventListeners();
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

    get currentIcon() {
        return this._currentIcon;
    }

    setEventListeners() {
        // Task Completion Button on Hover over
        this.setToggleTaskStatus();

        this.setCompletedTasks();

        this.setAddTaskDialog();
        this.setAddTodoDialog();

        document
            .querySelector("#showTaskIconList")
            .addEventListener("click", () => this.toggleIconList());

        const showTodo = document.querySelector("#showTodoIconList");
        const newTodo = clearEventListeners(showTodo);
        newTodo.addEventListener("click", () => this.toggleIconList());

        document
            .querySelector("#closeAddTaskDialog")
            .addEventListener("click", () => this.addTaskDialog.close());
        document
            .querySelector("#closeAddTodoDialog")
            .addEventListener("click", () => this.addTodoDialog.close());

        this.iconDialog.addEventListener("click", (e) => this.selectIcon(e));
    }

    setAddTaskDialog() {
        document
            .querySelector("#showAddTaskDialog")
            .addEventListener("click", () => {
                this.addTaskDialog.showModal();
            });

        const newForm = clearEventListeners(this.addTaskForm);
        newForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = this.sendTaskForm();
            const newTask = this.createFromForm(formData, "task");

            // get this added to current Todo's task list
            const currentTodo = this.todoController.currentTodo;
            currentTodo.tasks = [...currentTodo.tasks, newTask];

            this.displayController.renderTodo(); //render
            this.setToggleTaskStatus(); //re-attach event listeners

            this.addTaskDialog.close();
        });
    }

    setAddTodoDialog() {
        document
            .querySelector("#showAddTodoDialog")
            .addEventListener("click", () => {
                this.addTodoDialog.showModal();
            });

        const newForm = clearEventListeners(this.addTodoForm);
        newForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = this.sendTodoForm();
            const newTodo = this.createFromForm(formData, "todo");

            this._todoController.todos.push(newTodo);

            this.displayController.renderSidebar();
            this.displayController.setRenderSidebarTodos();

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
        if (event.targetid !== "iconDialog") {
            this.iconDialog.close();
        }

        if (event.target.tagName === "SPAN") {
            this._currentIcon = event.target.textContent;
            console.log("Selected Icon:", this._currentIcon);
            this.changeTaskIcon();
            this.iconDialog.close();
        }
    }

    changeTaskIcon() {
        //Need to know if we are changing todo or task form icon
        let icon;
        if (this.addTaskDialog.open) {
            icon = document.querySelector("#showTaskIconList");
        } else if (this.addTodoDialog.open) {
            icon = document.querySelector("#showTodoIconList");
        }

        icon.textContent = this._currentIcon;
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
}

export { EventController };
