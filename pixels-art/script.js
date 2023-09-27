function createPixelBoard(size) {
  const pixelBoard = document.querySelector('#pixel-board');
  for (let i = 0; i < size; i += 1) {
    const newSquare = document.createElement('div');
    newSquare.classList.add('pixel');
    pixelBoard.appendChild(newSquare);
  }
}
createPixelBoard(25);

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

const boardButton = document.querySelector('#generate-board');
const inputValue = document.querySelector('#board-size');

boardButton.addEventListener('click', () => {
  if (!inputValue.value) {
    alert('Board inválido!');
  } else {
    createPixelBoard(inputValue.value);
  }
});
