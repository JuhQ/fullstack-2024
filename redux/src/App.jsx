import { useEffect } from "react"
import { useDispatch } from "react-redux"
import FilterButtons from "./components/FilterButtons"
import ListNotes from "./components/ListNotes"
import NewNote from "./components/NewNote"
import { initializeNotes } from './reducers/noteReducer'
import Counter from "./components/Counter"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeNotes())
  }, [dispatch])

  return (
    <>
      <NewNote />
      <FilterButtons />
      <ListNotes />
      <Counter />
    </>
  )
}


export default App