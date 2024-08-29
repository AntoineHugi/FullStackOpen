const SearchForm = ({ value, onChange }) => {
    return(
        <form>
            <div>Search for a country:
                <input
                    value={value}
                    onChange={onChange}
                />
            </div>
        </form>
    )
}

export default SearchForm