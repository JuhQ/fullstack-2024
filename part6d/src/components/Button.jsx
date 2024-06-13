import { useContext } from "react"
import CounterContext from "../CounterContext"

const Button = ({ text, type }) => {
    const [, dispatch] = useContext(CounterContext)
    return <button onClick={() => dispatch({ type })}>{text}</button>
}

export default Button