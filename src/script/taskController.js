import { MATERIAL_ICONS } from "./constants";
import { Task } from "./task";
import { clearEventListeners } from "./helper";

class TaskController {
    static #instance = null;

    constructor(todoController, displayController) {
        if (TaskController.#instance) {
            return TaskController.#instance;
        }

        this._todoController = todoController;
        this._displayController = displayController;
        this._currentIcon = MATERIAL_ICONS[0];
        this.iconDialog = document.querySelector("#iconDialog");
        this.addTaskDialog = document.querySelector("#addTaskDialog");

        TaskController.#instance = this;

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

        // Add a New Task Form Dialog
        this.setAddTaskDialog();

        document
            .querySelector("#showTaskIconList")
            .addEventListener("click", () => this.toggleIconList());

        document
            .querySelector("#closeAddTaskDialog")
            .addEventListener("click", () => this.addTaskDialog.close());

        this.iconDialog.addEventListener("click", (e) => this.selectIcon(e));
    }

    setAddTaskDialog() {
        document
            .querySelector("#showAddTaskDialog")
            .addEventListener("click", () => {
                this.addTaskDialog.showModal();
            });

        const addTaskForm = document.querySelector("#addTaskForm");
        const newForm = clearEventListeners(addTaskForm);
        newForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = this.sendTaskForm();
            const newTask = this.createTaskFromForm(formData);

            // get this added to current Todo's task list
            const currentTodo = this.todoController.currentTodo;
            currentTodo.tasks = [...currentTodo.tasks, newTask];

            this.displayController.renderTodo(); //render
            this.setToggleTaskStatus(); //re-attach event listeners

            this.addTaskDialog.close();
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
        let icon = document.querySelector("#showTaskIconList");

        icon.textContent = this._currentIcon;
    }

    sendTaskForm() {
        const form = document.querySelector("#addTaskForm");
        const formData = new FormData(form);
        return formData;
    }

    createTaskFromForm(formData) {
        if (!formData) {
            throw new Error("Form data is corrupted");
        }

        const task = new Task();

        // Fetch icon
        const icon = document.querySelector("#showTaskIconList").textContent;

        formData.append("icon", icon);

        for (let [key, value] of formData.entries()) {
            task[key] = value;
        }

        return task;
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

export { TaskController };
