"use strict";

import { taskConst } from "./constants";

// TODO: Enable a seperate Todo List
// User can add or delete Todo List Separate from the default one
// User can navigate to Todo's from sidebar

class Todo {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    addTask(task) {
        return this.tasks.push(task);
    }

    deleteTask(index) {
        if (index > -1 && index < this.tasks.length) {
            this.tasks.splice(index, 1);
        }
    }

    getTaskCount(
        property = taskConst.PROPERTY.STATUS,
        value = taskConst.STATUS.INCOMPLETE,
    ) {
        let count = 0;

        for (let task of this.tasks) {
            const PROPERTIES = Object.values(taskConst.PROPERTY);

            if (!PROPERTIES.includes(property)) {
                throw new Error("Unidentified property");
            }

            if (task[property] === value) {
                count++;
            }
        }

        return count;
    }

    getTask(index) {
        return this.tasks[index];
    }
}

export { Todo };
