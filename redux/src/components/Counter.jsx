import { useDispatch, useSelector } from "react-redux"


const Counter = () => {
    const count = useSelector((state) => state.counter)
    const dispatch = useDispatch()

    return (
        <div>
            Count: {count}
            <br />

            <button
                onClick={() =>
                    dispatch({ type: 'INCREMENT' })
                }
            >
                plus
            </button>
            <button
                onClick={() =>
                    dispatch({ type: 'DECREMENT' })
                }
            >
                minus
            </button>
            <button
                onClick={() =>
                    dispatch({ type: 'ZERO' })
                }
            >
                zero
            </button>
        </div>
    )
}

export default Counter