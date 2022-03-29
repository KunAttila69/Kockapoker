var canvas = document.querySelector('canvas');
canvas.width = 800;
canvas.height = 800;
var ctx = canvas.getContext("2d");
var playerRolls = []
function RandomNum(){
    randomNum = Math.floor(Math.random()*6)+1;
    return randomNum;
}
// Dobások rajzolása
function DrawOne() {
    ctx.beginPath()
    ctx.arc(400,350,50,5,5*Math.PI)
    ctx.fill()
    ctx.stroke()   
}
function DrawTwo(){
    ctx.beginPath()
    ctx.arc(600,150,50,5,5*Math.PI)
    ctx.fill()
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(200,550,50,5,5*Math.PI)
    ctx.fill()
    ctx.stroke()
}
function DrawThree() {
    DrawTwo()
    DrawOne()                
}
function DrawFour(){
    DrawTwo()
    ctx.beginPath()
    ctx.arc(200,150,50,5,5*Math.PI)
    ctx.fill()
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(600,550,50,5,5*Math.PI)
    ctx.fill()
    ctx.stroke()
}
function DrawFive() {
    DrawFour()
    DrawOne()
}
function DrawSix() {
    DrawFour()
    ctx.beginPath()
    ctx.arc(600,345,50,5,5*Math.PI)
    ctx.fill()
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(200,345,50,5,5*Math.PI)
    ctx.fill()
    ctx.stroke()
}
//Dobás értékének rajzolása a canvasra
function DrawDice(value){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(100,50,600,600);
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
        randomNum = RandomNum();
        playerRolls.push(randomNum)
        PlayerTable(playerRolls)
        DrawDice(randomNum);
    }else{
        alert("")
    }
}