import { CONSTANTS } from './constants.js'

const API_URL = 'http://localhost:8080/api'

const storeWord = async (e) => {
  const word = e.target.word?.value?.trim()
  const definition = e.target.definition?.value.trim()
  const messageDisplay = document.getElementById('message')

  if (validateWord(word) && validateDefinition(definition)) {
    fetch(`${API_URL}/definitions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ word, definition })
    })
    .then(async res => {
      const data = await res.json()
      let success = false
      
      if (res.status === 200) {
        success = true
      }

      return { success, ...data }
    })
    .then(data => {
      const { success, message, error, count } = data

      if (success) {
        messageDisplay && (messageDisplay.innerHTML = `${CONSTANTS.REQUEST_NUM}${count}<br>${message}`)
      } else {
        messageDisplay && (messageDisplay.innerHTML = error)
      }
    })
    .catch(err => {
      console.log(err)
      messageDisplay && (messageDisplay.innerHTML = err.message)
    })  
      
  } else {
    messageDisplay && (messageDisplay.innerHTML = CONSTANTS.INVALID_INPUT_MSG)
  }
  e.preventDefault()
}

const searchWord = async (e) => {
  const word = e.target.search?.value.trim()
  const messageDisplay = document.getElementById('message')
  const definitionText = document.getElementById('definition')
  const wordText = document.getElementById('word')

  if (validateWord(word)) {
    fetch(`${API_URL}/definitions/?word=${word}`, {
      method: 'GET',
    })
    .then(async res => {
      const data = await res.json()
      let success = false

      if (res.status === 200) {
        success = true
      }

      return { success, ...data }
    })
    .then(data => {
      const { success, word, definition, error, count } = data

      if (success) {
        messageDisplay && (messageDisplay.innerHTML = `${CONSTANTS.REQUEST_NUM}${count}`)
        definitionText && (definitionText.innerHTML = `<b>${word}</b>: ${definition}`)
      } else {
        messageDisplay && (messageDisplay.innerHTML = error)
        definitionText && (definitionText.innerHTML = '')
      }
    })
    .catch(err => {
      console.log(err)
      messageDisplay && (messageDisplay.innerHTML = err.message)
      definitionText && (definitionText.innerHTML = '')
    })
  } else {
    messageDisplay && (messageDisplay.innerHTML = CONSTANTS.INVALID_WORD_MSG)
    definitionText && (definitionText.innerHTML = '')
  }
  e.preventDefault()
}

const validateWord = (word) => {
  return word && !(/[0-9\s]/).test(word)
}

const validateDefinition = (definition) => {
  return definition && !(/[0-9]/).test(definition)
}

document.getElementById('search-form')?.addEventListener('submit', searchWord)
document.getElementById('store-form')?.addEventListener('submit', storeWord)