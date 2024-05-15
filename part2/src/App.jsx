import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'
import login from './services/login'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'

const App = () => {
  const [notes, setNotes] = useState(null)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [error, setError] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

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

  const addNote = (event) => {
    event.preventDefault()
    setError("")

    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    }

    noteService
      .create(noteObject)
      .then((result) => {
        setNotes(notes.concat(result))
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


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loginResult = await login({ username, password })
      const { token } = loginResult

      setUser(loginResult)
      noteService.setToken(token)

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(loginResult))
      setUsername("")
      setPassword("")
      setLoginVisible(false)
    } catch (error) {
      setError(error.message)

      setTimeout(() => {
        setError("")
      }, 5000)
    }
  }

  if (!notes) {
    return null;
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>

      {!user && loginVisible && <>
        <LoginForm
          handleSubmit={handleLogin}
          handlePasswordChange={setPassword}
          handleUsernameChange={setUsername}
          username={username}
          password={password}
        />
        <button type="button" onClick={() => setLoginVisible(false)}>
          Cancel
        </button>
      </>
      }

      {!user && !loginVisible && <button type="button" onClick={() => setLoginVisible(true)}>
        Login
      </button>
      }


      {user && <div>
        <p>{user.username} logged in</p>
        <NoteForm
          addNote={addNote}
          handleNoteChange={handleNoteChange}
          newNote={newNote}
        />
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