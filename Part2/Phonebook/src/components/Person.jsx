const Person = ({ person, removeButtons }) => (
<div>
{person.name} {person.number}
<button type="button" onClick={removeButtons}>delete</button>
</div>
)

export default Person