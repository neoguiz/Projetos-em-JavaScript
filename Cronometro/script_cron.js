
var millisec_display = document.getElementById('milliseconds')
var seconds_display = document.getElementById('seconds')

var start_b = document.getElementById('start');
start_b.addEventListener('click',start)
var stop_b = document.getElementById('stop');
stop_b.onclick = function() {stop()}
var reset_b = document.getElementById('reset');
reset_b.onclick = function() {reset()}


var timer_interval
var millisec = 0
var seconds = 0


function start() {
    timer_interval = setInterval(start_timer,10)
}

function stop() {
    clearInterval(timer_interval)
}

function reset() {
    millisec = 0
    seconds = 0
    millisec_display.innerHTML = ('0'+millisec)
    seconds_display.innerHTML = ('0'+seconds)
}

function start_timer(){
    millisec++;

    if (millisec<=9) {
        millisec_display.innerHTML = ('0'+millisec)
    }
    if (millisec>9){
        millisec_display.innerHTML = (millisec)
    }
    if (millisec>99) {
        seconds++;
        seconds_display.innerHTML = ('0'+seconds)
        millisec = 0
    }
    if (seconds>9) {
        seconds_display.innerHTML = (seconds)
    }

    // time_display.innerHTML = (milisec)
}