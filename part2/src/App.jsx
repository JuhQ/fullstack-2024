import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState(null)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    noteService
      .getAll()
      .then(setNotes)
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    setError("")

    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    }

    noteService
      .create(noteObject)
      .then(() => {
        setNotes(notes.concat(noteObject))
        setNewNote('')
      })
      .catch((error) => setError(error.message))
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
    setError("")
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    setError("")

    noteService
      .update(id, changedNote)
      .then(data => {
        setNotes(notes.map(note => note.id !== id ? note : data))
      })
      .catch(() => {
        setNotes(notes.filter(n => n.id !== id))
        setError(`the note '${note.content}' was already deleted from server`)
      })
  }

  const deleteNote = (id) =>
    noteService
      .delete(id)
      .then(() => {
        setNotes(notes.filter(n => n.id !== id))
      })


  if (!notes) {
    return null;
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)


  return (
    <div>
      <h1>Notes</h1>

      {error.length > 0 && <Notification message={`Virhe tapahtui! ${error}`} />}

      <div>
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
        >
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() =>
              toggleImportanceOf(note.id)
            }
            deleteNote={() => deleteNote(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App