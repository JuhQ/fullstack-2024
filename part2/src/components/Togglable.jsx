import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
  const [show, setShow] = useState(false)

  const toggleShow = () => setShow(!show)

  useImperativeHandle(ref, () => ({ toggleShow }))

  return (<>
    <div>
      <button type="button" onClick={toggleShow}>{props.buttonLabel}</button>
    </div>

    {show && props.children}
  </>)
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
