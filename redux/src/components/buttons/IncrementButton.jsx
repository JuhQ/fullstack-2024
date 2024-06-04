import store from "../../store"

const IncrementButton = () => {
    return (<button
        type="button"
        onClick={() => store.dispatch({ type: 'INCREMENT' })}
    >
        Inc: {store.getState()}
    </button>
    )
}

export default IncrementButton