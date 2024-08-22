import Person from './Person'

const PhoneBookFilter = (persons, nameSearch) => {
    return (
        <div>
            {persons.filter(person => person.name.toLowerCase().includes(nameSearch)).map(person =>
                <div key={person.id}>
                    <Person person={person} />
                </div>
            )}
        </div>
    )
}

export default PhoneBookFilter