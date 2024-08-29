import { useState, useEffect } from 'react'
import CreateNewPerson from './components/CreateNewPerson'
import PhoneBookCheck from './components/PhoneBookCheck'
import Person from './components/Person'
import personsService from './services/persons'
import RemovePersonConfirmation from './components/RemovePersonCofirmation'
import RemovePerson from './components/RemovePerson'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameSearch, setNameSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [errorMessage])

  const searchPerson = (event) => {
    event.preventDefault()
    setNameSearch(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const { checkName, checkNumber } = PhoneBookCheck(persons, newName, newNumber)
    if (!checkName && !checkNumber) {
      personsService
        .create(CreateNewPerson(newName, newNumber))
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setErrorMessage('This Person has been successfully added')
        })
    } else if (checkName && !checkNumber) {
      if (confirm(`${newName} is already in the phonebook, do you want to update their number?`)) {
        const updatePerson = persons.find(person => person.name === newName)
        const changedPerson = { ...updatePerson, number: newNumber }
        personsService
          .update(updatePerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
          })
          .catch(error => {
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setErrorMessage(`Information on ${newName} was already removed from the server`)
          })

      }
    }
    else {
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
      setErrorMessage('This number already exists in the Phonebook')
    }
    setNewName('')
    setNewNumber('')
  }
  const removePersonButton = id => {
    console.log('button pressed', persons)
    if (RemovePersonConfirmation(persons, id)){
      setPersons(RemovePerson(persons, id))
      personsService
        .removeEntry(id)
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <form>
        <div>search by name:
          <input
            value={nameSearch}
            onChange={searchPerson}
          />
        </div>
      </form>
      <h2>Add to the Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>name:
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>number:
          <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.filter(person => person.name.toLowerCase().includes(nameSearch.toLowerCase())).map(person =>
        <Person 
          key={person.id} 
          person={person} 
          removeButtons={()=>removePersonButton(person.id)} 
        />
      )}
    </div>
  )
}

export default App