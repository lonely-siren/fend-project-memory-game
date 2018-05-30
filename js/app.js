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
let moves = 0;
let startTime = 0;
let endTime = 0;
let timer = 0;
let openedCards = [];
let pairsFound = 0;
let timeElapsed;

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

// function to read the class of the card to see if it is open, matched or closed
function cardClass(card){
    return card.firstChild.className;
}

// check open cards when count = 2
function checkCards(){
  let card1 = openedCards[0];
  let card2 = openedCards[1]
  if (cardClass(card1[0]) === cardClass(card2[0])){
        pairsFound++;
        openedCards.forEach(function(card){
          card.animateCss('flash', function(){
             card.toggleClass("open show match");
         });
     });
    }
  else {
      openedCards.forEach(function(card){
        card.animateCss('wobble', function(){
          card.toggleClass("open show");
      });
              });
    }
    openedCards = [];
    addMove();
    if (pairsFound === 8){
        endGame();
    }
}

// set starting time
function setStartTime(){
    startTime = performance.now();
}

// add move to scoreboard and take away stars if many moves have been made
function addMove(){
    moves += 1;
    $("#moves").html(moves);
    if (moves === 10 || moves === 14 || moves === 18 || moves === 22){
        removeStar();
    }
}

// start timer
function startTimer(){
    timer += 1;
    $("#timer").html(timer);
    timeElapsed = setTimeout(startTimer, 1000);
}

function stopTime() {
    clearTimeout(timeElapsed);
}

// event for card click
function clickCard(event){
    // check if card is already open when one is not found it is -1
     let classes = $(this).attr("class");
     if (classes.search('open') * classes.search('match') !== 1){
         return;
     }
    // start game if if hasn't been started and set the starting time
    if (!gameStarted) {
        gameStarted = true;
        startTimer();
    }
    // check if more than 2 cards are flipped
    if (openedCards.length < 2){
        $(this).toggleClass("open show");
        openedCards.push($(this));
    }
    //
    if (openedCards.length === 2)
    {
      checkCards();
    }
}

// create cards using the class provided #card
function createHTMLCard(cardName){
    $("ul.deck").append(`<li class="card"><i class="fa ${cardName}"></i></li>`);
}

// load the deck onto the dom
 function loadCardsToDeck(){
     shuffle(cardsList.concat(cardsList)).forEach(createHTMLCard);
 }

// take star
function removeStar(){
    let stars = $(".fa-star");
    $(stars[stars.length-1]).toggleClass("fa-star fa-star-o");
}

// initiate the stars to 3 whan game starts
function initiateStars(){
    for (let i=0; i<5; i++){
        $(".stars").append(`<li><i class="fa fa-star"></i></li>`);
    }
}

// take stars away from scoreboard
function reduceStar(){
  $(".stars").remove(`<li><i class="fa fa-star"></i></li>`);
}

// game starts
function startGame(){
    loadCardsToDeck();
    initiateStars();
    $(".card").click(clickCard);
}
//Start game on page ready
$(document).ready(function(){
    startGame();
    $("#restart").click(restartGame);
});

function endGame(){
  endTime = performance.now();
  var totalTime = (endTime - startTime)/1000;
  console.log("It took you "+totalTime+" seconds to finish the game");
  //$("#timer").html(0);
  stopTime();
  showmodal();
}

//Modal taken from https://robinparisi.github.io/tingle/

function showmodal(){
  var modal = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
  });
modal.setContent('<h1>You won!</br> </h1>'+ 'It took you '+ timer + ' seconds and '+ moves + ' moves,</br>  and your star rating was '+ $(".fa-star").length + ' star(s).</br>'+'Would you like to play again?');
modal.addFooterBtn('Yes', 'tingle-btn tingle-btn--primary', function() {
    restartGame();
    modal.close();
  });
modal.addFooterBtn('No', 'tingle-btn tingle-btn--primary', function() {
  modal.close();
});
modal.open();
};

function restartGame(){
  $("ul.deck").html("");
  $(".stars").html("");
  openedCards= [];
  moves = -1;
  gameStarted = false;
  addMove();
  startTime = 0;
  endTime = 0;
  pairsFound = 0;
  $("#timer").html(0);
  timer=0;
  stopTime();
  startGame();
}
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

 // load animateCss
// taken from https://github.com/daneden/animate.css/#usage
$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);
            if (callback) {
                callback();
            }
        });
        return this;
    }
});
