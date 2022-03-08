import Deck from './deck.js';

const CARD_VALUE_MAP = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  "J": 11,
  "Q": 12,
  "K": 13,
  "A": 14
}

const opponentCardSlot = document.querySelector(".opponent-card-slot");
const playerCardSlot = document.querySelector(".player-card-slot");
const opponentDeckElement = document.querySelector(".opponent-deck");
const playerDeckElement = document.querySelector(".player-deck");
const text = document.querySelector(".game-text");

let playerDeck, opponentDeck, spoilsDeck, atWar, stop;
let warSpoils = [];

startGame();

document.getElementById("war").addEventListener("click", () => {
  if(stop) {
    startGame();
    text.innerHTML = "";
    return;
  }

  cleanUp();
  flipCards();
})

function startGame() {
  stop = false;
  warSpoils = [];

  const deck = new Deck();
  deck.shuffle();
  
  const deckMidpoint = Math.ceil(deck.numberOfCards / 2);
  playerDeck = new Deck(deck.cards.slice(0, deckMidpoint));
  opponentDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards));
  //playerDeck = new Deck([new Card('♥', 'J'), new Card('♠', 'A'), new Card('♣', '2')]);
  //opponentDeck = new Deck([new Card('♣', 'J'), new Card('♥', '2'), new Card('♦', 'A')]);
  //playerDeck = new Deck([new Card('♠', 'A'), new Card('♣', 'A'), new Card('♥', 'Q'), new Card('♠', '2'), new Card('♠', 'K')]);
  //opponentDeck = new Deck([new Card('♥', 'A'), new Card('♦', 'A'), new Card('♣', 'Q'), new Card('♣', '4'), new Card('♣', 'J')]);

  cleanUp();
  updateDeckCount();
}

function cleanUp() {
  playerCardSlot.innerHTML = "";
  opponentCardSlot.innerHTML = "";
}

function updateDeckCount() {
  playerDeckElement.innerText = playerDeck.numberOfCards;
  opponentDeckElement.innerText = opponentDeck.numberOfCards;
}

function flipCards() {
  const playerCard = playerDeck.pop();
  const opponentCard = opponentDeck.pop();
  playerCardSlot.appendChild(playerCard.getHTML());
  opponentCardSlot.appendChild(opponentCard.getHTML());
  
  if(compareCards(playerCard, opponentCard)) {
    playerDeck.push(playerCard);
    playerDeck.push(opponentCard);

    if(atWar) {
      atWar = false;
      for(let i = 0; i < warSpoils.length; i++) {
        playerDeck.push(warSpoils[i]);
      }
      text.innerHTML = "You won the war. +" + warSpoils.length;
      warSpoils = [];
    } else {
      text.innerHTML = "You win this battle. +2";
    }
  } else if(compareCards(opponentCard, playerCard)) {
    opponentDeck.push(playerCard);
    opponentDeck.push(opponentCard);

    if(atWar) {
      atWar = false;
      for(let i = 0; i < warSpoils.length; i++) {
        opponentDeck.push(warSpoils[i]);
      }
      text.innerHTML = "You lost the war. -" + warSpoils.length;
      warSpoils = [];
    } else {
      text.innerHTML = "You lose this battle. -2";
    }
  } else {
    atWar = true;
    const playerSpoilCard = playerDeck.pop();
    const opponentSpoilCard = opponentDeck.pop();
    warSpoils.push(playerCard, opponentCard, playerSpoilCard, opponentSpoilCard);
    text.innerHTML = "You are at war! <br /> Spoils of war: " + warSpoils.length;
  }

  updateDeckCount();

  if(isGameOver(playerDeck)) {
    text.innerHTML = "You lost...";
    stop = true;
  } else if(isGameOver(opponentDeck)) {
    text.innerHTML = "You win!";
    stop = true;
  }
}

function compareCards(firstCard, secondCard) {
  return CARD_VALUE_MAP[firstCard.value] > CARD_VALUE_MAP[secondCard.value];
}

function isGameOver(deck) {
  return deck.numberOfCards === 0;
}