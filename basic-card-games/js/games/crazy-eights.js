import Deck from './deck.js';

const opponentHandElement = document.querySelector(".opponent-hand");
const playerHandElement = document.querySelector(".player-hand");
const deckElement = document.querySelector(".deck");
const pileSlot = document.querySelector(".pile");

let drawPile, discardPile, playerHand, opponentHand;

startGame();

var userSelection = document.getElementById("player-hand").getElementsByClassName("card");
for(let i = 0; i < userSelection.length; i++) {
  (function(index) {
    userSelection[index].addEventListener("click", function() {
      //console.log(playerHand[index].suit + " " + playerHand[index].value);
      compareCard(index);
    });
  })(i);
}

function startGame() {
  const deck = new Deck();
  deck.shuffle();

  const handSize = 5;
  drawPile = new Deck(deck.cards);
  playerHand = drawCard(playerHandElement, handSize);
  opponentHand = drawCard(opponentHandElement, handSize);

  //playerHand = [deck.cards.slice(0, handSize)];
  //opponentHand = [deck.cards.slice(handSize, handSize * 2)];
  //drawPile = new Deck(deck.cards.splice(handSize*2, deck.numberOfCards));

  resetDiscardPile();
  updateDeckCount();

  //console.log(playerHand);
  //console.log(opponentHand);
  //console.log(deck);
  //console.log(discardPile);
}

function drawCard(hand, num) {
  let cards = [];
  while (num > 0) {
    const draw = drawPile.pop();
    hand.appendChild(draw.getHTML());
    cards.push(draw);
    num--;
  }
  return cards;
}

function updateDeckCount() {
  deckElement.innerText = drawPile.numberOfCards;
}

function resetDiscardPile() {
  discardPile = drawCard(pileSlot, 1);
}

function compareCard(index) {
  const card = playerHand[index];
  const discard = discardPile[0];
  if(card.suit === discard.suit || card.value === discard.value) {
    playerHand.splice(index, 1);
    console.log(playerHand);
  } else {
    console.log("FALSE");
  }
}