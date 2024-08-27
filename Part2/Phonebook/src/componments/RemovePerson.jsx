const RemovePerson = (persons, removedId) =>  (persons.filter(person => person.id !== removedId))

export default RemovePerson