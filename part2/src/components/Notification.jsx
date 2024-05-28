const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      <span>Virhe!</span>{message}
    </div>
  )
}

export default Notification