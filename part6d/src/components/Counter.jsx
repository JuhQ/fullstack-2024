import { CounterContextProvider } from "../CounterContext"
import Button from "./Button"
import Display from "./Display"


const Counter = () => {
    return (
        <CounterContextProvider>
            <div>
                <Display />
                <br />

                <Button text="Plus" type="INCREMENT" />
                <Button text="Minus" type="DECREMENT" />
                <Button text="Zero" type="ZERO" />
            </div>
        </CounterContextProvider>
    )
}

export default Counter