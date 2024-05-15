import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'

const App = () => {
  const [notes, setNotes] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const [error, setError] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(setNotes)
  }, [])

  useEffect(() => {
    const loggedUserFromLocalstorage = window.localStorage.getItem("loggedNoteappUser")

    if (loggedUserFromLocalstorage) {
      const userData = JSON.parse(loggedUserFromLocalstorage)
      noteService.setToken(userData.token)
      setUser(userData)
    }
  }, [])

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

      {!user && <>
        <Togglable buttonLabel="Login">
          <LoginForm onSuccess={setUser} onError={setError} />
        </Togglable>
      </>
      }


      {user && <div>
        <p>{user.username} logged in</p>
        <Togglable buttonLabel="Luo uusi muistiinpano">
          <NoteForm
            onError={setError}
            onCreate={(result) => setNotes(notes.concat(result))}
          />
        </Togglable>
      </div>
      }


      {user && <div>
        <button type="button" onClick={() => {
          window.localStorage.removeItem("loggedNoteappUser")
          setUser(null)
        }}>Logout</button>
      </div>
      }
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
    </div>
  )
}

export default App