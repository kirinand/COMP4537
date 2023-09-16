import { constants } from "./constants.js"
import { setLocalStorage } from "./utils.js"

export class Note {
  constructor(id=Date.now(), content="", mode="write") {
    this.id = id
    this.content = content
    this.textarea = this.createTextarea(mode)
    this.removeBtn = this.createRemoveBtn()
    this.domElement = this.createDOMElement(mode)
  }

  createTextarea = (mode) => {
    const textarea = document.createElement("textarea")
    textarea.value = this.content
    textarea.classList.add("form-control")
    if (mode == "read") {
      textarea.disabled = true
    } else {
      textarea.addEventListener("input", (e) => {
        this.content = e.target.value
      })
    }
    return textarea
  }

  createRemoveBtn = () => {
    const btn = document.createElement("button")
    btn.innerText = constants.REMOVE_BTN_LABEL
    btn.type = "button"
    btn.classList.add("btn", "btn-danger")
    btn.addEventListener("click", () => {
      this.domElement.remove()
      this.removeFromLocalStorage()
    })
    return btn
  }

  createDOMElement(mode) {
    const container = document.createElement("div")
    container.id = constants.NOTE_ID_NS + this.id
    container.classList.add("d-flex", "align-items-end", "pb-2")
    container.appendChild(this.textarea)
    if (mode == "write")
      container.appendChild(this.removeBtn)
    return container
  }

  saveToLocalStorage = () => {
    const storedNotes = localStorage.getItem(constants.LS_NOTES_KEY)
    let notesArr = JSON.parse(storedNotes)
    if (!Array.isArray(notesArr)) {
      notesArr = []
    }
    notesArr.push(new NoteItem(this.id, this.content))
    setLocalStorage(notesArr)
  }

  removeFromLocalStorage = () => {
    const storedNotes = localStorage.getItem(constants.LS_NOTES_KEY)
    const notesArr = JSON.parse(storedNotes)
    if (Array.isArray(notesArr)) {
      notesArr.filter(note => note.id != this.id)
      setLocalStorage(notesArr)
    }
  }
}

export class NoteItem {
  constructor(id, content) {
    this.id = id
    this.content = content
  }
}