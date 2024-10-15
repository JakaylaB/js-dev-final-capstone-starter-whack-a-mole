const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
const scoreDisplay = document.querySelector('#score');
const timerDisplay = document.querySelector('#timer');



let timeLeft = 10;
let timerId;
let lastHole = 0;
let score = 0;
let difficulty = "normal";









/**
 * Generates a random integer within a range.
 *
 * The function takes two values as parameters that limits the range 
 * of the number to be generated. For example, calling randomInteger(0,10)
 * will return a random integer between 0 and 10. Calling randomInteger(10,200)
 * will return a random integer between 10 and 200.
 *
 */




function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * Sets the time delay given a difficulty parameter.
 *
 * The function takes a `difficulty` parameter that can have three values: `easy`
 * `normal` or `hard`. If difficulty is "easy" then the function returns a time delay
 * of 1500 milliseconds (or 1.5 seconds). If the difficulty is set to "normal" it should
 * return 1000. If difficulty is set to "hard" it should return a randomInteger between
 * 600 and 1200.
 *
 * Example: 
 * setDelay("easy") //> returns 1500
 * setDelay("normal") //> returns 1000
 * setDelay("hard") //> returns 856 (returns a random number between 600 and 1200).
 *
 */
function setDelay(difficulty) {
  switch (difficulty) {
      case 'easy':
          return 1500;
      case 'normal':
          return 1000;
      case 'hard':
          return randomInteger(600, 1200);
      default:
          return 1000;
  }
}


/**
 * Chooses a random hole from a list of holes.
 *
 * This function should select a random Hole from the list of holes.
 * 1. generate a random integer from 0 to 8 and assign it to an index variable
 * 2. get a random hole with the random index (e.g. const hole = holes[index])
 * 3. if hole === lastHole then call chooseHole(holes) again.
 * 4. if hole is not the same as the lastHole then keep track of 
 * it (lastHole = hole) and return the hole
 *
 * Example: 
 * const holes = document.querySelectorAll('.hole');
 * chooseHole(holes) //> returns one of the 9 holes that you defined
 */

  // TODO: Write your code here.
  

  function chooseHole() {
    const randomIndex = Math.floor(Math.random() * holes.length);
    const hole = holes[randomIndex];
    if (hole === lastHole) {
        return chooseHole(); 
    }
    lastHole = hole; // Update lastHole
    return hole; // Return the selected hole
}

/**
*
* Calls the showUp function if time > 0 and stops the game if time = 0.
*
* The purpose of this function is simply to determine if the game should
* continue or stop. The game continues if there is still time `if(time > 0)`.
* If there is still time then `showUp()` needs to be called again so that
* it sets a different delay and a different hole. If there is no more time
* then it should call the `stopGame()` function. The function also needs to
* return the timeoutId if the game continues or the string "game stopped"
* if the game is over.
*
*  // if time > 0:
*  //   timeoutId = showUp()
*  //   return timeoutId
*  // else
*  //   gameStopped = stopGame()
*  //   return gameStopped
*
*/

 
// TODO: Write your code here
  


function checkGameStatus() {
  if (timeLeft > 0) {
    showUp(); // Call to show another mole
    return true; 
  } else {
    gameOver(); // Call gameOver when time runs out
    return false;
  }
}



/**
*
* Calls the showAndHide() function with a specific delay and a hole.
*
* This function simply calls the `showAndHide` function with a specific
* delay and hole. The function needs to call `setDelay()` and `chooseHole()`
* to call `showAndHide(hole, delay)`.
*
*/

