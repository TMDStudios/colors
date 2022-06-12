var active = false;
var blocks = 0;
var blockNum = 0;

generateBlock();

function activate(){
    active=!active;
    if(active){changeColor();}
}

function changeColor(){
    const colorNum = Math.floor(Math.random()*blockNum);
    const colorBlock = document.getElementById("block"+colorNum);
    const colorChoice = Math.floor(Math.random()*16);
    if(colorBlock.style.backgroundColor!=="yellow"){
        colorBlock.style = "background-color: "+getColor(colorChoice)+"; width: 16px; height: 16px;";
    }
    if(active){setTimeout(changeColor, 50);}
}

function generateBlock(){
    for(var i = 1; i<17; i++){
        const rootParent = document.getElementById("container");
        const rootChild = document.createElement("div");
        rootChild.className = "row";
        rootParent.appendChild(rootChild);  
        for(var j = 1; j<17; j++){
            const child = document.createElement("div");
            const colorChoice = Math.floor(Math.random()*16);
            child.style = "background-color: "+getColor(colorChoice)+"; width: 16px; height: 16px;";
            child.id = "block"+blockNum;
            blockNum++;
            rootChild.appendChild(child);  
        }
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