import { MATERIAL_ICONS, taskConst } from "./constants";
import { Task } from "./task";

class TaskController {
    static #instance = null;

    constructor(todoController, displayController){
        if(TaskController.#instance) {
            return TaskController.#instance;
        }

        this._todoController = todoController;
        this._displayController = displayController;
        this._currentIcon = MATERIAL_ICONS[0];  
        this.iconDialog = document.getElementById("iconDialog");
        this.addTaskDialog = document.getElementById("addTaskDialog")

        TaskController.#instance = this;

        this.setEventListeners();
    }

    get todoController(){ return this._todoController }

    get currentIcon(){ return this._currentIcon; }

    setEventListeners(){
        // Task Completion Button on Hover over
        this.setCompleteTask()

        // Add a New Task Form Dialog
        this.setAddTaskDialog()
        document.getElementById("sendTaskForm").addEventListener("click", () => this.sendTaskForm())
        
        document.getElementById("showTaskIconList").addEventListener("click", () => this.toggleIconList())
        this.iconDialog.addEventListener("click", (e) => this.selectIcon(e))
    }

    setAddTaskDialog() {
        document.getElementById("showAddTaskDialog").addEventListener("click", () => {
            this.showAddTaskDialog()
        })
        document.getElementById("closeAddTaskDialog").addEventListener("click", () => this.addTaskDialog.close())

        document.getElementById("addTaskForm").addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = this.sendTaskForm();
            const newTask = this.createTaskFromForm(formData)
            
            // get this added to current Todo's task list
            const currentTodo = this.todoController.currentTodo;
            currentTodo.tasks = [...currentTodo.tasks,newTask];

            this._displayController.renderTodo(); //render
            this.setCompleteTask(); //re-attach event listeners 

            this.addTaskDialog.close()
        })
    }

    setCompleteTask() {
        const completeButtons = document.querySelectorAll("button.complete-task")

        completeButtons.forEach( 
            (button) => {

                button.addEventListener("click", () => {

                    const currentTodo = this.todoController.currentTodo;

                    const taskIndex = button.dataset.taskIndex;
                    const currentTask = currentTodo.tasks[taskIndex];

                    currentTask.status = taskConst.STATUS.COMPLETE;

                    this._displayController.renderTodo(); //render
                    this.setCompleteTask() //reattach eventListeners
                })
            }
        );
    };
    

    showAddTaskDialog() {

        this.addTaskDialog.showModal();
    }

    toggleIconList() {

        let iconDialog = document.getElementById("iconDialog");

        if(iconDialog.open) {
            iconDialog.close(); 
        } else {
            iconDialog.showModal(); 
        }
    }

    selectIcon(event){
        
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

    changeTaskIcon(){
        let icon = document.getElementById("showTaskIconList");
    
        icon.textContent = this._currentIcon;
    }

    sendTaskForm(){
        const form = document.getElementById("addTaskForm");
        const formData = new FormData(form);
        return formData;
    }

    createTaskFromForm(formData){
        if(!formData) {
        throw new Error("Form data is corrupted")
        }

        const task = new Task();

        // Fetch icon
        const icon = document.getElementById("showTaskIconList").textContent;
        
        formData.append("icon", icon)

        for(let [key, value] of formData.entries()) { 
            task[key] = value
        }

        return task;
    }
}

export { TaskController };