/**
*
* The purpose of this function is to show and hide the mole given
* a delay time and the hole where the mole is hidden. The function calls
* `toggleVisibility` to show or hide the mole. The function should return
* the timeoutID
*
*/
function showAndHide(hole, delay) {
  toggleVisibility(hole);
  const timeoutID = setTimeout(() => {
    toggleVisibility(hole);
    if (timeLeft > 0) {
      showUp(); 
    }
  }, delay);
  return timeoutID;
}
 

  
  /**
*
* Adds or removes the 'show' class that is defined in styles.css to 
* a given hole. It returns the hole.
*
*/

  // TODO: add hole.classList.toggle so that it adds or removes the 'show' class.


  
  function showUp() {
    const delay = setDelay(difficulty); // Get the delay based on difficulty
    const hole = chooseHole(); // Choose a random hole
    toggleVisibility(hole); // Show the mole

    setTimeout(() => {
        toggleVisibility(hole); // Hide the mole after the delay
        checkGameStatus(); // Check game status after hiding
    }, delay);
}






function toggleVisibility(hole) {
  hole.classList.toggle('show');
}



/**
*
* This function increments the points global variable and updates the scoreboard.
* Use the `points` global variable that is already defined and increment it by 1.
* After the `points` variable is incremented proceed by updating the scoreboard
* that you defined in the `index.html` file. To update the scoreboard you can use 
* `score.textContent = points;`. Use the comments in the function as a guide 
* for your implementation:
*
*/

  // TODO: Write your code here

  let points = 0; // Defines the points at the top

  function updateScore() {
    points++; // Increments the score
    scoreDisplay.textContent = points; // New score will be updated on the display
}

/**
*
* This function clears the score by setting `points = 0`. It also updates
* the board using `score.textContent = points`. The function should return
* the points.
*
*/

  // TODO: Write your code here

function clearScore() {
  points = 0;
  scoreDisplay.textContent = points;
}

/**
*
* Updates the control board with the timer if time > 0
*
*/

  // TODO: Write your code here.

  
   


function updateTimer() {
  if (timeLeft > 0) {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
  } else {
      gameOver(); // Call gameOver when the timer reaches zero
  }
}


  // hint: this code is provided to you in the instructions.
  
 

/**
*
* Starts the timer using setInterval. For each 1000ms (1 second)
* the updateTimer function get called. This function is already implemented
*
*/

  // TODO: Write your code here

  function startTimer() {
    timerId = setInterval(updateTimer, 1000); 
}


/**
*
* This is the event handler that gets called when a player
* clicks on a mole. The setEventListeners should use this event
* handler (e.g. mole.addEventListener('click', whack)) for each of
* the moles.
*
*/

  // TODO: Write your code here.





function whack(event) {
  if (!event.target.classList.contains('mole')) return; // Check for mole
  updateScore(); // Increment points
  playAudio(audioHit); // Play hit sound
}


/**
*
* Adds the 'click' event listeners to the moles. See the instructions
* for an example on how to set event listeners using a for loop.
*/

  // TODO: Write your code here
 

function setEventListeners() {
  moles.forEach(mole => {
      mole.addEventListener('click', whack); // Add click event listener
  });
}





function startGame() {
  setDuration(10); // Set the game duration to 10 seconds
  startTimer(); // Start the timer
  setEventListeners(); // Add event listeners to moles
  showUp(); // Start showing moles
  play(); // Play background music
  return "game started"; // Return a message indicating the game has started
}






function setDuration(seconds) {
  timerDisplay.textContent = seconds; // Set the initial timer display
}


/**
*
* This function sets the duration of the game. The time limit, in seconds,
* that a player has to click on the sprites.
*
*/


/**
*
* This function is called when the game is stopped. It clears the
* timer using clearInterval. Returns "game stopped".
*
*/


function gameOver() {
  clearInterval(timerId);
  alert(`Game Over! Your score is: ${points}`);
  clearScore(); // Reset score display
  timeLeft = 10; // Reset time for the next game
  lastHole = 0; // Reset lastHole
}



const audioHit = new Audio("https://github.com/gabrielsanchez/erddiagram/blob/main/hit.mp3?raw=true");
const song = new Audio("https://github.com/gabrielsanchez/erddiagram/blob/main/molesong.mp3?raw=true");

function playAudio(audioObject) {
  audioObject.play();
}

function loopAudio(audioObject) {
  audioObject.loop = true;
  playAudio(audioObject);
}

function stopAudio(audioObject) {
  audioObject.pause();
}

function play(){
  playAudio(song);
}







// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;