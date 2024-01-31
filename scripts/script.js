//Buttons and Slider
// Get buttons and slider elements
let randomizearray = document.getElementById("randomizearray_button");
let sort_button = document.getElementById("sort_button");
let select_algo = document.getElementById("algo");

//timer
// Initialize variables for timer
let timerId;
let startTime, endTime;

// Function to start the timer and update display
function startTimer() {
  startTime = performance.now(); // Start time in milliseconds
  // Check if timerId is already set to avoid creating multiple instances
  if (!timerId) {
    updateTimer(); // Start updating timer display
  }
}

// Function to stop the timer display update
function stopTimer() {
  cancelAnimationFrame(timerId); // Stop updating timer display
  endTime = performance.now(); // End time in milliseconds
  const elapsedTimeInSeconds = ((endTime - startTime) / 1000).toFixed(2); // Calculate elapsed time in seconds
  document.getElementById(
    "sortname"
  ).innerHTML = `Sorting Time: ${elapsedTimeInSeconds} seconds`; // Display final sorting time
}

// Function to update the timer display continuously
function updateTimer() {
  const currentTime = performance.now();
  const elapsedTimeInSeconds = ((currentTime - startTime) / 1000).toFixed(2); // Calculate elapsed time in seconds
  document.getElementById(
    "sortname"
  ).innerHTML = `Sorting Time: ${elapsedTimeInSeconds} seconds`; // Update timer display
  timerId = requestAnimationFrame(updateTimer); // Request next animation frame
}

//Variables
// Get bars container and slider elements
let bars_container = document.getElementById("bars_container");
let slider = document.getElementById("slider");
let minRange = 1;
let maxRange = 240;
let numOfBars = slider.value;
let heightFactor = 1.5;
let unsorted_array = new Array(numOfBars);

//Helper to generate random no.
// Function to generate random number within given range
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//To create an array of random numbers
// Function to create an array of random numbers
function createRandomArray() {
  let array = new Array(numOfBars);
  for (let i = 0; i < numOfBars; i++) {
    array[i] = randomNum(minRange, maxRange);
  }
  return array;
}

//To create array and render bars upon landing
// Render bars on page load
document.addEventListener("DOMContentLoaded", function () {
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

//Creation of each bar
// Function to render bars based on array values
function renderBars(array) {
  for (var i = 0; i < array.length; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = array[i] * heightFactor + "px";
    bars_container.appendChild(bar);
  }
}

///Generating random array inputs
// Event listener for randomize array button click
randomizearray.addEventListener("click", function () {
  unsorted_array = createRandomArray();
  bars_container.innerHTML = "";
  renderBars(unsorted_array);
});

//Input of number of bars
// Event listener for slider input change
slider.addEventListener("input", function () {
  numOfBars = slider.value;
  bars_container.innerHTML = "";
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
  output.innerHTML = this.value;
});

//sleep helper for await inorder to create delay in visualization
// Function to create delay for visualization
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//Algo dropdown
// Variable to store selected algorithm
let algotouse = "";

// Event listener for algorithm selection
select_algo.addEventListener("change", function () {
  algotouse = select_algo.value;
});

//Shell sort visualizer
// Function to visualize Shell sort algorithm
async function shellSort(arr) {
  // console.log(arr);
  let bars = document.getElementsByClassName("bar");
  let n = arr.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i += 1) {
      let temp = arr[i];
      let j;
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
        bars[j].style.backgroundColor = "orange";
        bars[j - gap].style.backgroundColor = "white";
        await sleep(30);
        bars[j].style.height = arr[j] * heightFactor + "px";
      }
      arr[j] = temp;
      bars[j].style.height = arr[j] * heightFactor + "px";
      bars[j].style.backgroundColor = "orange";
      await sleep(30);
    }
  }
  // console.log(arr);
  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "#A2F314";
  }
  toastProduce("Sorted");
  return arr;
}

//Selection sort visualizer
// Function to visualize Selection sort algorithm
async function selectionSort(arr) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < arr.length; i++) {
    bars[i].style.height = arr[i] * heightFactor + "px";

    let lowest = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[lowest]) {
        lowest = j;
        bars[j].style.height = arr[j] * heightFactor + "px";
      }
    }
    if (lowest !== i) {
      [arr[i], arr[lowest]] = [arr[lowest], arr[i]];
      bars[i].style.height = arr[i] * heightFactor + "px";
      bars[i].style.backgroundColor = "violet";
      bars[lowest].style.backgroundColor = "white";
      await sleep(30);
    }
    await sleep(30);
  }
  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "#A2F314";
  }
  toastProduce("Sorted");
  return arr;
}

