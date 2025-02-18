"use strict";

import { TASK_STATUS, TASK_PRIORITY } from "./constants";

class Task {

    static STATUSES = TASK_STATUS;
    static PRIORITIES = TASK_PRIORITY;

    constructor(icon, name, description, time, date, status = TASK_STATUS.INCOMPLETE, priority = TASK_PRIORITY.LOW) {
      
      this._icon = icon;
      this._name = name;
      this._description = description;
      this._time = time;
      this._date = date;
      this._status = status;
      this._priority = priority;
    }
    get icon() { return this._icon; }

    get name() { return this._name; }

    get description() { return this._description; }

    get time() { return this._time; }

    get date() { return this.date; }

    get status() { return this._status; }

    get priority() { return this._priority; }

    set status(newStatus) {
      const STATUSES = Object.values(TASK_STATUS)
      if (!STATUSES.includes(newStatus)) {
        console.log("Please pick an appropriate status.");
        return;
      }
  
      this._status = newStatus;
    }

    set priority(newPriority) {
      const TASK_PRIORITIES = Object.values(TASK_PRIORITY);
      if (!TASK_PRIORITIES.includes(newPriority)) {
        console.log("Please pick an appropriate priority.");
        return;
      }
  
      this._priority = newPriority;
    }

    toggleStatus() {
      if(this.status === TASK_STATUS.INCOMPLETE) {
        this.status = TASK_STATUS.COMPLETE;
      } else if(this.status === TASK_STATUS.COMPLETE) {
        this.status = TASK_STATUS.INCOMPLETE;
      }
    }
  
    togglePriority(index) {
      const priorities = Object.values(TASK_PRIORITY)
      let priorityIndex = priorities.indexOf(this.priority)
  
      this.priority = priorities[priorityIndex + 1]
    }
  }

  export { Task };