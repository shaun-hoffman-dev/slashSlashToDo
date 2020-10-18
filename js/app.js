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

//Globals
let categories = [];
categories = ['Admin', 'Meetings', 'Communications', 'Other']; //Can Change to Accomodate Custom Categories and Build the Array Dynamically

//******************************************************************/
//********************** STORAGE *************************************/
//******************************************************************/
class Storage {
    static getTasks(){
        let tasks;
        if (localStorage.getItem('tasks') === null){
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }

        return tasks;
    }

    static getLogs(){
        let logs;
        if (localStorage.getItem('logs') === null){
            logs = [];
        } else {
            logs = JSON.parse(localStorage.getItem('logs'));
        }

        return logs;
    }

    static saveTasks(){
        let tasks = [];

        for (let i=0; i<document.getElementById('task-list-body').children.length; i++){
            let task = {};
            task.taskItem = document.getElementById('task-list-body').children[i].children[0].innerText;
            task.added = document.getElementById('task-list-body').children[i].children[1].innerText;
            task.due = document.getElementById('task-list-body').children[i].children[2].innerText;
            task.isDone = document.getElementById('task-list-body').children[i].classList.contains('task-dark');

            tasks.push(task);
        }

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    static saveLogs(){
        let logs = [];

        for (let i=0; i<document.getElementById('log-list-body').children.length; i++){
            let log = {};
            log.added = document.getElementById('log-list-body').children[i].children[0].innerText;
            log.time = document.getElementById('log-list-body').children[i].children[1].innerText;
            log.category = document.getElementById('log-list-body').children[i].children[2].innerText;
            log.description = document.getElementById('log-list-body').children[i].children[3].innerText;

            logs.push(log);
        }

        localStorage.setItem('logs', JSON.stringify(logs));
    }
}

//On Page Load Activities
    //Get The Current Year for the Footer Copyright
    function currentYear(){
        let year = new Date().getFullYear();
        document.querySelector('#dynamicYear').innerHTML = year;
    };
    currentYear();

    function loadTasks(){
        let tasks = Storage.getTasks();
        for (let i=0; i<tasks.length; i++){
            addTaskRow(tasks[i].taskItem,tasks[i].added,tasks[i].due,tasks[i].isDone);
        }
    }
    loadTasks();

