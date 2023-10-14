const BACKEND_URL = 'https://kirin-4537.onrender.com/api'

const REQ_FAIL_MSG = 'Request failed'
const INVALID_DATA_MSG = 'Invalid data from server'
const INVALID_QUERY_MSG = 'Only SELECT and INSERT queries are allowed'
const EMPTY_QUERY_MSG = 'Query is empty'
const NO_PATIENT_MSG = 'No entry found'
const PATIENT_COUNT_MSG = 'Found {0} patient(s)'

const dummyQuery = () => {
  return "INSERT INTO patient (name, dateOfBirth) values \
  ('Sara Brown', '1901-01-01'), \
  ('John Smith', '1941-01-01'), \
  ('Jack Ma', '1961-01-30'), \
  ('Elon Musk', '1999-01-01');"
}

const sendQueryGet = async (query) => {
  fetch(`${BACKEND_URL}/?query=${query}`, {
    method: 'GET'
  }).then(async res => {
    return await res.json()
  }).then(resData => {
    const { data, error } = resData

    if (data && Array.isArray(data)) {
      if (data.length > 0) {
        try {
          const msg = PATIENT_COUNT_MSG.replaceAll('{0}', data.length)
          let table = 
          `<table class="table">
            <thead>
              <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Date of Birth</th>
              </tr>
            </thead>
            <tbody>`
  
          data.forEach((patient) => {
            table += 
            `<tr>
              <th scope="row">${patient.patientid}</th>
              <td>${patient.name}</td>
              <td>${patient.dateOfBirth?.split('T')[0] || ''}</td>
            </tr>`
          })
  
          table += '</tbody></table>'
  
          displayResult(msg + '<br><br>' + table)
        } catch (err) {
          console.log(err)
          displayResult(INVALID_DATA_MSG)
        }
      } else {
        displayResult(NO_PATIENT_MSG)
      }
    } else if (error) {
      displayResult(error)
    } else {
      displayResult(INVALID_DATA_MSG)
    }
  })
  .catch(err => {
    console.log(err)
    displayResult(REQ_FAIL_MSG)
  })
}

const sendQueryPost = async (query) => {
  fetch(`${BACKEND_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: query })
  }).then(async res => {
    return await res.json()
  }).then(resData => {
    const { message, error } = resData

    if (message) {
      displayResult(message)
    } else {
      displayResult(error)
    }
  })
  .catch(err => {
    console.log(err)
    displayResult(REQ_FAIL_MSG)
  })
}

const handleSubmit = async (e) => {
  const query = e.target.query?.value?.trim()

  if (!query) {
    displayResult(EMPTY_QUERY_MSG)
  } else if (query.toLowerCase().startsWith('select')) {
    sendQueryGet(query)
  } else if (query.toLowerCase().startsWith('insert')) {
    sendQueryPost(query)
  } else {
    displayResult(INVALID_QUERY_MSG)
  }
  e.preventDefault()
}

const insertDummy = async () => {
  const query = dummyQuery()
  sendQueryPost(query)
}

const displayResult = (result=REQ_FAIL_MSG) => {
  const resultDisplay = document.getElementById('result')
  resultDisplay && (resultDisplay.innerHTML = result)
}

document.getElementById('form')?.addEventListener('submit', handleSubmit)
document.getElementById('insert-dummy-btn')?.addEventListener('click', insertDummy)