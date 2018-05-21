/*
 * Create a list that holds all of your cards
 */
 const cardsList = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Variables
let gameStarted = false;
let starsCount = [];
let moves = 0;

function createHTMLCard(cardName){
    $("ul.deck").append(`<li class="card"><i class="fa ${cardName}"></i></li>`);
}

 function loadCardsToDeck(){
     shuffle(cardsList.concat(cardsList)).forEach(createHTMLCard);
 }

 // Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}




function startGame(){
    loadCardsToDeck();
    initiateStars();
}

function initiateStars(){
    for (let i=0; i<3; i++){
        $(".stars").append(`<li><i class="fa fa-star"></i></li>`);
    }
}

//Start game on page ready
$(document).ready(function(){
    startGame();
    //$("#restart").click(restartGame);
    // vex.defaultOptions.className = 'vex-theme-os';
    // vex.dialog.buttons.YES.text = 'Yes!';
    // vex.dialog.buttons.NO.text = 'No';
});


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
