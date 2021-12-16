let deckId= 0
let remainingCardsonDeck = 52
let scoreComputer = 0
let scorePlayer = 0

let pcCard = 0
let plCard=0

const newDeck = document.getElementById("new-deck")
const remainingCards= document.getElementById("remaining-cards")
const newCard = document.getElementById("draw-btn")
const pcHand = document.getElementById("pc-hand")
const plHand= document.getElementById("pl-hand")
const roundStatus =document.getElementById("round-status")

newCard.style.display="none"

newDeck.addEventListener("click",bringNewDeck)


function bringNewDeck(){

    newCard.style.display="block"
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then (res => res.json())
    .then(data => {
  console.log(data)
  deckId= data.deck_id
  remainingCards.textContent = `Übrige Spielkarten : 52`
  console.log(deckId)

  scoreComputer=0
  scorePlayer=0


    })
}
newCard.addEventListener("click", () => { 

fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
.then(res => res.json())
.then(data=>{
     
  remainingCardsonDeck = data.remaining
  remainingCards.textContent = `Übrige Spielkarten : ${remainingCardsonDeck}`
    console.log(data)
 console.log(data.cards[0].image)
 
  pcHand.innerHTML = `<p class="text"> Computer Score ist : ${scoreComputer}</p>
  <img class="img-card" src="${data.cards[0].image}"/> `
  
  

  plHand.innerHTML = `<img class="img-card" src="${data.cards[1].image}"/> 
  <p class="text"> Player Score ist : ${scorePlayer}</p>
  `
// translating  API card value to integer for PC cards
pcCard=data.cards[0].value
plCard= data.cards[1].value
   
if(pcCard === "JACK"){
    pcCard=11
}
else if (pcCard === "QUEEN"){
    pcCard=12
}
else if (pcCard === "KING"){
    pcCard=13
}
else if (pcCard === "ACE"){
    pcCard=14
}
// translating  API card value to integer for PL cards

if(plCard === "JACK"){
    plCard=11
}
else if (plCard === "QUEEN"){
    plCard=12
}
else if (plCard === "KING"){
    plCard=13
}
else if (plCard === "ACE"){
    plCard=14
}
console.log(pcCard) 
console.log(plCard)
 

whoIsWinning()
whoWon()
})



})

function whoIsWinning(){
if (pcCard > plCard){
    roundStatus.textContent =`
    Der Computer siegt`
    scoreComputer++
}
else if (plCard > pcCard){
    roundStatus.textContent = `Der Player siegt`
    scorePlayer++
}
else{
    roundStatus.textContent = `Beide haben den gleichen Wert - es ist ein Unentschieden`

    
}


}

function whoWon(){
    if(remainingCardsonDeck ===0 && scorePlayer > scoreComputer){
        roundStatus.textContent =`
        Der Player hat  gewonnen`
        newCard.style.display="none"

    }
    else if(remainingCardsonDeck ===0 && scorePlayer < scoreComputer) {
        roundStatus.textContent =`
        Der Computer hat  gewonnen`
        newCard.style.display="none"
    }
}