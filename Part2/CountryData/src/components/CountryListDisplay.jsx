const CountryListDisplay = ({ name, showButton }) => {
    return (
      <div>
        {name} 
        <button onClick={showButton}>show</button>
      </div>
    )
  }
  
  export default CountryListDisplay