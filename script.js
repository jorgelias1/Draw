const container=document.querySelector('#container');
const containerWidth=container.offsetWidth;
const containerHt=container.offsetHeight;
let divCount;
let divElements=[];
makeGrid();
// get user input for grid size, check if valid
let input;
let submit=document.querySelector('#submit');
submit.addEventListener('click', ()=>{
    input=document.getElementById("size").value;
    clearGrid();
    makeGrid(input);
})
// look at guitar example to make it look nice during transition from clear to make
// populate grid
function makeGrid(input){
    input=((typeof input ==='undefined')||input<16||input>100) ? 16 : input;
    input=input*input;
    divCount=0;
    for (let i=0;i<input;i++){
        let div=document.createElement('div');
        div.classList='square';
        // set ht and width of each square in grid, relative to container
        let divWidth=(0.9125*(containerWidth/Math.sqrt(input)))+'px';
        div.style.width=divWidth;
        div.style.height=divWidth;
        container.appendChild(div);
        // to be used for clearGrid()
        divCount++;
        divElements.push(div);
    }
}
// clear grid
function clearGrid(){
    for (let i=0;i<divCount;i++){
        container.removeChild(divElements[i]);
    }
    divElements=[];
}

