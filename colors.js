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

const smiley = [11, 14, 28, 29, 42, 47, 51, 52, 53, 54]
const mad = [10, 15, 19, 22, 35, 36, 37, 38, 42, 47]
const face = [10, 11, 12, 13, 14, 15, 18, 20, 21, 23, 26, 28, 29, 31, 34, 35, 36, 37, 38, 39, 42, 47, 50, 51, 52, 53, 54, 55]

const patterns = [smiley, mad, face]
var patternChoice;

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
    if(active){setTimeout(changeColor, 50);}
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