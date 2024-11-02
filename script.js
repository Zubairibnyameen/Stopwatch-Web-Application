let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 1;

const display = document.getElementById('display');
const lapList = document.getElementById('lapList');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');

// Function to start the stopwatch
startBtn.addEventListener('click', function() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0); // Adjust for paused time
        tInterval = setInterval(updateTime, 10);
        running = true;
    }
});

// Function to pause the stopwatch
pauseBtn.addEventListener('click', function() {
    clearInterval(tInterval);
    running = false;
});

// Function to reset the stopwatch
resetBtn.addEventListener('click', function() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    lapCounter = 1;
    display.innerHTML = "00:00:00";
    lapList.innerHTML = ""; // Clear lap times
});

// Function to record lap time
lapBtn.addEventListener('click', function() {
    if (running) {
        const lapTime = formatTime(difference);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter++}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
});

// Function to update the displayed time
function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    display.innerHTML = formatTime(difference);
}

// Function to format time as HH:MM:SS
function formatTime(ms) {
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const seconds = Math.floor((ms / 1000) % 60);

    // Pad single digits with leading zeros
    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}