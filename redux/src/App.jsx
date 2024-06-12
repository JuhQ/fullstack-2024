import { useEffect } from "react"
import { useDispatch } from "react-redux"
import FilterButtons from "./components/FilterButtons"
import ListNotes from "./components/ListNotes"
import NewNote from "./components/NewNote"
import { setNotes } from './reducers/noteReducer'
import noteService from './services/notes'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const getNotes = async () => {
      dispatch(setNotes(await noteService.getAll()))
    }

    getNotes()
  }, [dispatch])

  return (
    <>
      <NewNote />
      <FilterButtons />
      <ListNotes />
    </>
  )
}


export default App