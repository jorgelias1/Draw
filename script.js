const container=document.querySelector('#container');
const imageContainer=document.createElement('div');

const containerWidth=container.offsetWidth;
const selector=document.querySelector('#selector');
const span=document.createElement('div');

let divCount;
let divElements=[];
let imgElements=[];
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
let boolNorm;
let boolImage;
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
    if (boolNorm===true){
        clearGrid();
        makeGrid(input);
    }
    else if (boolImage===true){
        clearGrid();
        // call function that loads image
        loadImage();
        // makeImageGrid(input);
    }
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
    boolNorm=true;
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
    if (boolNorm===true){
    for (let i=0;i<divCount;i++){
        container.removeChild(divElements[i]);
    }
    divElements=[];
    selector.removeChild(span);
    color.value='#000000';
    currentColor='black';
    }
    else if (boolImage===true){
        for (let i=0;i<divCount;i++){
            imageContainer.removeChild(imgElements[i]);
        }
        imgElements=[];
        all.removeChild(imageContainer);
        container.style.display='flex';
    }
    boolNorm=false;
    boolImage=false;
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
// load image
function loadImage(e){    
    if (!(typeof(selectedImage)==='undefined')){
        if (!(typeof e==='undefined')){
            selectedImage=e.target.files[0];
            }
        let img;
        img=new Image();
        img.onload=function(){
            width=img.width;
            height=img.height;
            canvas.width=width;
            canvas.height=height;
            ctx.drawImage(img, 0,0);
            imageData=ctx.getImageData(0,0,width,height);
            getImageArray(imageData);
        }
        img.src=URL.createObjectURL(selectedImage);
    }
    
    else{
        selectedImage=e.target.files[0];
        // replace all below with loadImage() to be able to change 
        loadImage();
    }
}
imageInput.addEventListener('change', (e)=>{
    loadImage(e);
})
function getImageArray(imageData){
    console.log();
    clearGrid();
    makeImageGrid(imageData, input);
}
function makeImageGrid(imageData, input){
    // make 2D array from imageData
    boolImage=true;
    let OneDArray=imageData.data;
    let twoDArray=[];
    let k=0;
    for (let i=0;i<height;i++){
        twoDArray[i]=[];
        for (let j=0;j<width;j++){
            let red = OneDArray[k];
            let green = OneDArray[k + 1];
            let blue = OneDArray[k + 2];

            twoDArray[i][j] = [red, green, blue];
            k+=4;
        }
    }
    // hide normal grid, make image grid
    container.style.display='none';
    imageContainer.classList='imageContainer';
    let all=document.getElementById('all');
    // set imageContainer size given img size. 
    let dimensionRatio=width/height;
    
    input=((typeof input==='NaN')||(typeof input ==='undefined')||input<16||input>100) ? 75 : input;
    input=input*input;
    let gridSize=input;
    imageContainer.style.minWidth=dimensionRatio*550+'px';
    imageContainer.style.height=550+'px';
    let numCols=Math.round(Math.sqrt(gridSize*dimensionRatio));
    let numRows=Math.round(gridSize/numCols);

    let proportions=getProportions(numCols, numRows);
    
    // add grid columns/rows
    imageContainer.style.gridTemplateColumns=`repeat(${numCols}, 1fr)`;
    imageContainer.style.gridTemplateRows=`repeat(${numRows}, 1fr)`;
    imageContainer.style.gridAutoFlow='dense';

    all.appendChild(imageContainer);

    divCount=0;
    let cell_count=numCols*numRows;

    for (let i=0;i<numRows;i++){
        for(let j=0;j<numCols;j++){
            let div=document.createElement('div');
            div.classList='square2';
            imageContainer.appendChild(div);
            divCount++;
            // necessary values for assigning pixel color to each div.
            let r_sum=0, g_sum=0, b_sum=0;
                let inner_divs=0;
                let startX=Math.round(j*proportions.correspPixelsRow);
                let endX=Math.min(startX+proportions.correspPixelsRow, width);
                let startY=Math.round(i*proportions.correspPixelsCol);
                let endY=Math.min(startY+proportions.correspPixelsCol, height);
                for (let m=startY;m<endY; m++){
                    for (let n=startX;n<endX;n++){
                        inner_divs++;
                        r_sum+=twoDArray[m][n][0];
                        g_sum+=twoDArray[m][n][1];
                        b_sum+=twoDArray[m][n][2];
                    }
                }
                
                twoDArray[i][j][0]=r_sum/inner_divs;
                twoDArray[i][j][1]=g_sum/inner_divs;
                twoDArray[i][j][2]=b_sum/inner_divs;

            // color the square
            colorCell(div, twoDArray, i, j);
            imgElements.push(div);
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
    showSize(input);
}
    
function colorCell(div, twoDArray, i, j){
    // set div bg color to the average pixel color
    div.style.backgroundColor=`rgb(${twoDArray[i][j][0]}, ${twoDArray[i][j][1]}, ${twoDArray[i][j][2]})`;
}
function getProportions(numCols, numRows){
    // get proportion of image that each div takes up.
    let divWidthProportion=1/numCols;
    let divHeightProportion=1/numRows;

    // find number of pixels that this proportion corresponds to in the image
    let correspPixelsRow=divWidthProportion*width;
    let correspPixelsCol=divHeightProportion*height;
    return {
        correspPixelsCol: correspPixelsCol,
        correspPixelsRow: correspPixelsRow,
    }
}
// function clearImgGrid(){
//     divElements=[];
// }
