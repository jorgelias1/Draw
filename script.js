const container=document.querySelector('#container');
const containerWidth=container.offsetWidth;
const selector=document.querySelector('#selector');
const span=document.createElement('span');
// const colors=document.createElement('input');

let divCount;
let divElements=[];
let input;
let size2=document.querySelector('#size2');
// get user input for grid size
let size=document.querySelector('#size');
let submit=document.querySelector('#submit');
let clear=document.querySelector('#clear');
let color=document.querySelector('.cw');
let currentColor;

//initialize grid
makeGrid(input);
//all ways of changing grid size
submit.addEventListener('click', ()=>{
    input=size.value;
    clearGrid();
    makeGrid(input);
    size2.value=input;
})

size2.addEventListener('change', ()=>{
    input=size2.value;
    clearGrid();
    makeGrid(input);
})

size.addEventListener('keypress', function(e){
    if (e.key==='Enter'){
        input=document.getElementById("size").value;
        clearGrid();
        makeGrid(input);
        size2.value=input;
    }
})
// clear button
clear.addEventListener('click', ()=>{
    clearGrid();
    makeGrid(input);
})
color.addEventListener('change', ()=>{
    currentColor=color.value;
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
    showSize(input);
}
// clear grid
function clearGrid(){
    for (let i=0;i<divCount;i++){
        container.removeChild(divElements[i]);
    }
    divElements=[];
    selector.removeChild(span);
}
//draw
function draw(div){
    if (mouseIsDown){
        div.style.backgroundColor=currentColor;
    }
}
// set color
function showColors(){
    colors.type='color';
    document.getElementById('color').appendChild(colors);
}
function showSize(input){
    if (typeof input==='undefined'){
        input===16;
    }
    span.textContent='Grid Size: '+ Math.sqrt(input)+'x'+Math.sqrt(input);
    selector.appendChild(span); 
}

