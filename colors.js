var active = false;
var blocks = 0;
var blockNum = 0;
var colors = 16;
var size = 16;
var target;
var complete = false;
var r = 255;
var g = 0;
var b = 255;
var rDown = true;
var gDown = false;
var bDown = true;
const container = document.getElementById("container");

const happy = [11, 14, 28, 29, 42, 47, 51, 52, 53, 54]
const mad = [10, 15, 19, 22, 35, 36, 37, 38, 42, 47]
const face = [10, 11, 12, 13, 14, 15, 18, 20, 21, 23, 26, 28, 29, 31, 34, 35, 36, 37, 38, 39, 42, 47, 50, 51, 52, 53, 54, 55]
const square = [1, 2, 3, 4, 5, 6, 7, 8, 9, 16, 17, 24, 25, 32, 33, 40, 41, 48, 49, 56, 57, 58, 59, 60, 61, 62, 63, 64]
const circle = [3, 4, 5, 6, 10, 15, 17, 24, 25, 32, 33, 40, 41, 48, 50, 55, 59, 60, 61, 62]
const smiley = [3, 4, 5, 6, 10, 15, 17, 19, 22, 24, 25, 32, 33, 35, 38, 40, 41, 44, 45, 48, 50, 55, 59, 60, 61, 62]
const crosshair = [3, 4, 5, 6, 10, 15, 17, 19, 22, 24, 25, 28, 29, 32, 33, 36, 37, 40, 41, 43, 46, 48, 50, 55, 59, 60, 61, 62]
const x = [1, 2, 7, 8, 10, 11, 14, 15, 19, 20, 21, 22, 28, 29, 36, 37, 43, 44, 45, 46, 50, 51, 54, 55, 57, 58, 63, 64]

const patterns = [happy, mad, face, square, circle, smiley, crosshair, x]
var patternChoice;

const bounce1 = [43,44,45,46,50,51,52,53,54,55,57,58,59,60,61,62,63,64]
const bounce2 = [19,20,21,22,26,27,28,29,30,31,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,59,60,61,62,63]
const bounce3 = [11,12,13,14,18,19,20,21,22,23,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,50,51,52,53,54,55,59,60,61,62]
const bounce4 = [3,4,5,6,10,11,12,13,14,15,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,42,43,44,45,46,47,51,52,53,54]

const bounce = [bounce1, bounce2, bounce3, bounce4, bounce3, bounce2]
var currentBounce = 0;
var animation;

generateBlock();

function activate(){
    console.log(target)
    active=!active;
    if(active){changeColor(); handleBg();}
}

function handleBg(){
    rDown ? r-=3 : r+=3;
    if(r<=0||r>=255){rDown=!rDown;}
    gDown ? g-=5 : g+=5;
    if(g<=0||g>=255){gDown=!gDown;}
    bDown ? b-- : b++;
    if(b<=0||b>=255){bDown=!bDown;}
    document.body.style.backgroundColor = 'rgba(' + r + ',' + g + ',' + b + ',' + .1 + ')';
    if(active){setTimeout(handleBg, 33);}
}

function handleAnimation(){
    if(currentBounce>=bounce.length){
        currentBounce=0
    }else{
        for(var i = 0; i<64; i++){
            const bounceBlock = document.getElementById("block"+i);
            if(bounce[currentBounce].indexOf(i+1)==-1){
                bounceBlock.style = "background-color: "+'rgba(' + r + ',' + g + ',' + b + ',' + .1 + ')'+"; width: 16px; height: 16px;";
            }else{
                bounceBlock.style = "background-color: "+getColor(Math.floor(Math.random()*colors))+"; width: 16px; height: 16px;";
            }
        }
        currentBounce++;
    }
    if(active){setTimeout(handleAnimation, 100);}
}

