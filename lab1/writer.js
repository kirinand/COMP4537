import { 
  addNoteToDOM, 
  populateDOM, 
  saveNotesToLocalStorage,
  displayTimestamp
} from "./utils.js"

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("add-btn").addEventListener("click", () => {
    addNoteToDOM()
  })
  populateDOM()
  displayTimestamp()
})

setInterval(saveNotesToLocalStorage, 2000)