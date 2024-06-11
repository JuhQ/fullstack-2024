import NewNote from "./components/NewNote"
import ListNotes from "./components/ListNotes"
import FilterButtons from "./components/FilterButtons"

const App = () => {
  return (
    <>
      <NewNote />
      <FilterButtons />
      <ListNotes />
    </>
  )
}


export default App