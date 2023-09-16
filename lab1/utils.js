import { Note, NoteItem } from "./note.js"
import { constants } from "./constants.js"

export const populateDOM = (mode="write") => {
  const storedNotes = localStorage.getItem(constants.LS_NOTES_KEY)
  const notesArr = JSON.parse(storedNotes)
  if (Array.isArray(notesArr)) {
    notesArr.forEach(noteData => {
      const note = new Note(noteData.id, noteData.content, mode)
      addNoteToDOM(note)
    })
  }
}

export const addNoteToDOM = (note) => {
  if (!note) {
    note = new Note()
    note.saveToLocalStorage()
  }
  const container = document.getElementById("notes-container")
  container.appendChild(note.domElement)
}

export const saveNotesToLocalStorage = () => {
  const container = document.getElementById("notes-container")
  const noteDivsArr = Array.from(container.children)
  const notesArr = noteDivsArr.map(noteDiv => {
    const id = noteDiv.id.split("-")[1]
    const content = noteDiv.querySelector("textarea").value
    return new NoteItem(id, content)
  })
  if (Array.isArray(notesArr))
    setLocalStorage(notesArr)
}

export const setLocalStorage = (notesArr) => {
  localStorage.setItem(constants.LS_NOTES_KEY, JSON.stringify(notesArr))
  localStorage.setItem(constants.LS_TIMESTAMP_KEY, new Date().toLocaleTimeString('en-US'))
}

export const displayTimestamp = () => {
  const timestamp = localStorage.getItem(constants.LS_TIMESTAMP_KEY)
  if (timestamp) {
    const div = document.getElementById("timestamp")
    div.innerText = constants.TIME_DP_NS + timestamp
  }
}
