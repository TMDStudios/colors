var active = false;
var blocks = 0;
var blockNum = 0;
var colors = 16;
var size = 16;
var target;

generateBlock();

function activate(){
    active=!active;
    if(active){changeColor();}
}

function changeColor(){
    const colorNum = Math.floor(Math.random()*blockNum);
    const colorBlock = document.getElementById("block"+colorNum);
    const colorChoice = Math.floor(Math.random()*colors);
    if(target!==null){
        if(colorBlock.style.backgroundColor!==target){
            colorBlock.style = "background-color: "+getColor(colorChoice)+"; width: 16px; height: 16px;";
        }
    }else{
        colorBlock.style = "background-color: "+getColor(colorChoice)+"; width: 16px; height: 16px;";
    }
    if(active){setTimeout(changeColor, 50);}
}

function generateBlock(){
    for(var i = 1; i<=size; i++){
        const rootParent = document.getElementById("container");
        const rootChild = document.createElement("div");
        rootChild.className = "row";
        rootParent.appendChild(rootChild);  
        for(var j = 1; j<=size; j++){
            const child = document.createElement("div");
            const colorChoice = Math.floor(Math.random()*colors);
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
    if(colors<2||colors===null){colors=2;}
    if(colors>16){colors=16;}
    if(size<4||size===null){size=4;}
    if(size>64){size=64;}
    if(target==="none"){target=null;}
    const rootParent = document.getElementById("container");
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
            return "silver"
        case 2:
            return "gray"
        case 3:
            return "white"
        case 4:
            return "maroon"
        case 5:
            return "red"
        case 6:
            return "purple"
        case 7:
            return "fuchsia"
        case 8:
            return "green"
        case 9:
            return "lime"
        case 10:
            return "olive"
        case 11:
            return "yellow"
        case 12:
            return "navy"
        case 13:
            return "blue"
        case 14:
            return "teal"
        case 15:
            return "aqua"
        default:
            return "black"
    }
}