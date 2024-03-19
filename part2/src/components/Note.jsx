const Note = ({ note, toggleImportance, deleteNote }) => {
    const label = note.important
        ? 'make not important' : 'make important'

    return (
        <li>
            {note.content}
            <button onClick={toggleImportance}>{label}</button>
            <button className="poisto" onClick={deleteNote}>X</button>
        </li>
    )
}

export default Note