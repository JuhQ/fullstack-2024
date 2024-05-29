import { useState } from 'react'
import PropTypes from 'prop-types'

const NoteForm = ({ onCreate, onError }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    onError('')

    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    }

    onCreate(noteObject)
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
    onError('')
  }

  return (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
        placeholder='write new note here'
      />
      <button type="submit">save</button>
    </form>)
}

NoteForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
}

export default NoteForm