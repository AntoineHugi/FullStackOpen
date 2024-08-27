const RemovePersonConfirmation = (persons, removedId) => (confirm(`are you sure you want to delete ${persons.filter(person => person.id === removedId)[0].name} ?`))


export default RemovePersonConfirmation