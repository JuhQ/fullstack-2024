import { createSlice } from "@reduxjs/toolkit"

const noteSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
        toggleImportanceOf(state, action) {
            const id = String(action.payload)
            return state.map((note) => {
                if (String(note.id) === id) {
                    return { ...note, important: !note.important }
                }

                return note
            })
        },
        appendNote(state, action) {
            state.push(action.payload)
        },
        setNotes(state, action) {
            return action.payload
        }
    }
})

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions

export default noteSlice.reducer
