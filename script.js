var canvas = document.querySelector('canvas');
canvas.width = 800;
canvas.height = 800;
var ctx = canvas.getContext("2d");
var playerRolls = []
const COMBINATIONS = ["Szemét","Pár","Drill","2 Pár","Kis Póker","Full","Kis Sor","Nagy Sor","Nagy Póker"]
var valaszthato = [0,0,0,0,0,0,0,0,0]
var ertekek = [0,0,0,0,0,0,0,0,0]
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
function Szin() {
    gombok = document.getElementsByClassName("valasztasgomb");

    for (let i = 0; i < gombok.length; i++) {
        if(valaszthato[i] == 1){
            gombok[i].style.backgroundColor = "yellow";
        }else{
            gombok[i].style.backgroundColor = "aqua";
        }
    }
}
function Choose(gomb,num) {
    Szin()
    gomb.style.backgroundColor = "red"; 
}
function Ellenorzes(){
    valaszthato = [0,0,0,0,0,0,0,0,0]
    valaszthato[0] = 1
    if(Pair(2,false) == true){
        valaszthato[1] = 1
    }
    if(Pair(3,false) == true){
        valaszthato[2] = 1
    }
    if(Pair(1,true) == true){
        valaszthato[3] = 1
    }
    if(Pair(4,false) == true){
        valaszthato[4] = 1
    }
    if(Pair(5,false) == true){
        valaszthato[7] = 1
    }
}
function CalcValue(type,score) {
    ertekek[0] = 0
    if (type == 2) {
        ertekek[1] = score*2
    }if (type == 3) {
        ertekek[2] = score*3
    }if (type == 4) {
        //ertekek[3] = score*4
    }if (type == 5) {
        ertekek[4] = score*4
    }if (type == 9) {
        ertekek[8] = 50
    }
    for (let i = 0; i < ertekek.length; i++) {
        document.getElementById("combination"+(i+1)).innerHTML = COMBINATIONS[i]+"("+ertekek[i]+")"
    }
}
function Pair(pairs,doublePair){
    var elemek = [1,2,3,4,5,6]
    var ismetlesek = [0,0,0,0,0,0]
    for (let i = 0; i < playerRolls.length; i++) {
        for (let j = 0; j < elemek.length; j++) {
            if (elemek[j] == playerRolls[i]) {
                ismetlesek[j]++
            }  
       }
    }
    if (doublePair == true) {
        var pairCount = 0
        for (let i = 0; i < ismetlesek.length; i++) {
            if (ismetlesek[i] >= 2) {
                pairCount++    
            }
        }
        if (pairCount == 2){
            return true
        }
    }
    else{
        for (let i = 0; i < ismetlesek.length; i++) {
            if (ismetlesek[i] >= pairs) {
                CalcValue(pairs,elemek[i])
                return true
            }
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
    playerRolls = []
    ertekek = [0,0,0,0,0,0,0,0,0]
    for (let i = 0; i < 5; i++) {
        randomNum = RandomNum();
        playerRolls.push(randomNum)
        PlayerTable(playerRolls)
        DrawDice(randomNum);
        Szin();
        Ellenorzes()
    }
}