var taskInput=document.getElementById("new-task");
var addButton=document.getElementsByTagName("button")[0];
var incompleteTask=document.getElementById("incomplete-tasks");
var completedTasks=document.getElementById("completed-tasks");
var createNew=function(taskString){
	var listItem=document.createElement("li");
	var check=document.createElement("input");
	var label=document.createElement("label");
	var edInput=document.createElement("input");
	var edButton=document.createElement("button");
	var delButton=document.createElement("button");
	label.innerText=taskString;
	check.type="checkbox";
	edInput.type="text";
	edButton.innerText="Edit";
	edButton.className="edit";
	delButton.innerText="Delete";
	delButton.className="delete";
	listItem.appendChild(check);
	listItem.appendChild(label);
	listItem.appendChild(edInput);
	listItem.appendChild(edButton);
	listItem.appendChild(delButton);
	return listItem;
}
var addTask=function(){
	console.log("Add Task...");
	var listItem=createNew(taskInput.value);
	incompleteTask.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
	taskInput.value="";
}
var editTask=function(){
console.log("Edit Task...");
console.log("Change 'edit' to 'save'");
var listItem=this.parentNode;
var edInput=listItem.querySelector('input[type=text]');
var label=listItem.querySelector("label");
var containsClass=listItem.classList.contains("editMode");
		if(containsClass){
			label.innerText=edInput.value;
		}else{
			edInput.value=label.innerText;
		}
		listItem.classList.toggle("editMode");
}
var deleteTask=function(){
		console.log("Delete Task...");
		var listItem=this.parentNode;
		var ul=listItem.parentNode;
		ul.removeChild(listItem);
}
var taskCompleted=function(){
		console.log("Complete Task...");
	var listItem=this.parentNode;
	completedTasks.appendChild(listItem);
				bindTaskEvents(listItem, taskIncomplete);
}
var taskIncomplete=function(){
		console.log("Incomplete Task...");
		var listItem=this.parentNode;
	incompleteTask.appendChild(listItem);
			bindTaskEvents(listItem,taskCompleted);
}
var ajaxRequest=function(){
	console.log("AJAX Request");
}
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);
var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
	console.log("bind list item events");
	var check=taskListItem.querySelector("input[type=checkbox]");
	var edButton=taskListItem.querySelector("button.edit");
	var delButton=taskListItem.querySelector("button.delete");
			edButton.onclick=editTask;
			delButton.onclick=deleteTask;
			check.onchange=checkBoxEventHandler;
}
	for (var i=0; i<incompleteTask.children.length;i++){
		bindTaskEvents(incompleteTask.children[i],taskCompleted);
	}
	for (var i=0; i<completedTasks.children.length;i++){
		bindTaskEvents(completedTasks.children[i],taskIncomplete);
	}