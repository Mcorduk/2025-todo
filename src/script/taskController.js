import { MATERIAL_ICONS } from "./constants";

class TaskController {
    constructor(currentTodo){
        this._currentTodo = currentTodo;
        this._currentIcon = MATERIAL_ICONS[0];  
        this.iconDialog = document.getElementById("iconDialog");
        this.addTaskDialog = document.getElementById("addTaskDialog")

        this.setEventListeners();
    }

    get currentTodo(){ this._currentTodo; }

    get currentIcon(){ this._currentIcon; }

    setEventListeners(){
        document.getElementById("closeAddTaskDialog").addEventListener("click", () => this.iconDialog.close())
        document.getElementById("showAddTaskDialog").addEventListener("click", () => this.showAddTaskDialog())
        document.getElementById("sendTaskForm").addEventListener("click", () => this.sendTaskForm())
        
        document.getElementById("showTaskIconList").addEventListener("click", () => this.toggleIconList())
        document.getElementById("iconDialog").addEventListener("click", (e) => this.selectIcon(e))

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
        if (event.target.tagName === "SPAN") {
            this._currentIcon = event.target.textContent;
            console.log("Selected Icon:", this._currentIcon);
            this.changeTaskIcon();
        }
    }

    changeTaskIcon(){
        let icon = document.getElementById("showTaskIconList");
    
        icon.textContent = this._currentIcon;
    }

    sendTaskForm(){}
}

export { TaskController };