const CreateNewPerson = (persons, newName, newNumber) => {
    const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
    }
    return (
        newPerson
    )
}

export default CreateNewPerson