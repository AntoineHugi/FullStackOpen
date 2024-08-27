const Person = ({ person, removeButtons }) => (
<div>
{person.name} {person.number}
<button type="button" onClick={removeButtons} value={person.id}>delete</button>
</div>
)

export default Person