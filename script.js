const container=document.querySelector('#container');
const containerWidth=container.offsetWidth;
let divCount;
let divElements=[];
makeGrid();
// get user input for grid size
let input;
let size=document.querySelector('#size');
let submit=document.querySelector('#submit');
let clear=document.querySelector('#clear');

submit.addEventListener('click', ()=>{
    input=document.getElementById("size").value;
    clearGrid();
    makeGrid(input);
})
size.addEventListener('keypress', function(e){
    if (e.key==='Enter'){
        input=document.getElementById("size").value;
        clearGrid();
        makeGrid(input);
    }
})
// look at guitar example to make it look nice during transition from clear to make
// could add picture editing into this! drop picture in and draw/filters.
// populate grid
let mouseIsDown;
function makeGrid(input){
    input=((typeof input==='NaN')||(typeof input ==='undefined')||input<16||input>100) ? 16 : input;
    input=input*input;
    divCount=0;
    for (let i=0;i<input;i++){
        let div=document.createElement('div');
        div.classList='square';
        // set ht and width of each square in grid, relative to container
        let divWidth=(0.99*(containerWidth/Math.sqrt(input)))+'px';
        div.style.width=divWidth;
        div.style.height=divWidth;
        container.appendChild(div);
        divCount++;
        divElements.push(div);
        // enable drawing on this square
        div.addEventListener('mouseup', function(){
            mouseIsDown=false;
        });
        div.addEventListener('mousedown', ()=>{
            mouseIsDown=true;
            draw(div);
        });
        div.addEventListener('mousemove', ()=>{
            draw(div);
        })
 
    }
}
// clear grid
function clearGrid(){
    for (let i=0;i<divCount;i++){
        container.removeChild(divElements[i]);
    }
    divElements=[];
}
//draw
function draw(div){
    if (mouseIsDown){
        div.style.backgroundColor='black';
    }
}

clear.addEventListener('click', ()=>{
    input=document.getElementById("size").value;
    clearGrid();
    makeGrid(input);
})
