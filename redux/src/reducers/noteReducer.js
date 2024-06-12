import { createSlice } from "@reduxjs/toolkit"
import noteService from '../services/notes'

const noteSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
        appendNote(state, action) {
            state.push(action.payload)
        },
        setNotes(state, action) {
            return action.payload
        }
    }
})

export const { appendNote, setNotes } = noteSlice.actions

export const initializeNotes = () =>
    async (dispatch) =>
        dispatch(setNotes(await noteService.getAll()))

export const createNote = content => {
    return async dispatch => {
        const newNote = await noteService.createNew(content)
        dispatch(appendNote(newNote))
    }
}

export const toggleImportanceOf = (id) => {
    const idString = String(id)
    return async (dispatch, getState) => {
        const { notes } = getState()
        const note = notes.find((note) => String(note.id) === idString)
        if (note) {
            await noteService.toggleImportanceOf(note)

            const updateNotes = notes.map((note) => {
                if (String(note.id) === idString) {
                    return { ...note, important: !note.important }
                }

                return note
            })

            dispatch(setNotes(updateNotes))
        }
    }
}

export default noteSlice.reducer
