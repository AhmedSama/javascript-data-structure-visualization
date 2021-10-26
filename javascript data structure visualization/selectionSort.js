var canvas = document.querySelector("canvas");
canvas.height = 800;
canvas.width = 1200;
var c = canvas.getContext("2d");

var Moving = false;
var background = {
    x: 0,
    y: 0,
    width: 1200,
    height: 800,
    color: "rgb(220,220,240)",
    draw: function () {
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.width, this.height);
    }
}

function Wall(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.color = color;
    this.draw = function () {
        c.beginPath();
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.width, this.height);
    }
}
////////////////////////test start
function selectionSort(array) {
    let smaller = 0;
    for (let i = 0; i < array.length; i++) {
        smaller = i;
        for (let j = i; j < array.length; j++) {
            if(array[smaller]>array[j]){
                smaller = j;
            }
        }
        let temp = array[smaller];
        array[smaller] = array[i];
        array[i] = temp;
    }
}
let arr = [7, 2, 1, 9, 0, 6, 3, 5, 4, 8];
selectionSort(arr);
console.log(arr);
////////////////////////////test end

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
var walls = [];
var gap = 0;
function generateRandomWalls() {
    walls = [];
    gap = 0;
    for (let i = 0; i < 55; i++) {
        walls.push(new Wall(gap, 0, 10, random(100, 700), "rgb(64,76,200)"));
        gap += 20;
    }
}
generateRandomWalls();

function move(wall1, wall2,smaller,i) {
    var wall1Target = wall2.x;
    var wall2Target = wall1.x;
    var start = setInterval(() => {
        if (wall1.x == wall1Target && wall2.x == wall2Target) {
            wall1.x += 10;
            wall2.x += 10;
            let temp = walls[smaller];
            walls[smaller] = walls[i];
            walls[i] = temp;
            Moving = false;
            clearInterval(start);
        }
        if (wall1Target > wall1.x) {
            wall1.x += 10;
        }
        else {
            wall1.x -= 10;
        }
        if (wall2Target > wall2.x) {
            wall2.x += 10;
        }
        else {
            wall2.x -= 10;
        }
    }, 10);
}
var i=0;
var j = i;
var smaller = i;
var sorting = setInterval(()=>{
    console.log("hello");
    if(!Moving){
        if(i<walls.length){
            if(j<walls.length){
                if (walls[smaller].height > walls[j].height ){
                    smaller = j;
                }

                j++;
            }
            else{
                console.log("is moving");
                Moving = true;
                let tempI = i;
                let tempSmaller = smaller;
                walls[smaller].color = "rgb(23,160,100)";
                i++;
                smaller = i;
                j = i;
                move(walls[tempSmaller], walls[tempI],tempSmaller,tempI);
                // let temp = walls[smaller].height;
                // walls[smaller].height = walls[i].height;
                // walls[i].height = temp;
                
            }
        }
        else{
            clearInterval(sorting);
        }
    }
    
},10)

function Animate() {
    requestAnimationFrame(Animate);
    background.draw();
    for (let i in walls) {
        walls[i].draw();
    }
}
Animate();