import { createSlice } from "@reduxjs/toolkit"

const generateId = () =>
    Number((Math.random() * 1000000).toFixed(0))

const initialState = [
    {
      content: 'reducer defines how redux store works',
      important: true,
      id: 1,
    },
    {
      content: 'state of store can contain any data',
      important: false,
      id: 2,
    },
    {
      content: 'redux toolkit',
      important: false,
      id: 3,
    },
  ]


const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        createNote(state, action) {
            const content = action.payload
            state.push({
                content,
                important: false,
                id: generateId()
            })
        },
        toggleImportanceOf(state, action) {
            const id = Number(action.payload)
            return state.map((note) => {
                if (note.id === id) {
                    return { ...note, important: !note.important }
                }

                return note
            })
        }
    }
})

export const { createNote, toggleImportanceOf } = noteSlice.actions

export default noteSlice.reducer
