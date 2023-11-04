import { config } from './constants.js'

export const getLanguages = async () => {
  const response = await fetch(`${config.API_URL}/languages`, {
    method: 'GET',
  })
  
  return await response.json()
}

export const getEntry = async (word) => {
  const response = await fetch(`${config.API_URL}/definition/${word}`, {
    method: 'GET',
  })

  console.log(response)

  return await response.json()
}

export const createEntry = async (word, def, wordLang, defLang) => {
  const response = await fetch(`${config.API_URL}/definition`, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({
      word: word, 
      definition: def, 
      "word-language": wordLang, 
      "definition-language": defLang
    })
  })

  return await response.json()
}

export const updateEntry = async (word, def) => {
  const response = await fetch(`${config.API_URL}/definition/${word}`, {
    method: 'PATCH',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({
      word: word, 
      definition: def, 
    })
  })

  return await response.json()
}

export const deleteEntry = async (word) => {
  const response = await fetch(`${config.API_URL}/definition/${word}`, {
    method: 'DELETE',
  })

  return await response.json()
}