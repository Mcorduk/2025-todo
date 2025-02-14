class Task {

    static STATUSES = ["incomplete", "inprogress", "complete"];
    static PRIORITIES = ["low", "medium", "high", "extreme"];

    constructor(name, description, time, date, status = "incomplete", priority = "low") {
      this._name = name;
      this._description = description;
      this._time = time;
      this._date = date;
      this._status = status;
      this._priority = priority;
    }

    get name() { return this._name; }

    get time() { return this._time; }

    get date() { return this.date; }

    get description() { return this._description; }

    get status() { return this._status; }

    get priority() { return this._priority; }

    set status(newStatus) {
      if (!STATUSES.includes(newStatus)) {
        console.log("Please pick an appropriate status.");
        return;
      }
  
      this._status = newStatus;
    }

    set priority(newPriority) {
      if (!PRIORITIES.includes(newPriority)) {
        console.log("Please pick an appropriate priority.");
        return;
      }
  
      this._priority = newPriority;
    }
  }

  export { Task };