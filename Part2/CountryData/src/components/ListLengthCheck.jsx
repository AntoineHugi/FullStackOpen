const ListLengthCheck = (countryListLength) => {
    let isListOversized = false
    let onlyOneCountry = false
    let isListEmpty = false
    if (countryListLength > 10) {
        isListOversized = true
    } 
    if (countryListLength === 1){
        onlyOneCountry = true
    }
    if (countryListLength === 0){
        isListEmpty = true
    }
    return {isListOversized, onlyOneCountry, isListEmpty}
}

export default ListLengthCheck