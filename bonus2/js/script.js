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
var errorAttempt = 3;

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
console.log(mines);

//USER selection
var userChoice = "";
var userAlreadyChoices = [];
var hasWon = false;
var selectedMines = false;
var step = 0;
/*
//USER selection with prompt
while(!hasWon && !selectedMines){
  if(userAlreadyChoices.length == ROUNDS){
    hasWon = true;
  }else{
    userChoice = parseInt(prompt("Inserisci un numero da " + MIN_OPTION + " a " + MAX_OPTION));
    step++
    if(userChoice > MAX_OPTION){
      alert("Sei stupido? PUOI INSERIRE UN MASSIMO DI NUMERI FINO A " + MAX_OPTION)
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
*/
if(hasWon){
  alert("Sei fortissimo, perchè non ti giochi i numeri al superenalotto?")
  alert("Hai vinto con un punteggio di " + userAlreadyChoices.length + " punti ed hai effettuato " + step + " mosse.")
}

//GUI
var bossBox = document.getElementById("boss-box");
for(var i = 1; i < MAX_OPTION + 1; i++){
  bossBox.innerHTML += '<div class="p-2 bd-highlight flex-control-custom"><button id="btnBox" class="btn btn-box btnBox" >'+i+'</button></div>';

}




document.querySelectorAll('.btnBox').forEach(item => {
  item.addEventListener('click', event => {
    userChoice = parseInt(item.innerText)
    console.log(userChoice);
    step++
    if(userChoice > MAX_OPTION){
      alert("Sei stupido? PUOI INSERIRE UN MASSIMO DI NUMERI FINO A " + MAX_OPTION)
    }else if(userChoice < MIN_OPTION){
      alert("Imbecille non puoi andare in negativo!");
    }else{
      if(!checkArray(userChoice,userAlreadyChoices)){
        if(checkArray(userChoice,mines)){
          errorAttempt--
          if(errorAttempt === 0){
            selectedMines = true;
            alert("Hai finito i tentativi, riprova!");
            item.classList.add("bg-err");
            document.querySelectorAll('.btnBox').forEach(item => {item.setAttribute("disabled","true")});
          }else{
            alert("Mina presa, sei una pippa! Ti rimangono " + errorAttempt + " tentativi");
            item.classList.add("bg-err");
          }
        }else{
        userAlreadyChoices.push(userChoice);
        item.classList.add("bg-succ");
        if(userAlreadyChoices.length == MAX_OPTION){
          alert("Hai vinto broski");
        }
      }
    }else{
        alert("Numero già inserito, riprova");
      }
    }


  })
})


});
