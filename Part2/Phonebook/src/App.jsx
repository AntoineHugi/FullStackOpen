import { useState } from 'react'
import CreateNewPerson from './componments/CreateNewPerson'
import PhoneBookCheck from './componments/PhoneBookCheck'
import PhoneBookFilter from './componments/PhoneBookFilter'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '100-1000-100',
      id: 1
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameSearch, setNameSearch] = useState('')


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
    if (PhoneBookCheck(persons, newName, newNumber)) {
      setPersons(persons.concat(CreateNewPerson(persons, newName, newNumber)))
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
      <div>
        {PhoneBookFilter(persons, nameSearch)}
      </div>
    </div>
  )
}

export default App