let typingText = document.querySelector(".typing__text");
let input = document.querySelector(".wrapper .input__field");
let timeTag = document.querySelector(".time span b");
let mistakeCount = document.querySelector(".mistake span");
let wpmTag = document.querySelector(".wpm span");
let cpmTag = document.querySelector(".cpm span");
let tryAgainBtn = document.querySelector(".button")

let timer,
  maxTime = 60,
  timeLeft = maxTime;

let charIndex = mistake = isTyping = 0;

function randomParagraph() {
  let randomPara = Math.floor(Math.random() * paragraphs.length);
  paragraphs[randomPara].split("").forEach((para) => {
    let spanTag = `<span>${para}</span>`; 
    typingText.innerHTML += spanTag;
  });

  document.addEventListener("keydown", () => input.focus());
  typingText.addEventListener("click", () => input.focus());
}

function initTyping() {
  const characters = typingText.querySelectorAll("span");
  let typedCharacter = input.value.split("")[charIndex];
 if(charIndex < characters.length -1 && timeLeft > 0){
  if (!isTyping) {
    timer = setInterval(initTimer, 1000);
    isTyping = true;
  }

  if (typedCharacter == null) {
    charIndex--;
    if (characters[charIndex].classList.contains("incorrect")) {
      mistake--;
    }

    characters[charIndex].classList.remove("correct", "incorrect");
  } else {
    if (characters[charIndex].innerText === typedCharacter) {
      characters[charIndex].classList.add("correct");
    } else {
      mistake++;
      characters[charIndex].classList.add("incorrect");
    }

    charIndex++;
  }

  characters.forEach((span) => span.classList.remove("active"));
  characters[charIndex].classList.add("active");
  var wpm = Math.round((((charIndex - mistake)/5)/(maxTime -timeLeft))*60);
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0: wpm;
  mistakeCount.innerHTML = mistake;
  wpmTag.innerHTML = wpm;
  cpmTag.innerText = charIndex - mistake;
 }else{
   input.value ="";
    clearInterval(timer);
 }
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
  } else {
    clearInterval(timer);
  }
}

function resetGame(){
  randomParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = mistakes = isTyping = 0;
  input.value = "";
  timeTag.innerText = timeLeft;
  wpmTag.innerText = 0;
  mistakeCount.innerText = 0;
  cpmTag.innerText = 0;

}
randomParagraph();
input.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
