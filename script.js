const container=document.querySelector('#container');
const containerWidth=container.offsetWidth;
const selector=document.querySelector('#selector');
const span=document.createElement('div');

let divCount;
let divElements=[];
let input;
let size2=document.querySelector('#size2');
// get user input for grid size
let size=document.querySelector('#size');
let submit=document.querySelector('#submit');
let clear=document.querySelector('#clear');
//color select
let color=document.querySelector('.cw');
let random=document.querySelector('#random');
let currentColor;
let r;
//image pixel data
let imageData;


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
//change color
color.addEventListener('change', ()=>{
    r=false;
    currentColor=color.value;
})
// random color
random.addEventListener('click', ()=>{
    r=true;
})

// look at guitar example to make it look nice during transition from clear to make
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
    r=false;
    for (let i=0;i<divCount;i++){
        container.removeChild(divElements[i]);
    }
    divElements=[];
    selector.removeChild(span);
    color.value='#000000';
    currentColor='black';
}
//draw
function draw(div){
    if (mouseIsDown){
        if (typeof currentColor==='undefined'){
            currentColor='black';
        }
        if (r){
            drawR(div);
        }
        div.style.backgroundColor=currentColor;
    }
}
function drawR(div){
    if (mouseIsDown){
        if (typeof currentColor==='undefined'){
            currentColor='black';
        }
        let r=Math.floor(Math.random()*256);
        let g=Math.floor(Math.random()*256);
        let b=Math.floor(Math.random()*256);
        currentColor='rgb('+r+','+g+','+b+')';
        div.style.backgroundColor=currentColor;
    }
}
// set color
function showColors(){
    colors.type='color';
    document.getElementById('color').appendChild(colors);
}
//display current grid size
function showSize(input){
    if (typeof input==='undefined'){
        input===16;
    }
    span.textContent='Grid Size: '+ Math.sqrt(input)+'x'+Math.sqrt(input);
    selector.appendChild(span); 
}

// vars for getting image data
const imageInput=document.querySelector('#imageInput');
const canvas = document.createElement('canvas');
// const canvas=document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// get image array data
let width;
let height;
imageInput.addEventListener('change', function(e){
    let selectedImage=e.target.files[0];
    let img;
    if (selectedImage){
        img=new Image();
        img.onload=function(){
            width=img.width;
            height=img.height;
            ctx.drawImage(img, 0,0);
            imageData=ctx.getImageData(0,0,width,height);
            getImageArray(imageData);
        }
        img.src=URL.createObjectURL(selectedImage);
    }
})
function getImageArray(imageData){
    console.log();
    console.log(imageData.data);
    clearGrid();
    // clearImgGrid();
    makeImageGrid(imageData);
}
function makeImageGrid(imageData){
    // make 2D array from imageData
    let OneDArray=imageData.data;
    let twoDArray=[];
    let k=0;
    for (let i=0;i<height;i++){
        twoDArray[i]=[];
        for (let j=0;j<width;j++, k++){
            twoDArray[i][j]=OneDArray[k];
        }
    }
    // hide normal grid, make image grid
    container.style.display='none';
    const imageContainer=document.createElement('div');
    imageContainer.classList='imageContainer';
    let all=document.getElementById('all');
    // set imageContainer size given img size. 
    let dimensionRatio=width/height;
    let gridSize=5000;
    imageContainer.style.minWidth=dimensionRatio*550+'px';
    imageContainer.style.height=550+'px';
    let numCols=Math.round(Math.sqrt(gridSize*dimensionRatio));
    let numRows=Math.round(gridSize/numCols);
    // imageContainer.style.flexBasis=dimensionRatio*550+'px';
    imageContainer.style.gridTemplateColumns=`repeat(${numCols}, 1fr)`;
    imageContainer.style.gridTemplateRows=`repeat(${numRows}, 1fr)`;
    imageContainer.style.gridAutoFlow='dense';

    all.appendChild(imageContainer);

    // input=((typeof input==='NaN')||(typeof input ==='undefined')||input<16||input>100) ? 16 : input;
    // input=input*input;
    divCount=0;
    console.log(numCols, numRows);

    for (let i=0;i<(numCols*numRows);i++){
        let div=document.createElement('div');
        div.classList='square2';
        imageContainer.appendChild(div);
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
    // // showSize(input);
}
// function clearImgGrid(){
//     divElements=[];
// }
