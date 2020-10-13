//Modal Vars
let modalTitle = document.getElementById("modal-title");
let modalBody = document.getElementById("modal-body");
let modalFooter = document.getElementById("modal-footer");

//On Page Load Activities
    //Get The Current Year for the Footer Copyright
    function currentYear(){
        let year = new Date().getFullYear();
        document.querySelector('#dynamicYear').innerHTML = year;
    };
    currentYear();


//******************************************************************/
//********************** TASKS *************************************/
//******************************************************************/
document.getElementById("btn-add-task").addEventListener('click',(e)=>{
    modalTitle.innerHTML = "Add a New Task"
    modalFooter.innerHTML=`
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" id="btn-save-task" onclick="addTask()" data-dismiss="modal">Save</button>
        `;
    modalBody.innerHTML=`
        <div class="input-group mb-3 col-lg-12">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Task Name:</span>
            </div>
            <input type="text" class="form-control" placeholder="Task" aria-label="taskName" aria-describedby="basic-addon1" id="modal-field-task">
        </div>
        `;
}); 

function addTask(){
    let taskName = document.getElementById("modal-field-task").value;
    let tableRow = document.createElement("TR");
    tableRow.innerHTML = `
        <td>${taskName}</td>
        <td><button type="button" class="btn btn-success">Done</button></td>
        <td><button type="button" class="btn btn-danger btn-delete">X</button></td>
        `
    document.getElementById("task-list-body").appendChild(tableRow);
}

document.querySelector('#task-list-body').addEventListener('click',(e)=>{
    deleteTask(e.target);
});

function deleteTask(element){
    if (element.classList.contains('btn-delete')) {
        element.parentElement.parentElement.remove();
    }
};



//******************************************************************/
//********************** TIMERS ************************************/
//******************************************************************/
document.getElementById("btn-add-timer").addEventListener('click',(e)=>{
    document.getElementById("staticBackdrop").innerHTML = 
    `<div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Insert a New Timer</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <input type="text">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary">Save</button>
      </div>
    </div>
  </div>`
});


document.getElementById("btn-add-timer").addEventListener('click',(e)=>{
    modalTitle.innerHTML = "Add a New Timer"
    modalFooter.innerHTML=`
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" id="btn-save-task" onclick="addTimer()" data-dismiss="modal">Save</button>
        `;
    modalBody.innerHTML=`
        <div class="input-group mb-3 col-lg-12">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Timer Name:</span>
            </div>
            <input type="text" class="form-control" placeholder="Task" aria-label="taskName" aria-describedby="basic-addon1" id="modal-field-timer">
        </div>
        `;
}); 

function addTimer(){
    let taskName = document.getElementById("modal-field-task").value;
    let tableRow = document.createElement("TR");
    tableRow.innerHTML = `
        <td>${taskName}</td>
        <td><button type="button" class="btn btn-success">Done</button></td>
        <td><button type="button" class="btn btn-danger btn-delete">X</button></td>
        `
    document.getElementById("task-list-body").appendChild(tableRow);
}