import { MATERIAL_ICONS } from "./constants";
import { Task } from "./task";
import { DisplayController } from "./displayController";

class AddTaskController {
    constructor(todoController){
        this._todoController = todoController;
        this._currentIcon = MATERIAL_ICONS[0];  
        this.iconDialog = document.getElementById("iconDialog");
        this.addTaskDialog = document.getElementById("addTaskDialog")

        this.setEventListeners();
    }

    get todoController(){ return this._todoController }

    get currentIcon(){ return this._currentIcon; }

    setEventListeners(){
        this.setTaskDialog()
        document.getElementById("sendTaskForm").addEventListener("click", () => this.sendTaskForm())
        
        document.getElementById("showTaskIconList").addEventListener("click", () => this.toggleIconList())
        this.iconDialog.addEventListener("click", (e) => this.selectIcon(e))

    }

    setTaskDialog() {
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
            currentTodo.tasks.push(newTask);
            DisplayController.renderTodo();
            this.addTaskDialog.close()
        })
    }

    showAddTaskDialog() {
        this.addTaskDialog.showModal();
        console.log("Show Add Task Dialog event triggered.")
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

        for(let [key, value] of formData) [
            task[key] = value
        ]

        
    }
}

export { AddTaskController };