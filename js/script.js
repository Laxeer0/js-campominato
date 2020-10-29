document.getElementById("startbtn").addEventListener("click", function(){
//GAME Proprieties
var ROUNDS = 100;
var MIN_OPTION = 1;
var MAX_OPTION = 100;


//MINES Settings
var MAX_MINES = 16;
var MIN_NMINES = 1;
var MAX_NMINES = 100;
var mines = [];
var tmp_mines = 0;

var selDiffHTML = parseInt(document.getElementById("selectDiff").value);

console.log(selDiffHTML)
switch(selDiffHTML) {
  case 1:
    MAX_NMINES = 100;
    MAX_OPTION = 100;
    break;
  case 2:
    MAX_NMINES = 80;
    MAX_OPTION = 80;
    break;
  case 3:
    MAX_NMINES = 50;
    MAX_OPTION = 50;
    break;
}



//MINES generator
while (mines.length < MAX_MINES){
  tmp_mines = Math.floor(Math.random() * (MAX_NMINES - MIN_NMINES + 1)) + MIN_NMINES;
  if(!checkArray(tmp_mines,mines)){
    mines.push(tmp_mines);
  }
}
//Se vuoi barare attiva, ricorda che sarai una persona cattiva
//console.log(mines);

//USER selection
var userChoice = "";
var userAlreadyChoices = [];
var hasWon = false;
var selectedMines = false;
var step = 0;

//USER selection with prompt
while(!hasWon && !selectedMines){
  if(userAlreadyChoices.length == ROUNDS){
    hasWon = true;
  }else{
    userChoice = parseInt(prompt("Inserisci un numero da " + MIN_OPTION + " a " + MAX_OPTION));
    step++
    if(userChoice > MAX_OPTION){
      alert("Sei stupido? PUOI INSERIRE MASSIMO NUMERI FINO A " + MAX_OPTION)
    }else if(userChoice < MIN_OPTION){
      alert("Imbecille non puoi andare in negativo!");
    }else{
      if(!checkArray(userChoice,userAlreadyChoices)){
        if(checkArray(userChoice,mines)){
          alert("Mina presa, sei una pippa!")
          selectedMines = true;
        }
        userAlreadyChoices.push(userChoice);
      }else{
        alert("Numero già inserito, riprova");
      }
    }
  }
}

if(hasWon){
  alert("Sei fortissimo, perchè non ti giochi i numeri al superenalotto?")
  alert("Hai vinto con un punteggio di " + userAlreadyChoices.length + " punti ed hai effettuato " + step + " mosse.")
}
});
