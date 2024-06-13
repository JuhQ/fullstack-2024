import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createNote, getNotes, updateNote } from "./requests"
import { useState } from "react"
import Counter from "./components/Counter"

const App = () => {
  const [content, setContent] = useState("")
  const queryClient = useQueryClient()
  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes
  })


  const newNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: (note) => {
      const notes = queryClient.getQueryData(["notes"])
      queryClient.setQueryData(["notes"], notes.concat(note))
      //queryClient.invalidateQueries({ query: ['notes'] })
    }
  })

  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: (updateNote) => {
      const idString = String(updateNote.id)

      const notes = queryClient.getQueryData(["notes"])
      const updatedNotes = notes.map((note) => {
        if (String(note.id) === idString) {
          return { ...note, important: !note.important }
        }

        return note
      })
      queryClient.setQueryData(["notes"], updatedNotes)
      //queryClient.invalidateQueries({ queryKey: ['notes'] })
    }
  })

  const addNote = async (event) => {
    event.preventDefault()
    newNoteMutation.mutate({ content, important: true })
    setContent("")
  }

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({ ...note, important: !note.important })
  }

  if (result.isLoading) {
    return <div>Loading data...</div>
  }

  if (result.isError) {
    console.log("result", result)
    return <div>Error happened</div>
  }

  const notes = result.data

  return (
    <div>
      <h2>Notes app</h2>

      <Counter />
      <Counter />
      <Counter />
      <Counter />

      <form onSubmit={addNote}>
        <input value={content} onChange={(event) => {
          setContent(event.target.value)
        }} />
        <button type="submit">add</button>
      </form>
      {notes.map(note =>
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content}
          <strong> {note.important ? 'important' : ''}</strong>
        </li>
      )}
    </div>
  )
}

export default App