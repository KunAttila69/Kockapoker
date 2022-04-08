var playerRolls = []
var enemyRolls = []
var playerPoints = 0
var enemyPoints = 0
var turn = 0
const COMBINATIONS = ["Szemét","Pár","Drill","Két Pár","Kis Póker","Full","Kis Sor","Nagy Sor","Nagy Póker"]
var valaszthato = [1,0,0,0,0,0,0,0,0]
var ertekek = [0,0,0,0,0,0,0,0,0]
var gombErtek = 0
var throws = 0
function RandomNum(){
    randomNum = Math.floor(Math.random()*6)+1;
    return randomNum;
}

function Szin(){
    gombok = document.getElementsByClassName("valasztasgomb");
    for (let i = 0; i < gombok.length; i++) {
        if(valaszthato[i] == 1){
            gombok[i].style.backgroundColor = "yellow";
        }else{
            gombok[i].style.backgroundColor = "white";
        }
    }
}
function Choose(gomb,gombNum) {
    if (turn == 0) {
        Szin()
        gombErtek = gombNum
        if (valaszthato[gombNum] == 1 && document.getElementById("roll").disabled == true){
            document.getElementById("submit").disabled = false
            gomb.style.backgroundColor = "red"; 
        }else{
            document.getElementById("submit").disabled = true
        }
    }
}
function HandleEnemy(){
    Ellenorzes()
    bestValue = 0
    for (let i = 0; i < ertekek.length; i++) {
        if(ertekek[i] >= bestValue){
            bestValue = ertekek[i]
        }
    }
    if(bestValue != 0){
        bestCombination = ertekek.indexOf(bestValue)
        document.getElementsByClassName("botCombinations")[bestCombination].style.backgroundColor = "red";
    }else{
        document.getElementsByClassName("botCombinations")[0].style.backgroundColor = "red";
    }
    enemyPoints += bestValue
}
function Ellenorzes(){
    if(Check2Same() == true){0
        valaszthato[1] = 1
    }if(Check3Same() == true){
        valaszthato[2] = 1
    }if(Check2Pairs() == true){
        valaszthato[3] = 1
    }if(Check4Same() == true){
        valaszthato[4] = 1
    }if(CheckFull() == true){
        valaszthato[5] = 1
    }if (CheckKisSor() == true) {
        valaszthato[6] = 1
    }if (CheckNagySor() == true) {
        valaszthato[7] = 1
    }if(Check5Same() == true){
        valaszthato[8] = 1
    }
}
function CalcValue(type,score) {
    ertekek[0] = 0
    if (type == 2) {
        ertekek[1] = score*2
    }if (type == 3) {
        ertekek[2] = score*3
    }if (type == 4) {
        ertekek[3] = score
    }if (type == 5) {
        ertekek[4] = score*4
    }if (type == 6) {
        ertekek[5] = score
    }if (type == 7 && score != 0) {
        ertekek[6] = 15
    }if (type == 8 && score != 0) {
        ertekek[7] = 20
    }if (type == 9 && score != 0){
        ertekek[8] = 50
    }
    for (let i = 0; i < ertekek.length; i++) {
        document.getElementById("combination"+(i+1)).innerHTML = COMBINATIONS[i]+"("+ertekek[i]+")"
    }
}
function FindPairs() {
    var elemek = [1,2,3,4,5,6]
    var ismetlesek = [0,0,0,0,0,0]
    if(turn == 0){
        for (let i = 0; i <= playerRolls.length; i++) {
            for (let j = 0; j < elemek.length; j++) {
                if (elemek[j] == playerRolls[i]) {
                    ismetlesek[j]++
                }  
           }
        }
    }else if(turn == 1){
        for (let i = 0; i <= enemyRolls.length; i++) {
            for (let j = 0; j < elemek.length; j++) {
                if (elemek[j] == enemyRolls[i]) {
                    ismetlesek[j]++
                }  
           }
        }
    } 
    return ismetlesek
}
function Check2Same() {
    var elemek = [1,2,3,4,5,6]
    ismetlesek = FindPairs()
    for (let i = 0; i <= ismetlesek.length; i++) {
        if (ismetlesek[i] >= 2) {
            CalcValue(2,elemek[i])
            return true
        }
    }
    CalcValue(2,0)
    return false
}
function Check3Same() {
    var elemek = [1,2,3,4,5,6]
    ismetlesek = FindPairs()
    for (let i = 0; i <= ismetlesek.length; i++) {
        if (ismetlesek[i] >= 3) {
            CalcValue(3,elemek[i])
            return true
        }
    }
    CalcValue(3,0)
    return false
}
function Check2Pairs() {
    var elemek = [1,2,3,4,5,6]
    ismetlesek = FindPairs()
    var pairCount = 0
    var pairValue = 0
    for (let i = 0; i <= ismetlesek.length; i++) {
        if (ismetlesek[i] >= 2) {
            pairCount++
            pairValue += elemek[i] 
        }
    }
    if (pairCount == 2){
        CalcValue(4,pairValue*2)
        return true
    }
    CalcValue(4,0)
    return false
}
function Check4Same() {
    var elemek = [1,2,3,4,5,6]
    ismetlesek = FindPairs()
    for (let i = 0; i <= ismetlesek.length; i++) {
        if (ismetlesek[i] >= 4) {
            CalcValue(5,elemek[i])
            return true
        }
    }
    CalcValue(5,0)
    return false
}
function CheckFull() {
    var elemek = [1,2,3,4,5,6]
    ismetlesek = FindPairs()
    if (ismetlesek.includes(2) && ismetlesek.includes(3)){
        CalcValue(6,elemek[ismetlesek.indexOf(2)]*2+elemek[ismetlesek.indexOf(3)]*3)
        return true
    }
    CalcValue(6,0)
    return false
}
function CheckKisSor() {
    if (turn == 0) {
        rolls = playerRolls
    }else{
        rolls = enemyRolls
    }
    if (rolls.includes(1) && rolls.includes(2) && rolls.includes(3) && rolls.includes(4) && rolls.includes(5)){
        CalcValue(7,1)
        return true
    }
    CalcValue(7,0)
    return false
}
function CheckNagySor() {
    if (turn == 0) {
        rolls = playerRolls
    }else{
        rolls = enemyRolls
    }
    if (rolls.includes(2) && rolls.includes(3) && rolls.includes(4) && rolls.includes(5) && rolls.includes(6)){
        CalcValue(8,1)
        return true
    }
    CalcValue(7,0)
    return false
}
function Check5Same() {
    ismetlesek = FindPairs()
    if (ismetlesek.includes(5)) {
        CalcValue(9,1)
        return true
    }else{
        CalcValue(9,0)
        return false
    }
}
//Dobás értékének rajzolása a canvasra
function DrawDice(value){
    switch (value) {
        case 0:
            dice.style.backgroundImage = "none"
            break;
        case 1:
            dice.style.backgroundImage = "url('dice1.png')"
            break;
        case 2:
            dice.style.backgroundImage = "url('dice2.png')"
            break;
        case 3:
            dice.style.backgroundImage = "url('dice3.png')"
            break;
        case 4:
            dice.style.backgroundImage = "url('dice4.png')"
            break;
        case 5:
            dice.style.backgroundImage = "url('dice5.png')"
            break;
        case 6:
            dice.style.backgroundImage = "url('dice6.png')"
            break;              
    }
}
function PlayerRoll(){
    turn = 0
    for (let i = 0; i < valaszthato.length; i++) {
        document.getElementsByClassName("botCombinations")[i].style.backgroundColor = "white"
    }
    playerRolls = []
    ertekek = [0,0,0,0,0,0,0,0,0]
    valaszthato = [1,0,0,0,0,0,0,0,0]
    for (let i = 0; i < 5; i++) {
        dice = document.getElementById("playerDice"+i);
        randomNum = RandomNum();
        playerRolls.push(randomNum)
        DrawDice(randomNum);
        
        dice = document.getElementById("enemyDice"+i);
        DrawDice(0);
    }
    document.getElementById("roll").disabled = true;
    Ellenorzes();
    Szin();
    throws++
}
function EnemyRoll(){
    enemyRolls = []
    ertekek = [0,0,0,0,0,0,0,0,0]
    valaszthato = [1,0,0,0,0,0,0,0,0]
    turn = 1
    for (let i = 0; i < 5; i++) {
        dice = document.getElementById("enemyDice"+i);
        randomNum = RandomNum();
        enemyRolls.push(randomNum)
        DrawDice(randomNum); 
    }
    HandleEnemy()
    ertekek = [0,0,0,0,0,0,0,0,0]
    valaszthato = [0,0,0,0,0,0,0,0,0]
    Szin();
    document.getElementById("botPoints").innerHTML = enemyPoints
}
function Submit(){
    playerRolls = []
    playerPoints += ertekek[gombErtek]
    ertekek = [0,0,0,0,0,0,0,0,0]
    valaszthato = [0,0,0,0,0,0,0,0,0]
    for (let i = 0; i < 5; i++) {
        dice = document.getElementById("playerDice"+i);
        DrawDice(0);
    }
    Ellenorzes();
    Szin();
    document.getElementById("roll").disabled = false;
    document.getElementById("submit").disabled = true;
    EnemyRoll()
    document.getElementById("playerPoints").innerHTML = playerPoints
    if(throws >= 10){
        if (playerPoints > enemyPoints) {
            alert("Nyertél")
            
        }else if(playerPoints < enemyPoints) {
            alert("Vesztettél")
        }else{
            alert("Döntetlen")
        }
    }
}