function changeColor(){
    const colorNum = Math.floor(Math.random()*blockNum);
    const colorBlock = document.getElementById("block"+colorNum);
    var colorChoice = Math.floor(Math.random()*colors);
    if(patternChoice!==null&&patternChoice!==undefined){
        if(patterns[patternChoice].indexOf(colorNum+1)==-1){
            colorBlock.style = "background-color: "+'rgba(' + r + ',' + g + ',' + b + ',' + .1 + ')'+"; width: 16px; height: 16px;";
        }else{
            colorBlock.style = "background-color: "+getColor(colorChoice)+"; width: 16px; height: 16px;";
        }
    }else if(animation!==null&&animation!==undefined){
        handleAnimation();
    }else{
        if(target!==null&&target!==undefined){
            if(target=="transparent"){
                colorBlock.style = "background-color: "+'rgba(' + r + ',' + g + ',' + b + ',' + .1 + ')'+"; width: 16px; height: 16px;";
            }else if(target=="shrink"){
                colorBlock.style = "background-color: "+'rgba(' + r + ',' + g + ',' + b + ',' + .1 + ')';
            }else{
                if(colorBlock.style.backgroundColor!==target){
                    colorBlock.style = "background-color: "+getColor(colorChoice)+"; width: 16px; height: 16px;";
                    checkBlock();
                }
            }
        }else{
            colorBlock.style = "background-color: "+getColor(colorChoice)+"; width: 16px; height: 16px;";
        }
    }
    if(active && (animation===null&&animation===undefined)){setTimeout(changeColor, 50);}
}

function checkBlock(){
    for(var i = 0; i<=blockNum; i++){
        const colorBlock = document.getElementById("block"+i);
        try{
            if(colorBlock.style.backgroundColor!==target){
                break;
            }
        }catch(e){
            break;
        }
        if(i===blockNum-1){
            console.log("DONE!");
            active = false;
        }
    }
}

function generateBlock(){
    for(var i = 1; i<=size; i++){
        const rootParent = document.getElementById("block-container");
        const rootChild = document.createElement("div");
        rootChild.className = "row";
        rootParent.appendChild(rootChild);  
        for(var j = 1; j<=size; j++){
            const child = document.createElement("div");
            var colorChoice = Math.floor(Math.random()*colors);
            child.style = "background-color: "+getColor(colorChoice)+"; width: 16px; height: 16px;";
            child.id = "block"+blockNum;
            blockNum++;
            rootChild.appendChild(child);  
        }
    }
}

function regenerateBlock(){
    blockNum = 0;
    colors = document.getElementById("colors").value;
    size = document.getElementById("size").value;
    target = document.getElementById("target").value;
    patternChoice = document.getElementById("pattern").value;
    animation = document.getElementById("animation").value;
    if(colors<2||colors===null){colors=2;}
    if(colors>16){colors=16;}
    if(size<4||size===null){size=4;}
    if(size>64){size=64;}
    if(target==="none"){target=null;}
    if(patternChoice==="none"){
        patternChoice=null;
    }else{
        size=8;
        document.getElementById("size").value = 8;
        alert("Block size set to 8 due to pattern")
    }
    if(animation==="none"){
        animation=null;
    }else{
        size=8;
        document.getElementById("size").value = 8;
        alert("Block size set to 8 due to animation")
    }
    const rootParent = document.getElementById("block-container");
    removeChildren(rootParent);
    generateBlock();
}

const removeChildren = (parent) => {
    while(parent.lastChild){
        parent.removeChild(parent.lastChild);
    }
}

function getColor(colorNumber){
    switch(colorNumber){
        case 0:
            return "black"
        case 1:
            return "red"
        case 2:
            return "green"
        case 3:
            return "blue"
        case 4:
            return "maroon"
        case 5:
            return "olive"
        case 6:
            return "lime"
        case 7:
            return "teal"
        case 8:
            return "navy"
        case 9:
            return "purple"
        case 10:
            return "aqua"
        case 11:
            return "yellow"
        case 12:
            return "fuchsia"
        case 13:
            return "white"
        case 14:
            return "gray"
        case 15:
            return "silver"
        default:
            return "black"
    }
}