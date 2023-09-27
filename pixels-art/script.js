const pixelBoard = document.querySelector('#pixel-board');
for (let i = 0; i < 25; i += 1) {
  const newSquare = document.createElement('div');
  newSquare.classList.add('pixel');
  pixelBoard.appendChild(newSquare);
}

document.querySelectorAll('.color')[0].classList.add('selected');

const colorList = document.querySelectorAll('.color');
for (let i = 0; i < colorList.length; i += 1) {
  colorList[i].addEventListener('click', (event) => {
    for (let j = 0; j <= colorList.length - 1; j += 1) {
      if (colorList[j].classList.contains('selected')) {
        colorList[j].classList.remove('selected');
      }
    }
    event.target.classList.add('selected');
  });
}

const squares = document.querySelectorAll('.pixel');
for (let i = 0; i < squares.length; i += 1) {
  squares[i].addEventListener('click', () => {
    for (let j = 0; j < colorList.length; j += 1) {
      if (colorList[j].classList.contains('selected')) {
        squares[i].id = colorList[j].id;
      }
    }
  });
}

const button = document.querySelector('#clear-board');
button.addEventListener('click', () => {
  for (let i = 0; i < squares.length; i += 1) {
    squares[i].style.background = '#FFF';
  }
});
