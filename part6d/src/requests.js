import axios from "axios"

const baseUrl = "http://localhost:3001/notes"

const getNotes = () =>
    axios.get(baseUrl)
        .then((res) => res.data)


const createNote = (newNote) =>
    axios.post(baseUrl, newNote)
        .then((res) => res.data)

const updateNote = (note) =>
    axios.put(`${baseUrl}/${note.id}`, note)
        .then((res) => res.data)

export { getNotes, createNote, updateNote }