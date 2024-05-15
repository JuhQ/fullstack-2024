import { useState } from "react"

const Togglable = (props) => {
    const [show, setShow] = useState(false)

    return (<>

        <div>
            <button type="button" onClick={() => setShow(!show)}>{props.buttonLabel}</button>
        </div>

        {show && props.children}

    </>)

}

export default Togglable