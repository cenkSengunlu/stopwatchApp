const format = (num) => String(num).padStart(2, '0');
let intervalID = null;
let count = 0;
let tCount = 0;
let pTime = 0;
let writeTime = null;

let countArr = [];


let splitCount = 0;
let splitArr = [];

let milliseconds;
let seconds;
let minutes;
let hours;


function start(){
    document.querySelector("#splitButton").disabled = true;
    document.querySelector("#resetButton").disabled = true;
};

start();

function msToTime(duration) {
    milliseconds = parseInt((duration % 1000) / 100);
    seconds = format(Math.floor((duration / 1000) % 60));
    minutes = format(Math.floor((duration / (1000 * 60)) % 60));
    hours = format(Math.floor((duration / (1000 * 60 * 60)) % 24));
    writeTime = `${hours}:${minutes}:${seconds}.${milliseconds}`
    return writeTime;
};

function countToTime(duration) {
    let cMilliseconds = parseInt((duration % 1000) / 100);
    let cSeconds = format(Math.floor((duration / 1000) % 60));
    let cMinutes = format(Math.floor((duration / (1000 * 60)) % 60));
    let cHours = format(Math.floor((duration / (1000 * 60 * 60)) % 24));
    let cWriteTime = `${cHours}:${cMinutes}:${cSeconds}.${cMilliseconds}`
    return cWriteTime;
};



function logic(){
    
    let time = new Date();

    count = time.getTime() - tCount.getTime();
    intervalID = setInterval(function () {
        time = new Date();
        count = time.getTime() - tCount.getTime();
        msToTime(count);
        document.querySelector('#time').innerHTML = writeTime;
    },1);
}

document.querySelector("#startButton").addEventListener("click", clickStartBtn);
function clickStartBtn() {
    document.querySelector("#splitButton").disabled = false;
    document.querySelector('#startButton').classList.add('hidden');
    document.querySelector('#pauseButton').classList.remove('hidden');
    const cTime = new Date();
    tCount = cTime;
    logic();

};

document.querySelector("#pauseButton").addEventListener("click", clickPauseBtn);
function clickPauseBtn() {
    
    document.querySelector("#resetButton").disabled = false;
    document.querySelector('#pauseButton').classList.add('hidden');
    document.querySelector('#continueButton').classList.remove('hidden');

    clearInterval(intervalID);
};

document.querySelector("#continueButton").addEventListener("click", clickContinueBtn);
function clickContinueBtn() {
    document.querySelector("#resetButton").disabled = true;
    document.querySelector("#splitButton").disabled = false;
    document.querySelector('#pauseButton').classList.remove('hidden');
    document.querySelector('#continueButton').classList.add('hidden');
    let conTime = new Date();
    tCount = new Date(conTime - count);

    logic();
};

document.querySelector("#splitButton").addEventListener("click", clickSplitBtn);
function clickSplitBtn() {
    let splitObject = {
        objectCount:"",
        splitTime:"",
        currentTime:"",
        countSplit:""
    };

    
    countArr.push(count);

    let keys = Object.keys(splitObject);

    splitCount++;
    splitObject.objectCount = "#" + splitCount;
    splitObject.countSplit = count;

    if(splitArr.length >= 1){
        
        splitObject.splitTime = countToTime((count) - (splitArr[splitArr.length - 1].countSplit));
    }
    else{
        splitObject.splitTime = countToTime(count);
    }
    

    splitObject.currentTime = writeTime;
    
    splitArr.push(splitObject);
    

    for(let i = 0; i < keys.length - 1; i++){
        let container = document.querySelector("#grid");
        let cell = document.createElement("div");
        cell.classList.add("splitBox", "text-blue-500", "xl:text-4xl", "md:text-3xl","sm:text-2xl", "text-sm", "flex", "justify-center", "items-center", "mb-2", "sm:mx-6", "lg-mx-8", "xl:mx-10", "mx-4");
        cell.innerHTML = splitArr[splitArr.length - 1][keys[i]];
        container.appendChild(cell);
    };
        
};

function clearGrid(){
    let eDiv = document.querySelector(".splitBox");
    eDiv.parentNode.removeChild(eDiv);
};

document.querySelector("#resetButton").addEventListener("click", clickResetBtn);
function clickResetBtn() {

    document.querySelector('#time').innerHTML = "00:00:00.0";
    for(let i = 0; i < splitArr.length * 3; i++){
        clearGrid();
    }
    start();
    document.querySelector('#startButton').classList.remove('hidden');
    document.querySelector('#continueButton').classList.add('hidden');
    document.querySelector('#pauseButton').classList.add('hidden');

    clearInterval(intervalID);
    count = 0;
    tCount = 0;
    pTime = 0;
    writeTime = null;

    countArr = [];


    splitCount = 0;
    splitArr = [];

    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    
};