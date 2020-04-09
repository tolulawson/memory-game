const cards = ['assets/card-1@2x.png','assets/card-2@2x.png', 'assets/card-3@2x.png', 'assets/card-4@2x.png'];

let timerID;
let mins = 0;
let secs = 0;
let clickRecord = [];
let score = 0;

const timerCounter = function() {
  if (secs <= 59) {
    secs++;
  }
  if (secs > 59) {
    mins++;
    secs = 0;
  }
  if (mins < 10) {
    document.querySelector('#mins').textContent = '0' + mins.toString();
  }
  if (mins >= 10) {
    document.querySelector('#mins').textContent = mins.toString();
  }
  if (secs < 10) {
    document.querySelector('#secs').textContent = '0' + secs.toString();
  }
  if (secs >= 10) {
    document.querySelector('#secs').textContent = secs.toString();
  }

}

const startGame = function(event) {

    document.querySelector('.intro-layer').style.transform = 'translateY(-100vh)';

    document.querySelector('.game-layer').style.opacity = 1;



  let backCards = document.querySelectorAll('.front');

  function randomizeArr(arr) {
  return arr.sort((item) => {
    let x = Math.floor(Math.random() * 2);
    return [-1,1][x];
  });
}

let random = randomizeArr([0,0,1,1,2,2,3,3]);

backCards.forEach((item, index) => {
  item.style.backgroundImage = `url(${cards[random[index]]})`;
})

timerID = setInterval(timerCounter, 1000);

}


document.querySelector('#start-button').addEventListener('click', startGame);


const turnCard = function(event) {

  if (event.target.classList[0] === 'back') {
    clickRecord.push(event.target);
    if (clickRecord.length > 1) {
      if (clickRecord[0].previousElementSibling.style.backgroundImage !== clickRecord[1].previousElementSibling.style.backgroundImage) {
      clickRecord.forEach((item) => {
        function removeClass() {
          item.parentElement.classList.remove('turn')
        }
        setTimeout(removeClass, 1000);
      });
      // clickRecord = [];
    }
    else {
      score++;
    }
    clickRecord = [];
    if (score > 3) {
      clearInterval(timerID);
    }
  }
    event.target.parentElement.classList.add('turn');

    document.querySelector('#move-count').textContent = (parseInt(document.querySelector('#move-count').textContent) + 1).toString();

    }

}

document.body.addEventListener('click',turnCard);

const refreshGame = function(event) {
  mins = 0;
  secs = 0;
  clickRecord = [];
  score = 0;
  document.querySelector('#move-count').textContent = '0';
  document.querySelectorAll('.turn').forEach((item) => {
    item.classList.remove('turn');
  });
  clearInterval(timerID);
  startGame();
}

document.querySelector('#refresh-button').addEventListener('click', refreshGame);
