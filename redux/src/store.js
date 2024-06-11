import { createStore } from 'redux'
// import counterReducer from './reducer'
import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)

export default store