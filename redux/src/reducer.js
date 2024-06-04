const counterReducer = (state = 0, action) => {

    console.log("action", action)

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

export default counterReducer