    function loadLogs(){
        let logs = Storage.getLogs();
        for (let i=0; i<logs.length; i++){
            addLogEntry(logs[i].category, logs[i].time, logs[i].description, logs[i].added)
        }
    }
    loadLogs();

//******************************************************************/
//********************** TASKS *************************************/
//******************************************************************/
document.getElementById("btn-add-task").addEventListener('click',(e)=>{
    modalBody.classList.remove('hidden');
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
    if(event.type==='click'||event.key==='Enter'){
        let taskName = document.getElementById("modal-field-task");
        if (taskName.value!=''){
            let added = returnAddTime();
            let date = new Date().toLocaleDateString('en-US',{ month: 'numeric', day: 'numeric' });
            addTaskRow(taskName.value,added,date,false);
            Storage.saveTasks();
            taskName.value = '';
            taskName.focus();
        }
    }
};

function addTaskRow(task, added, due, isDone){
    let tableRow = document.createElement("TR");
    tableRow.innerHTML = `
        <td>${task}</td>
        <td>${added}</td>
        <td>${due}</td>
        <td><button type="button" class="btn btn-success btn-done">Done</button></td>
        <td><button type="button" class="btn btn-danger btn-delete">X</button></td>
        `
    if (isDone){
        tableRow.classList.add('task-dark');
        tableRow.children[0].classList.add('task-completed');
        tableRow.children[1].classList.add('task-completed');
        tableRow.children[2].classList.add('task-completed');
        tableRow.children[3].children[0].remove();
    }
    if (document.getElementById("task-list-body").children[0]==undefined || isDone){
        document.getElementById("task-list-body").appendChild(tableRow);
    } else {
        document.getElementById("task-list-body").prepend(tableRow);
    }
}

document.querySelector('#task-list-body').addEventListener('click',(e)=>{
    handleTasks(e.target);
});

function handleTasks(element){
    if (element.classList.contains('btn-delete')) {
        element.parentElement.parentElement.remove();
        Storage.saveTasks();
    } else if(element.classList.contains('btn-done')){
        let parent = element.parentElement.parentElement;
        element.parentElement.parentElement.children[0].classList.add('task-completed');
        element.parentElement.parentElement.children[1].classList.add('task-completed');
        element.parentElement.parentElement.children[2].classList.add('task-completed');
        element.parentElement.parentElement.classList.add('task-dark');
        element.parentElement.parentElement.parentElement.appendChild(parent);
        element.parentElement.parentElement.children[3].children[0].remove();
        Storage.saveTasks();
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
    const workLogElement = document.querySelector('#work-log-textarea');
    let newTime;
    const timerUI = ()=>{
        // Borrowed and Modified From Jamie Uttariello: https://medium.com/@olinations/an-accurate-vanilla-js-stopwatch-script-56ceb5c6f45b
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
            let description = workLogElement.value;
            if(document.querySelector('#radio-admin').checked){
                type = 'Admin';
            } else if (document.querySelector('#radio-meetings').checked){
                type = 'Meetings';
            } else if (document.querySelector('#radio-comms').checked) {
                type = 'Communications';
            } else {
                type = 'Other';
            }
            let added = returnAddTime();
            addLogEntry(type,timerElement.innerHTML,description,added);
            Storage.saveLogs();
            workLogElement.value = "";
        }
        timerElement.innerHTML = '00:00:00';
    }
};

//******************************************************************/
//********************** LOGS ************************************/
//******************************************************************/
document.getElementById("btn-add-log").addEventListener('click',(e)=>{
    modalBody.classList.remove('hidden');
    modalTitle.innerHTML = "Add New Work Log(s), Then Click 'Close'"
    modalFooter.innerHTML=`
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="btn-save-work" onclick="addTimeLog()">Log Work</button>
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
                    <label class="form-check-label" for="radio-modal-comms">Communications</label>
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
    const description = document.querySelector('#modal-work-log-textarea').value;
    let hours = document.querySelector('#modal-field-hours').value;
    let minutes = document.querySelector('#modal-field-minutes').value;
    let extraHours = 0;
    let passTest = true;
    let failMessage = [];

    if (document.getElementById('validation-failed')!=null){
        document.getElementById('validation-failed').remove();
    }

    if(document.querySelector('#radio-modal-admin').checked){
        type = 'Admin';
    } else if (document.querySelector('#radio-modal-meetings').checked){
        type = 'Meetings';
    } else if (document.querySelector('#radio-modal-comms').checked) {
        type = 'Communications';
    } else {
        type = 'Other';
    }

    minutes = (minutes === '') ? '00' : minutes;
    hours = (hours === '') ? '00' : hours;

    //Begin Test for Valid Inputs
    if (minutes === '00' && hours === '00'){
        failMessage.push('You must log some amount of time.');
        passTest = false;
    }
    if (isNaN(hours)){
        failMessage.push('Hours must be blank or a whole number.');
        passTest = false;
        hours = '';
    }
    if (isNaN(minutes)){
        failMessage.push('Minutes must be blank or a whole number.');
        passTest = false;
        minutes = '';
    }
    if (passTest==false) {
        let failHtml = '';
        for (let i=0; i<failMessage.length; i++) {
            failHtml = failHtml +
            `<div class="alert alert-danger" role="alert">
                ${failMessage[i]}
            </div>`
        }

        if (failHtml!=''){
            let saveHours = hours;
            let saveMinutes = minutes;
            let saveDescription = description
            modalBody.innerHTML = modalBody.innerHTML + `<div id='validation-failed'>` + failHtml +`</div>`;
            document.querySelector('#modal-field-hours').value = saveHours;
            document.querySelector('#modal-field-minutes').value = saveMinutes;
            document.querySelector('#modal-work-log-textarea').value = saveDescription;
            if(type === 'Admin'){
                document.querySelector('#radio-modal-admin').checked = true;
            } else if (type === 'Meetings'){
                document.querySelector('#radio-modal-meetings').checked=true;
            } else if ( type === 'Communications') {
                document.querySelector('#radio-modal-comms').checked=true;
            } else {
                document.querySelector('#radio-modal-other').checked=true;
            }
        }
        failMessage = [];
    }


    //If We Passed Validation, Log Time
    if (passTest) {
        let added = returnAddTime();
        if (document.getElementById('validation-failed')!=null){
            document.getElementById('validation-failed').remove();
        }

        if (parseInt(minutes) >= 60){
            extraHours = Math.floor(parseInt(minutes)/60);
            minutes = (parseInt(minutes)%60).toString();
        }
        minutes = (minutes.length < 2) ? '0' + minutes.toString() : minutes;

        hours = (parseInt(hours) + parseInt(extraHours)).toString();  
        hours = (hours.length < 2) ? '0' + hours : hours;

        let logTime = `${hours}:${minutes}:00`
        if(document.querySelector('#radio-modal-admin').checked){
            type = 'Admin';
        } else if (document.querySelector('#radio-modal-meetings').checked){
            type = 'Meetings';
        } else if (document.querySelector('#radio-modal-comms').checked) {
            type = 'Communications';
        } else {
            type = 'Other';
        }
        addLogEntry(type,logTime,description,added);
        Storage.saveLogs();
        document.querySelector('#modal-work-log-textarea').value="";
        document.querySelector('#modal-field-hours').value="";
        document.querySelector('#modal-field-minutes').value="";
        document.querySelector('#modal-field-hours').focus();
    }

}

function addLogEntry(type, logTime, description, added){
    let tableRow = document.createElement("TR");
    tableRow.innerHTML = `
        <td>${added}</td>
        <td>${logTime}</td>
        <td>${type}</td>
        <td>${description}</td>
        <td><button type="button" class="btn btn-danger btn-delete">X</button></td>
        `
    document.getElementById("log-list-body").appendChild(tableRow);
}


document.querySelector('#log-list-body').addEventListener('click',(e)=>{
    handleLogs(e.target);
});

function handleLogs(element){
    if (element.classList.contains('btn-delete')) {
        element.parentElement.parentElement.remove();
        Storage.saveLogs();
    }
};

document.getElementById("btn-clear-log").addEventListener('click',(e)=>{
    modalTitle.innerHTML = "Are You Sure You Want to Completely Clear the Work Log?"
    modalFooter.innerHTML=`
        <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
        <button type="button" class="btn btn-primary" id="btn-save-task" data-dismiss="modal" onclick="clearLog()">Yes</button>
        `;
    modalBody.classList.add('hidden');
}); 

function clearLog(){
        for (let i=document.getElementById('log-list-body').children.length; i>0; i--){
            document.getElementById('log-list-body').children[i-1].remove();
            Storage.saveLogs();
        }
};


//******************************************************************/
//********************** REPORTS *************************************/
//******************************************************************/
document.getElementById("btn-view-report").addEventListener('click',(e)=>{
    chartObject = getChartData();
    modalBody.classList.remove('hidden');
    modalTitle.innerHTML = `Work Log Report`
    modalFooter.innerHTML=`
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        `;
    modalBody.innerHTML=`
        <div class="container justify-content-md-center">
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
                                <th>Time (hh:mm:ss)</th>
                            </tr>
                            <tbody id="modal-table-body">
                               ${chartObject.tableHTML} 
                            </tbody>
                        </thead>
                    </table>
            </div>
        </div>
        `;
    loadChart(chartObject);
});

function loadChart(obj){
    let ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'doughnut',

    // The data for our dataset
    data: {
        labels: obj.categories,
        datasets: [{
            //label: 'Work Log',
            backgroundColor: ['red','green','blue','yellow','purple','orange','teal'],
            borderColor: 'white',
            data: obj.data
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
                    label += val + '%';
                    return label;
                }
            }
        }
    }
})
}

function getChartData(){
    let chartObjectData = {};
    let adminTotal = 0;
    let meetingsTotal = 0;
    let commsTotal = 0;
    let otherTotal = 0;

    for (let i=0; i<document.getElementById('log-list-body').children.length; i++){
        let category = document.getElementById('log-list-body').children[i].children[2].innerText;
        let time = document.getElementById('log-list-body').children[i].children[1].innerText;
        let timeArr = time.split(":");
        let total = parseInt(timeArr[2]) + (parseInt(timeArr[1])*60) + (parseInt(timeArr[0])*60*60);

        if (category === 'Admin'){
            adminTotal += total;
        } else if (category === 'Meetings') {
            meetingsTotal += total;
        } else if (category === 'Communications') {
            commsTotal += total;
        } else if (category === 'Other') {
            otherTotal += total;
        }
    }

    let grandTotal = adminTotal+meetingsTotal+commsTotal+otherTotal;
    let adminPercentage = (adminTotal / grandTotal) * 100;
    let meetingsPercentage = (meetingsTotal / grandTotal) * 100;
    let commsPercentage = (commsTotal / grandTotal) * 100;
    let otherPercentage = (otherTotal / grandTotal) * 100;

    let totalsArr = [adminTotal,meetingsTotal,commsTotal,otherTotal];
    let html = '';

    for (let i=0; i<totalsArr.length; i++) {
        let catTotal = totalsArr[i];
        let seconds = catTotal % 60;
        catTotal = Math.floor(catTotal / 60);
        let minutes = catTotal % 60;
        let hours = Math.floor(catTotal / 60);
        seconds = (seconds.toString().length < 2) ? '0' + seconds.toString() : seconds;
        minutes = (minutes.toString().length < 2) ? '0' + minutes.toString() : minutes;
        hours = (hours.toString().length < 2) ? '0' + hours.toString() : hours;
        let catTime = `${hours}:${minutes}:${seconds}`;
        html += `
        <tr>
            <td>${categories[i]}</td>
            <td>${catTime}</td>
         </tr>`
    }

    chartObjectData.categories = categories;
    chartObjectData.data = [adminPercentage,meetingsPercentage,commsPercentage,otherPercentage];
    chartObjectData.tableHTML = html;

    return chartObjectData;   
}

//******************************************************************/
//********************** HELPERS *************************************/
//******************************************************************/
function returnAddTime(){
    let date = new Date().toLocaleDateString('en-US',{ month: 'numeric', day: 'numeric' });
    let time = new Date().toLocaleTimeString('en-US',{ hour: 'numeric', minute: 'numeric', hour12: true });
    let added = `${date} ${time}`;
    return added;
}