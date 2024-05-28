import { useState } from 'react'
import noteService from '../services/notes'
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

    noteService
      .create(noteObject)
      .then((result) => {
        onCreate(result)
        setNewNote('')
      })
      .catch((error) => onError(error.message))
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
      />
      <button type="submit">save</button>
    </form>)
}

NoteForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
}

export default NoteForm