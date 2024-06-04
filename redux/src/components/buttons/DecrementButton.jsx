import store from "../../store"

const DecrementButton = () => {
    return (<button
        type="button"
        onClick={() => store.dispatch({ type: 'DECREMENT' })}
    >
        Dec: {store.getState()}
    </button>
    )
}

export default DecrementButton