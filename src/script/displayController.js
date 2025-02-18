"use strict";

import { Todo } from './todo';
import { format } from 'date-fns'
import { MATERIAL_ICONS, TASK_STATUS } from './constants';

class DisplayController {
    constructor(todoController) {
        this._todoController = todoController;

        this.renderTodo()
    }

        get todoController() { return this._todoController }

    // get currentTodo() { return this._currentTodo; }

    // get currentTodoIndex() { return this._currentTodoIndex; }

    // set currentTodo(Todo) { 
    //     this._currentTodo = Todo
    //     this.renderTodo()
    // }

    // set currentTodoIndex(currentTodoIndex) {this._currentTodoIndex = currentTodoIndex; }

    renderTodo() {

        this.renderNav();
        this.renderBody();
        this.renderFooter();
        this.renderIconSelect();
    }

    renderNav(){

        const currentTodo = this.todoController.currentTodo;

        const TITLE = currentTodo.name;
        
        const ACTIVE_TASK_COUNT = currentTodo.getTaskCount("status", TASK_STATUS.INCOMPLETE);
        const COMPLETE_TASK_COUNT = currentTodo.getTaskCount("status", TASK_STATUS.COMPLETE);
        const TOTAL_TASK_COUNT  = ACTIVE_TASK_COUNT + COMPLETE_TASK_COUNT;

        let completionPercentageText;
         if(TOTAL_TASK_COUNT > 0) {
            let completionPercentage = Math.round((COMPLETE_TASK_COUNT/TOTAL_TASK_COUNT)*100)
            completionPercentageText = completionPercentage + "% done"

         } else { // Maybe change this to "Get started" and on click add new Dialog box opens
            completionPercentageText = "No tasks yet"
         }
    
        const today = format(new Date(), 'MMM d, yyyy')

        const navHtml =  `
            <div id="leftHeader">
                <div id="sidenav">
                    <button class="hamb" aria-label="Open Menu"><span class="sr-only">Open Menu</span><svg class="ham" viewBox="0 0 100 100"><path class="line top" d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"></path><path class="line middle" d="m 30,50 h 40"></path><path class="line bottom" d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"></path></svg></button>
                </div>
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
        `

        let nav = document.querySelector('nav');
        nav.innerHTML = '';

        nav.innerHTML = navHtml;
    }
    renderBody() {
    

        let taskList = document.getElementById("taskList");

        taskList.innerHTML = "";

        let taskIndex = 0;
        for (let task of this.todoController.currentTodo.tasks )
        {
        const taskHtml = this.renderTask(taskIndex, task)
        taskList.innerHTML += taskHtml;

        taskIndex++;
        }
    }

    renderFooter() {
        let countSpan = document.querySelector('#completedTaskCount span')
        const COMPLETE_TASK_COUNT = this.todoController.currentTodo.getTaskCount("status", TASK_STATUS.COMPLETE);

        countSpan.textContent = COMPLETE_TASK_COUNT;
    }

    renderTask( index, task ) {
        console.log("rendering this todo of " + task.name)

        const taskIndex = index;
        const taskIcon = task.icon
        const taskDescription = task.description
        const taskTitle = task.name
        const taskTime = task.time

        const taskHtml = `
                <div class="task" data-task-index="${taskIndex}">
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
                </div>
                <hr>
        `

        return taskHtml
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

  }

  export { DisplayController };