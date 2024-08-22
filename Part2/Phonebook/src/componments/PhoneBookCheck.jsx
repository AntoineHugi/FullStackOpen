const PhoneBookCheck = (persons, newName, newNumber) => {
    let checkName = 0
    let checkNumber = 0
    for (let i = 0; i < persons.length; i++) {
        if (persons[i].name === newName) {
            checkName++
        }
        if (persons[i].number === newNumber) {
            checkNumber++
        }
    }
    if (checkName == 0 && checkNumber == 0) {
        return (true)
    }
    else if (checkName == 0 && checkNumber != 0) {
        alert(`the number ${newNumber} is already in the phonebook`)
        return (false)
    }
    else {
        alert(`${newName} is already in the phonebook`)
        return (false)
    }
}

export default PhoneBookCheck