const pixelBoard = document.querySelector('#pixel-board');
const breakRoll = document.createElement('br');

const createPixelMap = () =>{
    for(let i=0;i<25;i+=1){
        const newSquare = document.createElement('div');
        newSquare.classList.add('pixel');
        pixelBoard.appendChild(newSquare);
    }
};

const colorList = document.querySelectorAll('.color');
for(let i=0;i<colorList.length;i+=1){
    colorList[i].addEventListener('click',(event)=>{
        for(let j=0;j<=colorList.length-1;j+=1){
            console.log(colorList[j]);
            if(colorList[j].classList.contains('selected')){
                colorList[j].classList.remove('selected');
            }
        }
        event.target.classList.add('selected')
    });
}

window.onload = createPixelMap(), document.querySelectorAll('.color')[0].classList.add('selected');