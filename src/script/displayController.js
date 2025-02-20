"use strict";

import { format } from "date-fns";
import { MATERIAL_ICONS, taskConst } from "./constants";
import { clearEventListeners } from "./helper";
import { TaskController } from "./taskController";

class DisplayController {
    static #instance = null;

    constructor(todoController) {
        if (DisplayController.#instance) {
            return DisplayController.#instance;
        }

        this.todoController = todoController;

        DisplayController.#instance = this;

        this.renderBody();
        this.renderSidebar();
        this.setRenderSidebarTodos();
    }

    renderTodo() {
        this.renderNav();
        this.renderBody();
        this.renderFooter();
        this.renderIconSelect();
    }

    renderNav() {
        const currentTodo = this.todoController.currentTodo;

        const TITLE = currentTodo.name;

        const ACTIVE_TASK_COUNT = currentTodo.getTaskCount(
            "status",
            taskConst.STATUS.INCOMPLETE,
        );
        const COMPLETE_TASK_COUNT = currentTodo.getTaskCount(
            "status",
            taskConst.STATUS.COMPLETE,
        );
        const TOTAL_TASK_COUNT = ACTIVE_TASK_COUNT + COMPLETE_TASK_COUNT;

        let completionPercentageText;
        if (TOTAL_TASK_COUNT > 0) {
            let completionPercentage = Math.round(
                (COMPLETE_TASK_COUNT / TOTAL_TASK_COUNT) * 100,
            );
            completionPercentageText = completionPercentage + "% done";
        } else {
            // Maybe change this to "Get started" and on click add new Dialog box opens
            completionPercentageText = "No tasks yet";
        }

        const today = format(new Date(), "MMM d, yyyy");

        const navHtml = `
            <div id="leftHeader">
                <div id="todoHeader">
                    <h1 class="montserrat">${TITLE}</h1>
                </div>
                <div id="currentDate" class="open-sans">
                ${today}
                </div>
            </div>

            <div id="rightHeader">
                <div class="flex-1"></div>
                <div id="todoTaskStatuses" class="flex-1">
                    <div id="completedTasks" class="flex-1">
                        <div class="number montserrat">${ACTIVE_TASK_COUNT}</div>
                        <div class="open-sans gray">Active</div>
                    </div>
                    <div id="incompleteTasks" class="flex-1">
                        <div class="number montserrat">${COMPLETE_TASK_COUNT}</div>
                        <div class="open-sans gray">Done</div>
                    </div>
                </div>
                <div id="completionPercentage"class="flex-1">
                    <p class="gray">${completionPercentageText}</p>
                </div>
            </div>
        `;

        let nav = document.querySelector("nav");
        nav.innerHTML = "";

        nav.innerHTML = navHtml;
    }

    renderBody() {
        this.renderTask(taskConst.STATUS.COMPLETE);
        this.renderTask(taskConst.STATUS.INCOMPLETE);
    }

    renderFooter() {
        let countSpan = document.querySelector("#completedTaskCount span");

        const COMPLETE_TASK_COUNT =
            this.todoController.currentTodo.getTaskCount(
                "status",
                taskConst.STATUS.COMPLETE,
            );

        countSpan.textContent = COMPLETE_TASK_COUNT;
    }

    generateTask(index, task, statusValue) {
        if (!(task.status === statusValue)) {
            return "";
        }

        const taskIndex = index;
        const taskIcon = task.icon;
        const taskDescription = task.description;
        const taskTitle = task.name;
        const taskTime = task.time;

        function isTaskComplete() {
            return statusValue === taskConst.STATUS.COMPLETE;
        }

        const taskHtml = `
                <div class="task${isTaskComplete() ? " task-complete" : ""}" data-task-index="${taskIndex}">
                    <div class="flex">
                        <div id="taskIcon">
                            <span class="material-symbols-sharp blue-icon">
                                ${taskIcon}
                            </span>
                        </div>
                        <div id="taskText">
                            <div id="taskHeader" class="dark-slate montserrat">${taskTitle}</div>
                            <div id="taskDescription" class="dark-gray open-sans">${taskDescription}</div>
                        </div>
                    </div>
                    <div id="taskTime" class="dark-gray montserrat">${taskTime}</div>
                    <button data-task-index="${taskIndex}" class="btn-floating green hover-button complete-task">
                        <span class="material-symbols-sharp blue-icon">
                                ${isTaskComplete() ? "undo" : "check"}
                            </span>
                    </button>
                </div>
                <hr>
        `;

        return taskHtml;
    }

    renderTask(status) {
        let taskList;
        if (status === taskConst.STATUS.INCOMPLETE) {
            taskList = document.querySelector("#taskList");
        } else if (status === taskConst.STATUS.COMPLETE) {
            taskList = document.querySelector("#completedTaskList");
        }
        taskList.innerHTML = "";

        let taskIndex = 0;
        for (let task of this.todoController.currentTodo.tasks) {
            const taskHtml = this.generateTask(taskIndex, task, status);
            taskList.innerHTML += taskHtml;

            taskIndex++;
        }
    }

    renderSidebar() {
        this.renderSidebarTodos();
    }

    generateTodo(index, todo) {
        const todoIndex = index;
        const todoIcon = todo.icon;
        const todoName = todo.name;

        const todoHtml = ` 
            <div class="todo" data-todo-index="${todoIndex}">
                <span class="material-symbols-sharp"> ${todoIcon}</span>
                <h3>${todoName}</h3>
            </div>
        `;

        return todoHtml;
    }

    renderSidebarTodos() {
        const todoList = document.querySelector("#todoList");
        todoList.innerHTML = "";

        let todoIndex = 0;
        for (let todo of this.todoController.todos) {
            const todoHtml = this.generateTodo(todoIndex, todo);
            todoList.innerHTML += todoHtml;

            todoIndex++;
        }
    }

    renderIconSelect() {
        let div = document.getElementById("iconSelection");

        for (let icon of MATERIAL_ICONS) {
            const iconHtml = `<div class="task-icon">
                                <span class="material-symbols-sharp blue-icon icon-selection">${icon}</span>
                            </div>`;

            div.innerHTML += iconHtml;
        }
    }

    setRenderSidebarTodos() {
        const app = document.querySelector("#app");

        const todos = document.querySelectorAll(".todo");

        todos.forEach((todoNode) => {
            const todo = clearEventListeners(todoNode);

            todo.addEventListener("click", () => {
                const todoIndex = todo.dataset.todoIndex;
                app.dataset.todoIndex = todoIndex;
                this.renderTodo(); //render

                TaskController.instance.setToggleTaskStatus();
            });
        });
    }
}

export { DisplayController };
