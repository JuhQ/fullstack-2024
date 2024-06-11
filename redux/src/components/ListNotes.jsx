import { useDispatch, useSelector } from "react-redux"
import { toggleImportanceOf } from "../reducers/noteReducer"
import Note from './Note'

const notesSelector = ({ filter, notes }) => {
    if (filter === "ALL") {
        return notes
    }

    if (filter === "IMPORTANT") {
        return notes.filter((note) => note.important)
    }

    return notes.filter((note) => !note.important)
}

const ListNotes = () => {
    const dispatch = useDispatch()
    const notes = useSelector(notesSelector)

    return (
        <ul>
            {notes.map(note =>
                <Note
                    key={note.id}
                    note={note}
                    handleClick={() =>
                        dispatch(toggleImportanceOf(note.id))
                    }
                />
            )}
        </ul>
    )
}

export default ListNotes