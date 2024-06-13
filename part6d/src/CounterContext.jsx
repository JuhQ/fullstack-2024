import { createContext, useReducer } from 'react'

const counterReducer = (state, action) => {
    if (action.type === "INCREMENT") {
        return state + 1
    }

    if (action.type === 'DECREMENT') {
        return state - 1
    }

    if (action.type === 'ZERO') {
        return 0
    }

    return state
}

const CounterContext = createContext()

export const CounterContextProvider = (props) => {
    const [counter, counterDispatch] = useReducer(counterReducer, 0)

    return (
        <CounterContext.Provider value={[counter, counterDispatch]}>
            {props.children}
        </CounterContext.Provider>
    )
}


export default CounterContext