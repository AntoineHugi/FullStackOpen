const PhoneBookCheck = (persons, newName, newNumber) => {
    let checkName = false
    let checkNumber = false
    for (let i = 0; i < persons.length; i++) {
        if (persons[i].name === newName) {
            checkName = true
        }
        if (persons[i].number === newNumber) {
            checkNumber = true
        }
    }
    return {checkName, checkNumber}
}

export default PhoneBookCheck