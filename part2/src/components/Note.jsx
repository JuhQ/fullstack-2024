const Note = ({ note, toggleImportance, deleteNote }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li className="note">
      our awesome note: {note.content}
      <button onClick={toggleImportance}>{label}</button>
      <button className="poisto" onClick={deleteNote}>X</button>
    </li>
  )
}

export default Note