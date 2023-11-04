import { constants, config } from './constants.js'
import { 
  getLanguages, 
  getEntry, 
  createEntry, 
  updateEntry, 
  deleteEntry 
} from './services.js'

let buttonClicked

const storeWord = async (word, definition, wordLanguage, definitionLanguage) => {
  try {
    const data = await createEntry(word, definition, wordLanguage, definitionLanguage)
    const { error, message } = data
    displayMessage(message || error)
  } catch (err) {
    console.log(err)
  }
}

const updateWord = async (word, definition) => {
  try {
    const data = await updateEntry(word, definition)
    const { error, message } = data
    displayMessage(message || error)
  } catch (err) {
    console.log(err)
  }
}

const deleteWord = async (word) => {
  try {
      const data = await deleteEntry(word)
      const { error, message } = data
      displayMessage(message || error)
    } catch (err) {
      console.log(err)
    }
}

const onSearchSubmit = async (e) => {
  e.preventDefault()
  const word = e.target.search?.value.trim()
  const definitionText = document.getElementById('definition')
  definitionText.innerHTML = ''

  if (!validateWord(word)) {
    displayMessage(constants.INVALID_WORD_MSG)
  } else {
    try {
      const data = await getEntry(word)
      const { entry, message, error } = data

      if (entry) {
        const htmlStr = JSON.stringify(entry, null, 2).replace(/\n/g, '<br>')
        definitionText.innerHTML = htmlStr
      } else {
        displayMessage(message || error)
      }
    } catch (err) {
      console.log(err)
    }
  }
}

const validateWord = (word) => {
  return word && !(/[0-9\s]/).test(word)
}

const validateDefinition = (definition) => {
  return definition && !(/[0-9]/).test(definition)
}

const loadLanguageOptions = async () => {
  try {
    const data = await getLanguages()
    const { languages, error } = data

    if (error) {
      throw new Error(error)
    }

    const wordLangSelector = document.getElementById('word-language')
    const defLangSelector = document.getElementById('definition-language')

    languages.forEach(obj => {
      const option = document.createElement('option')
      option.value = obj.code
      option.innerHTML = obj.name
      const optionClone = option.cloneNode(true)
      wordLangSelector.appendChild(option)
      defLangSelector.appendChild(optionClone)
    })

  } catch (err) {
    console.log(err)
  } 
}

const onStoreSubmit = async (e) => {
  e.preventDefault()
  const word = e.target.word?.value?.trim()
  const definition = e.target.definition?.value?.trim()
  const wordLanguage = e.target['word-language']?.value
  const definitionLanguage = e.target['definition-language']?.value

  if (!validateWord(word)) {
    displayMessage(constants.INVALID_WORD_MSG)
    return
  }

  if (buttonClicked === 'add') {

    if (!validateDefinition(definition)) {
      displayMessage(constants.INVALID_DEF_MSG)
      return
    }

    try {
      const data = await getEntry(word)
      const { entry } = data
  
      if (!entry) {

        if (!wordLanguage || !definitionLanguage) {
          displayMessage(constants.SELECT_LANG_MSG)
          return
        } else if (wordLanguage === definitionLanguage) {
          displayMessage(constants.SELECT_DIFF_LANG_MSG)
          return
        }

        storeWord(word, definition, wordLanguage, definitionLanguage)
      } else {
        updateWord(word, definition)
      }
    } catch (err) {
      console.log(err)
    }
  } else if (buttonClicked == 'delete') {
    deleteWord(word)
  }

}

const displayMessage = (message) => {
  const messageDisplay = document.getElementById('message')
  messageDisplay && (messageDisplay.innerHTML = message)
}

document.addEventListener('DOMContentLoaded', loadLanguageOptions)
document.getElementById('search-form')?.addEventListener('submit', onSearchSubmit)
document.getElementById('store-form')?.addEventListener('submit', onStoreSubmit)
document.getElementById('add-btn')?.addEventListener('click', () => {
  buttonClicked = 'add'
})
document.getElementById('delete-btn')?.addEventListener('click', () => {
  buttonClicked = 'delete'
})