var strWord = "";
var strOutput = "";
var strOutput2 = "";
var strLettersGuessed = "";
var strLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var numLetters = 0;
var numLettersCorrect = 0;
var numGuess = 1;
var numIncorrectGuesses = 0;
var numMaxGuesses = 0;
var numTokens = 100;

function start(){
  numLetters = 0;
  numLettersCorrect = 0;
  strLettersGuessed = "";
  strOutput = "";
  strOutput2 = "";
  let words = ["Heads or Tails?", "Guesswork", "Estimation", "Guessing Game", "Educated Guess", "Put Two and Two Together", "Think", "Overestimate", "Dog", "Clap-On Clap-Off"];
  strWord = words[Math.floor((Math.random() * (words.length)))];
  strWord = words[0];
  for(i=0;i<=strWord.length-1;i++){
    if(strLetters.indexOf(strWord[i]) != -1){
      strOutput += "_ ";
      numLetters += 1;
    }else{
      strOutput += strWord[i] + " ";
    }
  }
  numMaxGuesses = 15;
  numGuess = 1;
  numTokens = 100;
  numBet = 0;
  document.getElementById('bet').value = null;
  document.getElementById('word').value = null;
  document.getElementById('guessb').disabled = false;
  document.getElementById('guessw').disabled = false;
  document.getElementById('restart').hidden = true;
  document.getElementById('guesses').innerHTML = numGuess;
  document.getElementById('guessesI').innerHTML = numIncorrectGuesses + "/" + numMaxGuesses;
  document.getElementById('tokens').innerHTML = numTokens;
  document.getElementById('letters').innerHTML = strLettersGuessed;
  document.getElementById('output').innerHTML = strOutput;
  document.getElementById('output2').innerHTML = strOutput2;
  updateSB(-1);
}

function updateBet(val){
  document.getElementById('betN').innerHTML = val * numGuess;
}

function updateSB(lett){
  let op = document.getElementById("guess").getElementsByTagName("option");
  for (i = 0; i < op.length; i++) {
    if (op[i].value.toUpperCase() == lett) {
      op[i].disabled = true;
      op[i].style.backgroundColor = "#ff0000";
      for(u = 0; u < 26; u++){
        if(!op[u].disabled){
          document.getElementById("guess").selectedIndex = u;
          break
        }
      }
    }else if (lett == -1) {
      op[i].disabled = false;
      op[i].style.backgroundColor = "#00ff00";
      if(i == 0)
        document.getElementById("guess").selectedIndex = 0;
    }
  }
}

function trimWord(word){
  let w2 = "";
  for(i = 0; i < word.length; i++){
    if(strLetters.indexOf(word[i]) != -1 || word[i] == " ")
      w2 += word[i];
  }
  return w2;
}

function guess(){
  let strLetter = document.getElementById('guess').value.toUpperCase();
  let boolSameGuess = false;
  let boolCorrectGuess = false;
  let numBet = document.getElementById('bet').value;
  for(i=0;i<strLettersGuessed.length;i++){
    y = strLettersGuessed.charAt(i).toUpperCase()
    if(strLetter==y){
      boolSameGuess = true;
      break
    }
  }
  if(numBet*numGuess > numTokens){
    strOutput2 = "Your bet can't be that high, Try Again!";
  }else if(numBet <= 0){
    strOutput2 = "Your bet can't be 0 or less, Try Again!";
  }else if(boolSameGuess){
    strOutput2 = "You Already Guessed That Letter, Try Again!";
  }else{
    strLettersGuessed += strLetter;
    for(i=0;i<strWord.length;i++){
      if(strLetter.toUpperCase() == strWord.charAt(i).toUpperCase()){
        strOutput = strOutput.substr(0, i*2) + strWord.charAt(i) + " " + strOutput.substr(i*2 + 2);
        numLettersCorrect++
        boolCorrectGuess = true;
      }
    }
    if(boolCorrectGuess){
      strOutput2 = "Correct Guess!";
      numTokens += (numGuess * numBet);
      numGuess++
      updateSB(strLetter);
    }else{
      strOutput2 = "Incorrect Guess!";
      numTokens -= (numGuess * numBet);
      numGuess++
      numIncorrectGuesses++
      updateSB(strLetter);
    }
    if(numLettersCorrect>=numLetters){
      strOutput2 = "You Win!";
      document.getElementById('guessb').disabled = true;
      document.getElementById('guessw').disabled = true;
      document.getElementById('restart').hidden = false;
    }
  }
  if(numTokens <= numGuess){
    strOutput2 = "You Ran Out Of Tokens, The Word Was " + strWord;
    document.getElementById('guessb').disabled = true;
    document.getElementById('guessw').disabled = true;
    document.getElementById('restart').hidden = false;
  }else if(numIncorrectGuesses > numMaxGuesses){
    numIncorrectGuesses--
    strOutput2 = "You Ran Out Of Guesses, The Word Was " + strWord;
    document.getElementById('guessb').disabled = true;
    document.getElementById('guessw').disabled = true;
    document.getElementById('restart').hidden = false; 
  }
  document.getElementById('guesses').innerHTML = numGuess;
  document.getElementById('guessesI').innerHTML = numIncorrectGuesses + "/" + numMaxGuesses;
  document.getElementById('tokens').innerHTML = numTokens;
  document.getElementById('letters').innerHTML = strLettersGuessed;
  document.getElementById('output').innerHTML = strOutput;
  document.getElementById('output2').innerHTML = strOutput2;
  updateBet(numBet);
}

function guessWord(){
  let strGuess = document.getElementById('word').value.toUpperCase();
  if(strGuess==trimWord(strWord).toUpperCase() || strGuess==strWord.toUpperCase()){
    strOutput2 = "You Win";
    for(i=0;i<strWord.length;i++){  
      y = strWord.charAt(i);
      strOutput = strOutput.substr(0, i*2) + y + " " + strOutput.substr(i*2 + 2);
    }
    document.getElementById('guessb').disabled = true;
    document.getElementById('guessw').disabled = true;
    document.getElementById('restart').hidden = false;
  }
  else{
    strOutput2 = "You Lose, The Word Was " + strWord;
    document.getElementById('guessb').disabled = true;
    document.getElementById('guessw').disabled = true;
    document.getElementById('restart').hidden = false;
  }
  document.getElementById('guesses').innerHTML = numGuess;
  document.getElementById('guessesI').innerHTML = numIncorrectGuesses + "/" + numMaxGuesses;
  document.getElementById('output').innerHTML = strOutput;
  document.getElementById('output2').innerHTML = strOutput2;
}