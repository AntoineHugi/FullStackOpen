import { useState, useEffect } from 'react'
import CreateNewPerson from './componments/CreateNewPerson'
import PhoneBookCheck from './componments/PhoneBookCheck'
import Person from './componments/Person'
import personsService from './services/persons'
import RemovePersonConfirmation from './componments/RemovePersonCofirmation'
import RemovePerson from './componments/RemovePerson'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameSearch, setNameSearch] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

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

  const removeButtons = (event) => {
    event.preventDefault()
    if (RemovePersonConfirmation(persons, event.target.value)) {
      setPersons(RemovePerson(persons, event.target.value))
      personsService
        .removeEntry(event.target.value)
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const { checkName, checkNumber } = PhoneBookCheck(persons, newName, newNumber)
    if (!checkName && !checkNumber) {
      personsService
        .create(CreateNewPerson(newName, newNumber))
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
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
      }
    } else {
      alert(`the number ${newNumber} is already in the phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.filter(person => person.name.toLowerCase().includes(nameSearch)).map(person =>
        <div key={person.id}>
          <Person person={person} />
          <button type="button" onClick={removeButtons} value={person.id}>delete</button>
        </div>
      )}
    </div>
  )
}

export default App