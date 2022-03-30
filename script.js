var canvas = document.querySelector('canvas');
canvas.width = 800;
canvas.height = 800;
var ctx = canvas.getContext("2d");
var playerRolls = []
const COMBINATIONS = ["Szemét","Pár","Drill","2 Pár","Kis Póker","Full","Kis Sor","Nagy Póker"]
var fajdalom = [0,0,0,0,0,0,0,0]
function RandomNum(){
    randomNum = Math.floor(Math.random()*6)+1;
    return randomNum;
}
function DrawCircle(x,y){
    ctx.beginPath()
    ctx.arc(400,350,50,5,5*Math.PI)
    ctx.fill()
    ctx.stroke() 
}
// Dobások rajzolása
function DrawOne() {
    DrawCircle(400,350)  
}
function DrawTwo(){
    DrawCircle(600,150)
    DrawCircle(200,550) 
}
function DrawThree() {
    DrawTwo()
    DrawOne()                
}
function DrawFour(){
    DrawTwo()
    DrawCircle(200,150) 
    DrawCircle(600,550)
}
function DrawFive() {
    DrawFour()
    DrawOne()
}
function DrawSix() {
    DrawFour()
    DrawCircle(600,345) 
    DrawCircle(200,345) 
}
function Choose(gomb,num) {
    gombok = document.getElementsByClassName("valasztasgomb");
    for (let i = 0; i < gombok.length; i++) {
        if( fajdalom[i] == 1){
            gombok[i].style.backgroundColor = "yellow";
        }else{
            gombok[i].style.backgroundColor = "aqua";
        }
    }
    gomb.style.backgroundColor = "red"; 
}
function Ellenorzes(){
    fajdalom = [0,0,0,0,0,0,0,0]
    fajdalom[0] = 1
    if(Pair(2) == true){
        fajdalom[1] = 1
    }
    if(Pair(3) == true){
        fajdalom[2] = 1
    }
    if(Pair(4) == true){
        fajdalom[4] = 1
    }
    if(Pair(5) == true){
        fajdalom[7] = 1
    }
}
function Pair(asd){
    var asd = asd
    var elemek = [1,2,3,4,5,6]
    var ismetlesek = [0,0,0,0,0,0]
    for (let i = 0; i < playerRolls.length; i++) {
        for (let j = 0; j < elemek.length; j++) {
            if (elemek[j] == playerRolls[i]) {
                ismetlesek[j]++
            }
            
        }
        
    }
    for (let i = 0; i < ismetlesek.length; i++) {
        if (ismetlesek[i] >= asd) {
            return true
        }
    }
    return false
}
//Dobás értékének rajzolása a canvasra
function DrawDice(value){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(100,100,600,600);
    switch (value) {
        case 1:
            DrawOne()
            break;
        case 2:
            DrawTwo()
            break;
        case 3:
            DrawThree()
            break;
        case 4:
            DrawFour()
            break;
        case 5:
            DrawFive()
            break;
        case 6:
            DrawSix()
            break;              
    }
}
function PlayerTable(playerRolls) {
    for (let roll = 1; roll <= playerRolls.length; roll++) {
        document.getElementById("playerCell"+roll).innerHTML = playerRolls[roll-1]
    }
}
function Roll(){
    if (playerRolls.length < 5){
        for (let i = 0; i < 5; i++) {
            randomNum = RandomNum();
            playerRolls.push(randomNum)
            PlayerTable(playerRolls)
            DrawDice(randomNum);
        }
    }else{
        alert("")
    }
}