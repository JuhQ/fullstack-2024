const generateId = () =>
    Number((Math.random() * 1000000).toFixed(0))

export const createNote = (content) => ({
    type: 'NEW_NOTE',
    payload: {
        content,
        important: false,
        id: generateId()
    }
})

export const toggleImportanceOf = (id) => ({
    type: "TOGGLE_IMPORTANCE",
    payload: { id }
})

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
  ]


const noteReducer = (state = initialState, action) => {
    console.log("action", action)
    if (action.type === 'NEW_NOTE') {
        return state.concat(action.payload)
    }

    if (action.type === "TOGGLE_IMPORTANCE") {
        return state.map((note) => {
            if (note.id === action.payload.id) {
                return { ...note, important: !note.important }
            }

            return note
        })
    }

    return state
}

export default noteReducer