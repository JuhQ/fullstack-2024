import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducer'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
    reducer: {
        notes: noteReducer,
        counter: counterReducer,
        filter: filterReducer
    }
})

export default store