const createPixelMap = () =>{
    const pixelBoard = document.querySelector('#pixel-board');
    const breakRoll = document.createElement('br');
    for(let i=0;i<5;i+=1){
        pixelBoard.appendChild(breakRoll);
        for(let j=0;j<5;j+=1){
            const newSquare = document.createElement('div');
            newSquare.classList.add('pixel');
            pixelBoard.appendChild(newSquare);
        }
    }
};
window.onload = createPixelMap();