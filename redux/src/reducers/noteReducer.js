
const noteReducer = (state = [], action) => {
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