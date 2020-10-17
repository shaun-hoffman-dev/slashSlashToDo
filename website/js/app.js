//Modal Vars
let modalTitle = document.getElementById("modal-title");
let modalBody = document.getElementById("modal-body");
let modalFooter = document.getElementById("modal-footer");

//Element Variables
const timerIconHTML = `<svg width=".9em" height=".9em" viewBox="0 0 16 16" class="bi bi-alarm-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.035 8.035 0 0 0 .86 5.387zM11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.035 8.035 0 0 0-3.527-3.527zM8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z"/>
                        </svg>`;
let startTime;
let savedTime;
let runTimer;
let timeDifference;

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
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Done</button>
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
    console.log(event);
    if(event.type==='click'||event.key==='Enter'){
        let taskName = document.getElementById("modal-field-task");
        if (taskName.value!=''){
            let date = new Date().toLocaleDateString('en-US',{ month: 'numeric', day: 'numeric' });
            let time = new Date().toLocaleTimeString('en-US',{ hour: 'numeric', minute: 'numeric', hour12: true });
            let tableRow = document.createElement("TR");
            tableRow.innerHTML = `
                <td>${taskName.value}</td>
                <td>${date} ${time}</td>
                <td>${date}</td>
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
        element.parentElement.parentElement.children[1].classList.add('task-completed');
        element.parentElement.parentElement.children[2].classList.add('task-completed');
        element.parentElement.parentElement.classList.add('task-dark');
        element.parentElement.parentElement.children[3].children[0].remove();
    }
};

function focusTask(){
    console.log('loaded');
    document.getElementById("modal-field-task").focus();
}


//******************************************************************/
//********************** TIMERS ************************************/
//******************************************************************/
function handleTimer(event,action){
    const element = event.target;
    const timerElement = element.parentElement.parentElement.children[1];
    let newTime;
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
        document.querySelector('title').innerHTML = `${hours}:${minutes}:${seconds} Slash-Slash-ToDo`;
      };
    if(action==='start'){
        if (element.parentElement.parentElement.classList.contains('timer-idle')){
        element.parentElement.parentElement.classList.remove('timer-idle');
        element.parentElement.parentElement.classList.add('timer-running');
        element.classList.remove('btn-success');
        element.classList.add('btn-secondary');
        element.parentElement.children[1].classList.remove('btn-secondary');
        element.parentElement.children[1].classList.add('btn-danger');
        startTime = new Date().getTime();
        runTimer = setInterval(timerUI, 100);
        }
    } else if(action==='stop'){
        clearInterval(runTimer);
        document.querySelector('title').innerHTML = `Slash-Slash-ToDo`;
        savedTime=timeDifference;
        element.parentElement.parentElement.classList.add('timer-idle');
        element.parentElement.parentElement.classList.remove('timer-running');
        element.classList.add('btn-secondary');
        element.classList.remove('btn-danger');
        element.parentElement.children[0].classList.add('btn-success');
        element.parentElement.children[0].classList.remove('btn-secondary');
    } else if(action==='reset'||action==='log'){
        element.parentElement.parentElement.classList.add('timer-idle');
        element.parentElement.parentElement.classList.remove('timer-running');
        element.parentElement.children[1].classList.add('btn-secondary');
        element.parentElement.children[1].classList.remove('btn-danger');
        element.parentElement.children[0].classList.add('btn-success');
        element.parentElement.children[0].classList.remove('btn-secondary');
        document.querySelector('title').innerHTML = `Slash-Slash-ToDo`;
        clearInterval(runTimer);
        savedTime=0;
        if(action==='log'&&timerElement.innerHTML != '00:00:00'){
            let type;
            let description = document.querySelector('#work-log-textarea').value;
            if(document.querySelector('#radio-admin').checked){
                type = 'Admin';
            } else if (document.querySelector('#radio-meetings').checked){
                type = 'Meetings';
            } else if (document.querySelector('#radio-comms').checked) {
                type = 'Comms';
            } else {
                type = 'Other';
            }
            addLogEntry(type,timerElement.innerHTML,description);
        }
        timerElement.innerHTML = '00:00:00';
    }
};

//******************************************************************/
//********************** LOGS ************************************/
//******************************************************************/
document.getElementById("btn-add-log").addEventListener('click',(e)=>{
    modalTitle.innerHTML = "Add New Work Log(s), Then Click 'Close'"
    modalFooter.innerHTML=`
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="btn-save-task" onclick="addTimeLog()">Log Work</button>
        `;
    modalBody.innerHTML=`
        <div class="input-group mb-3 col-lg-12">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Hours:</span>
            </div>
            <input type="text" class="form-control col-1" placeholder="00" aria-label="timeLogged" aria-describedby="basic-addon1" id="modal-field-hours">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Minutes:</span>
            </div>
            <input type="text" class="form-control col-1" placeholder="00" aria-label="timeLogged" aria-describedby="basic-addon1" id="modal-field-minutes">
            <div class="modal-input-div">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="task-options" id="radio-modal-admin" value="Admin">
                    <label class="form-check-label" for="radio-modal-admin">Admin</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="task-options" id="radio-modal-comms" value="Comms">
                    <label class="form-check-label" for="radio-modal-comms">Comms</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="task-options" id="radio-modal-meetings" value="Meetings" >
                    <label class="form-check-label" for="radio-modal-meetings">Meetings</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="task-options" id="radio-modal-other" value="Other" >
                    <label class="form-check-label" for="radio-modal-other">Other</label>
                </div>
            </div>
        </div>
        <div class="input-group mb-3 col-lg-12">
            <div class="input-group-prepend">
                <span class="input-group-text">Log:</span>
            </div>
            <textarea class="form-control" aria-label="Log" id="modal-work-log-textarea"></textarea>
        </div>
        `;
}); 

function addTimeLog(){
    let type;
    let description = document.querySelector('#modal-work-log-textarea').value;
    let hours = document.querySelector('#modal-field-hours').value;
    let minutes = document.querySelector('#modal-field-minutes').value;
    minutes = (minutes === '') ? '00' : minutes;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    hours = (hours === '') ? '00' : hours;
    hours = (hours < 10) ? '0' + hours : hours;
    let time = `${hours}:${minutes}:00`
    if(document.querySelector('#radio-modal-admin').checked){
        type = 'Admin';
    } else if (document.querySelector('#radio-modal-meetings').checked){
        type = 'Meetings';
    } else if (document.querySelector('#radio-modal-comms').checked) {
        type = 'Comms';
    } else {
        type = 'Other';
    }
    addLogEntry(type,time,description);
}


function addLogEntry(type, logTime, description){
    let date = new Date().toLocaleDateString('en-US',{ month: 'numeric', day: 'numeric' });
    let time = new Date().toLocaleTimeString('en-US',{ hour: 'numeric', minute: 'numeric', hour12: true });
    let tableRow = document.createElement("TR");
    tableRow.innerHTML = `
        <td>${date} ${time}</td>
        <td>${logTime}</td>
        <td>${type}</td>
        <td>${description}</td>
        <td><button type="button" class="btn btn-danger btn-delete">X</button></td>
        `
    document.getElementById("log-list-body").appendChild(tableRow);
}


//******************************************************************/
//********************** REPORTS *************************************/
//******************************************************************/
document.getElementById("btn-view-report").addEventListener('click',(e)=>{
    modalTitle.innerHTML = `Work Log Report`
    modalFooter.innerHTML=`
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        `;
    modalBody.innerHTML=`
        <div class="col-10">
            <canvas id="myChart"></canvas>
        </div>
        <div>
            <table class="table table-hover">
                    <colgroup>
                        <col span="1" style="width: 60%;">
                        <col span="1" style="width: 40%;">
                        </colgroup>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Time</th>
                        </tr>
                        <tbody id="modal-table-body">
                            <!-- Tasks Here -->
                        <tr>
                            <td>Admin</td>
                            <td>01:05:00</td>
                        </tr>
                        <tr>
                            <td>Meetings</td>
                            <td>03:07:00</td>
                        </tr>
                        <tr>
                            <td>Comms</td>
                            <td>00:35:00</td>
                        </tr>
                        <tr>
                            <td>Other</td>
                            <td>01:40:00</td>
                        </tr>
                        </tbody>
                    </thead>
                </table>
        </div>
        `;
    loadChart();
});

function loadChart(){
    let ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'doughnut',

    // The data for our dataset
    data: {
        labels: ['Admin', 'Meetings', 'Comms', 'Other'],
        datasets: [{
            label: 'Work Log',
            backgroundColor: ['red','green','blue','yellow'],
            borderColor: 'rgb(255, 255, 255)',
            data: [65, 187, 35, 100]
        }]
    },

    // Configuration options go here
    options: {
        cutoutPercentage: 40,
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    let label = data.datasets[tooltipItem.datasetIndex].label || '';
                    const val = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];

                    if (label) {
                        label += ': ';
                    }
                    label += val + ' minutes';
                    return label;
                }
            }
        }
    }
});
}