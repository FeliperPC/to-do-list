const pixelBoard = document.querySelector('#pixel-board');
const colorList = document.querySelectorAll('.color');
const button = document.querySelector('#clear-board');
const boardButton = document.querySelector('#generate-board');
const inputValue = document.querySelector('#board-size');

// Pega a quantidade de quadrados atualizada
const getUpdatedSquaresNumber = () => {
  return document.querySelectorAll('.pixel').length;
};
// Pega a lista atualizadad de elementos
const getUpdatedSquaresElements = () => {
  return document.querySelectorAll('.pixel');
};

// Limpa o quadro de pixels
function clearBoard() {
  while (pixelBoard.firstChild) {
    pixelBoard.removeChild(pixelBoard.firstChild);
  }
}
// Adiciona eventos aos quadrados
function addEventToSquares() {
  const squares = getUpdatedSquaresElements();
  for (let i = 0; i < getUpdatedSquaresNumber(); i += 1) {
    squares[i].addEventListener('click', () => {
      for (let j = 0; j < colorList.length; j += 1) {
        if (colorList[j].classList.contains('selected')) {
          squares[i].id = colorList[j].id;
        }
      }
    });
  }
}
// Randomiza a posiçao das cores
function randomColorsPosition() {
  for (let i = colorList.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [colorList[i], colorList[j]] = [colorList[j], colorList[i]];
  }
}

// Cria o quadro de pixels customizadamente já adicionando evento aos quadrados
function createPixelBoard(size) {
  if (pixelBoard.children.length) clearBoard();
  randomColorsPosition();
  for (let i = 0; i < size; i += 1) {
    const newSquare = document.createElement('div');
    newSquare.classList.add('pixel');
    pixelBoard.appendChild(newSquare);
  }
  addEventToSquares();
}
createPixelBoard(25);

// Adiciona a cor preta como cor principal
document.querySelectorAll('.color')[0].classList.add('selected');

// Remove e adiciona a class selected na cor selecionada
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

// Função que limpa o quadro
button.addEventListener('click', () => {
  const squares = getUpdatedSquaresElements();
  for (let i = 0; i < getUpdatedSquaresNumber(); i += 1) {
    if (squares[i].id !== '') {
      squares[i].id = '';
    }
  }
});

// Função que invoca a criação de um novo quadro atravês dos dados do input
boardButton.addEventListener('click', () => {
  if (!inputValue.value) {
    alert('Board inválido!');
  }
  if (inputValue.value <= 5) {
    createPixelBoard(5 * 5);
  } else if (inputValue.value >= 50) {
    createPixelBoard(50 * 50);
  } else {
    createPixelBoard(inputValue.value * inputValue.value);
  }
});
