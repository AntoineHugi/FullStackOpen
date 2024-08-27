const Notification = ({ message }) => {
    const notifStyle = {    
        color: 'red',    
        fontStyle: 'bold',    
        fontSize: 20  
      }
    
    if (message === null) {
      return null
    }
  
    return (
      <div className='error' style={notifStyle}>
        {message}
      </div>
    )
  }

export default Notification