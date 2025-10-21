const $  = id => document.getElementById(id);

const cardGrid = $('card-grid');
const moveEl = $('moves');
const matcheEl = $('matches');
const resartBtn = $('restart');

const cardValues = ['😂','😁', '😦', '🤓', '💚', '🥲', '🤔', '😜'];
let cards = [];
let flippedCards = [];
let moves = 0;
let matches = 0;
let lockBoard = false;

// Duplicate and shuffle cards
function initCards() 
{
    cards = [...cardValues, ...cardValues];
    shuffleArr(cards);
}

// Fisher-yates shuffle algorithm
function shuffleArr(array) 
{
    for (let i = array.length - 1; i > 0;  i--)
    {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    
}

// Create grid card function
function createCardFunction() 
{
    cardGrid.innerHTML = '';
    cards.forEach((value, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.value = value;
        card.dataset.index = index;
        card.textContent = '';
        card.addEventListener('click', flipCard);
        cardGrid.appendChild(card);
    });
}


function flipCard() 
{
    if (lockBoard) return;

    if (this.classList.contains('flipped') || this.classList.contains('matched')) return;

    if (flippedCards.length === 2) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.value;
    flippedCards.push(this);

    if (flippedCards.length === 2){
        moves++;
        moveEl.textContent = moves;
        checkForMatch();
    }


}


function checkForMatch() 
{
    lockBoard = true;
    const [card1, card2] = flippedCards
    const isMatch = card1.dataset.value === card2.dataset.value;

    if (isMatch)
    {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matches++;
        matcheEl.textContent = matches;
        resetFlippedCards();

        if (matches === cardValues.length) 
        {
            setTimeout(() => {
                alert(`Congrats! You won in ${moves}!`);
            }, 500);
        }
    }else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
            resetFlippedCards();
        }, 1000);
    }
}


function resetFlippedCards() 
{
    flippedCards = [];
    lockBoard = false;

}

function restartGame()
{
    moves = 0;
    matches = 0;
    moveEl.textContent = moves;
    matcheEl.textContent = matches;
    initCards();
    createCardFunction();
}

resartBtn.addEventListener('click', restartGame);

// Start game;

initCards();
createCardFunction();