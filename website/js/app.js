//Modal Vars
let modalTitle = document.getElementById("modal-title");
let modalBody = document.getElementById("modal-body");
let modalFooter = document.getElementById("modal-footer");

//Element Variables
const timerIconHTML = `<svg width=".9em" height=".9em" viewBox="0 0 16 16" class="bi bi-alarm-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.035 8.035 0 0 0 .86 5.387zM11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.035 8.035 0 0 0-3.527-3.527zM8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z"/>
                        </svg>`;

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
    modalTitle.innerHTML = `Add New Tasks By Clicking 'Save' or Using the 'Enter' Key, Then Click 'Cancel' When Done.`
    modalFooter.innerHTML=`
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" id="btn-save-task" onclick="addTask(event)">Save</button>
        `;
    modalBody.innerHTML=`
        <div class="input-group mb-3 col-lg-12">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Task Name:</span>
            </div>
            <input type="text" class="form-control" placeholder="Task" aria-label="taskName" aria-describedby="basic-addon1" id="modal-field-task" onkeypress="addTask(event)">
        </div>
        `;
}); 

function addTask(event){
    if(event.type==='click'||event.key==='Enter'){
        let taskName = document.getElementById("modal-field-task");
        if (taskName.value!=''){
            let tableRow = document.createElement("TR");
            tableRow.innerHTML = `
                <td>${taskName.value}</td>
                <td>00:00:00</td>
                <td class='row'><button type="button" class="btn btn-success">Start</button>
                <button type="button" class="btn btn-secondary">Stop</button>
                <button type="button" class="btn btn-warning">Reset</Reset></td>
                <td><button type="button" class="btn btn-primary btn-done">Done</button></td>
                <td><button type="button" class="btn btn-danger btn-delete">X</button></td>
                `
            document.getElementById("task-list-body").appendChild(tableRow);
            taskName.value = '';
            taskName.focus();
        }
    }
};

document.querySelector('#task-list-body').addEventListener('click',(e)=>{
    handleTasks(e.target);
});

function handleTasks(element){
    if (element.classList.contains('btn-delete')) {
        element.parentElement.parentElement.remove();
    } else if(element.classList.contains('btn-done')){
        element.parentElement.parentElement.children[0].classList.add('task-completed');
        element.parentElement.parentElement.classList.add('task-dark');
        element.parentElement.parentElement.children[2].children[2].remove();
        element.parentElement.parentElement.children[2].children[1].remove();
        element.parentElement.parentElement.children[2].children[0].remove();
        element.parentElement.parentElement.children[3].children[0].remove();
    }
};



//******************************************************************/
//********************** TIMERS ************************************/
//******************************************************************/
document.getElementById("btn-add-timer").addEventListener('click',(e)=>{
    modalTitle.innerHTML = "Add a New Timer"
    modalFooter.innerHTML=`
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" id="btn-save-task" onclick="addTimer()" data-dismiss="modal">Add Timer</button>
        `;
    modalBody.innerHTML=`
        <div class="input-group mb-3 col-lg-12">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Timer Name Name:</span>
            </div>
            <input type="text" class="form-control" placeholder="Timer Name" aria-label="timerName" aria-describedby="basic-addon1" id="modal-field-timer">
        </div>
        `;
}); 

function addTimer(){
    let timerName = document.getElementById("modal-field-timer").value;
    let timer = document.createElement("DIV");
    timer.classList.add('col-6');
    timer.innerHTML = `
        <div class="card rounded=50 timer-card">
            <div class="trash-timer">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                </svg>
            </div>
            <div class="align-items-center">
                <h4 class="timer-title">
                    <svg width=".9em" height=".9em" viewBox="0 0 16 16" class="bi bi-alarm-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.035 8.035 0 0 0 .86 5.387zM11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.035 8.035 0 0 0-3.527-3.527zM8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z"/>
                    </svg>
                    ${timerName}
                </h4>
            </div>
            <div class="row align-items-center timer-idle">
                <div class="col-8 timer-clock">00:00:00</div>
                <div class="col-4">
                    <button type="button" class="btn btn-success btn-start" onclick="handleTimer(event,'start')">Start</button>
                    <button type="button" class="btn btn-secondary btn-stop" onclick="handleTimer(event,'stop')">Stop</button>
                    <button type="button" class="btn btn-warning btn-reset" onclick="handleTimer(event,'reset')">Reset</button>
                </div>
            </div>
        </div>
            `
    document.getElementById("timer-list").appendChild(timer);
}

document.querySelector('#timer-list').addEventListener('click',(e)=>{
    deleteTimer(e.target);
});

function deleteTimer(element){
    // We may be clicking the trash icon or its svg container.  Both handled below.
    if (element.parentElement.classList.contains('bi-trash-fill')) {
        element.parentElement.parentElement.parentElement.remove();
    } else if(element.classList.contains('bi-trash-fill')){
        element.parentElement.parentElement.remove();
    }
};


function handleTimer(event,action){
    const element = event.target;
    const timerElement = element.parentElement.parentElement.children[0];
    const startTime = new Date().getTime();
    let newTime;
    let timeDifference;
    let savedTime;
    const timerUI = ()=>{
        newTime = new Date().getTime();
        if (savedTime){
          timeDifference = (newTime - startTime) + savedTime;
        } else {
          timeDifference =  newTime - startTime;
        }
 
        let hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        timerElement.innerHTML = hours + ':' + minutes + ':' + seconds;
      };
    if(action==='start'){
        if (element.parentElement.parentElement.classList.contains('timer-idle')){
        element.parentElement.parentElement.classList.remove('timer-idle');
        element.parentElement.parentElement.classList.add('timer-running');
        element.classList.remove('btn-success');
        element.classList.add('btn-secondary');
        element.parentElement.children[1].classList.remove('btn-secondary');
        element.parentElement.children[1].classList.add('btn-danger');
        const runTimer = setInterval(timerUI, 100);
        console.log(runTimer);
        }
    } else if(action==='stop'){
        console.log(action);
        console.log(runTimer);
        element.parentElement.parentElement.classList.add('timer-idle');
        element.parentElement.parentElement.classList.remove('timer-running');
        element.classList.add('btn-secondary');
        element.classList.remove('btn-danger');
        element.parentElement.children[0].classList.add('btn-success');
        element.parentElement.children[0].classList.remove('btn-secondary');
    } else if(action==='reset'){
        element.parentElement.parentElement.classList.add('timer-idle');
        element.parentElement.parentElement.classList.remove('timer-running');
        element.parentElement.children[1].classList.add('btn-secondary');
        element.parentElement.children[1].classList.remove('btn-danger');
        element.parentElement.children[0].classList.add('btn-success');
        element.parentElement.children[0].classList.remove('btn-secondary');
        clearInterval(runTimer);
        timerElement.innerHTML = '00:00:00';
    }
};