var canvas = document.querySelector("canvas");
canvas.height = 800;
canvas.width = 1200;
var c = canvas.getContext("2d");
var canSort = false;
var sort = document.getElementById("sort");
var generate = document.getElementById("generate");


var background = {
    x:0,
    y:0,
    width:1200,
    height:800,
    color : "rgb(220,220,240)",
    draw:function(){
        c.fillStyle = this.color;
        c.fillRect(this.x,this.y,this.width,this.height);
    }
}
function Wall(x,y,w,h,color){
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.color = color;
    this.draw = function(){
        c.beginPath();
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.width, this.height);
    }
}
////////////////////////test start
function bubbleSort(array){
    for(let i = array.length; i>0;i--){
        for(let j = 0;j<i;j++){
            if(array[j]>array[j+1]){
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
            }
        }
    }
    return array;
}
let arr = [7,2,1,9,0,6,3,5,4,8];
bubbleSort(arr);
console.log(arr);
////////////////////////////test end
function random(min, max){
    return Math.floor(Math.random()*(max-min) + min)
}
var walls = new Array();
var gap = 0;

function generateRandomWalls(){
    walls = [];
    gap = 0;
    for(let i =0;i<55;i++){
        walls.push(new Wall(gap, 0, 10,random(100,700), "rgb(64,76,200)"));
        gap += 20;
    }
}
generateRandomWalls();
generate.onclick = function(){
    generateRandomWalls();
}
var i = walls.length;
var j = 0;
var sorting = setInterval(()=>{
    if(canSort){
        if(i>0){
            if(j<i-1){
                walls[j].color = "rgb(64,76,200)";
                walls[j + 1].color = "rgb(64,76,200)";
                if (walls[j].height > walls[j + 1].height) {
                    let temp = walls[j].height;
                    walls[j].height = walls[j + 1].height;
                    walls[j + 1].height = temp;
                }
                setTimeout(()=>{
                    if(j==walls.length-1){
                        walls[j].color = "rgb(35,230,100)";
                    }
                    else{
                        walls[j].color = "rgb(35,230,100)";
                        walls[j + 1].color = "rgb(35,230,100)";
                    }
                    
                },100)
                
                j++;
            }
            else if(j>=i-1){
                j = 0;
                i--;
            }
        }
        else{
            clearInterval(sorting);
        } 
    }   
}, 10);


sort.onclick = function(){
    canSort = true;
}


function Animate(){
    requestAnimationFrame(Animate);
    background.draw();
    for(let i in walls){
        walls[i].draw();
    }
}
Animate();