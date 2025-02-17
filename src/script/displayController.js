"use strict";

import { Todo } from './todo';
import { format } from 'date-fns'

class DisplayController {
    constructor() {
        this._todoList = [];
        this._currentTodo = new Todo("Your Things");
    }

    get todoList() { return this._todoList; }
  
    get currentTodo() { return this._currentTodo; }

    renderNav(){

        const currentTodo = this.currentTodo;

        const TITLE = currentTodo.name;
        
        const ACTIVE_TASK_COUNT = currentTodo.getTaskCount("status", "complete");
        const COMPLETE_TASK_COUNT = currentTodo.getTaskCount("status", "complete");
    
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
                    <p class="gray">65% done</p>
                </div>
            </div>
        `

        let nav = document.querySelector('nav');
        nav.innerHTML = '';

        nav.innerHTML = navHtml;
    }

    renderTodo() {
   
    }
  }

  export { DisplayController };