//Bubble sort visualizer
// Function to visualize Bubble sort algorithm
async function bubbleSort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        for (let k = 0; k < bars.length; k++) {
          if (k !== j && k !== j + 1) {
            bars[k].style.backgroundColor = "aqua";
          }
        }
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        bars[j].style.height = array[j] * heightFactor + "px";
        bars[j].style.backgroundColor = "white";

        bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
        bars[j + 1].style.backgroundColor = "white";
        await sleep(30);
      }
    }
    await sleep(30);
  }
  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "#A2F314";
  }
  toastProduce("Sorted");
  return array;
}

//Insertion sort visualizer
// Function to visualize Insertion sort algorithm
async function InsertionSort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
      bars[j + 1].style.backgroundColor = "white";
      await sleep(30);

      for (let k = 0; k < bars.length; k++) {
        if (k != j + 1) {
          bars[k].style.backgroundColor = "yellow";
        }
      }
      j = j - 1;
    }
    array[j + 1] = key;
    bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
    bars[j + 1].style.backgroundColor = "yellow";
    await sleep(30);
  }

  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "#A2F314";
  }
  toastProduce("Sorted");
  return array;
}

//Merge sort visualizer
// Function to visualize Merge sort algorithm
async function merge(arr, l, m, r) {
  let bars = document.getElementsByClassName("bar");
  var i, j, k;
  var n1 = m - l + 1;
  var n2 = r - m;
  var L = Array(n1).fill(0);
  var R = Array(n2).fill(0);

  for (i = 0; i < n1; i++) L[i] = arr[l + i];
  for (j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

  i = 0;
  j = 0;
  k = l;
  while (i < n1 && j < n2) {
    bars[i].style.height = arr[i] * heightFactor + "px";
    bars[i].style.backgroundColor = "red";
    await sleep(30);
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      bars[k].style.height = arr[k] * heightFactor + "px";
      bars[k].style.backgroundColor = "red";
      i++;
    } else {
      arr[k] = R[j];
      bars[k].style.height = arr[k] * heightFactor + "px";
      bars[k].style.backgroundColor = "red";
      j++;
    }
    k++;
  }

  while (i < n1) {
    arr[k] = L[i];
    bars[k].style.height = arr[k] * heightFactor + "px";
    bars[k].style.backgroundColor = "red";
    i++;
    k++;
  }

  while (j < n2) {
    arr[k] = R[j];
    bars[k].style.height = arr[k] * heightFactor + "px";
    bars[k].style.backgroundColor = "red";
    j++;
    k++;
  }
}

// Function to visualize Merge sort algorithm
async function mergeSort(arr) {
  let bars = document.getElementsByClassName("bar");
  n = arr.length;
  for (let curr_size = 1; curr_size <= n - 1; curr_size = 2 * curr_size) {
    for (let left_start = 0; left_start < n - 1; left_start += 2 * curr_size) {
      let mid = Math.min(left_start + curr_size - 1, n - 1);
      let right_end = Math.min(left_start + 2 * curr_size - 1, n - 1);
      await merge(arr, left_start, mid, right_end);
    }
  }
  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "#A2F314";
  }
  toastProduce("Sorted");
}

//Listeners for every button
// Event listener for sort button click
sort_button.addEventListener("click", async function () {
  startTimer(); // Start the timer when sorting begins
  switch (algotouse) {
    case "shell":
      await shellSort(unsorted_array);
      break;
    case "bubble":
      await bubbleSort(unsorted_array);
      break;
    case "insertion":
      await InsertionSort(unsorted_array);
      break;
    case "selection":
      await selectionSort(unsorted_array);
      break;
    case "merge":
      await mergeSort(unsorted_array);
      break;
    default:
      await bubbleSort(unsorted_array);
      break;
  }
  stopTimer(); // Stop the timer when sorting is completed
});

//Toastify for toast messages
// Function to produce toast messages
function toastProduce(msg) {
  Toastify({
    text: msg,
    duration: 3000,
    gravity: "bottom", // Set gravity to bottom
    position: "center",
    stopOnFocus: true,
    style: {
      background: "rgba(239, 239, 255, 0.19)",
      color: "#fff",
    },
    onClick: function () {},
  }).showToast();
}
