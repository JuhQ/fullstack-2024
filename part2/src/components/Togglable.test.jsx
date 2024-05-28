import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

describe('<Togglable />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv" >
          togglable content
        </div>
      </Togglable>
    ).container
  })

  test('renders its children', () => {
    screen.getByText('show...')
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.testDiv')
    expect(div).toBeNull()
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const div = container.querySelector('.testDiv')
    expect(div).toHaveTextContent('togglable content')
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const div = container.querySelector('.testDiv')
    expect(div).toHaveTextContent('togglable content')

    await user.click(button)

    const div2 = container.querySelector('.testDiv')
    expect(div2).toBeNull()
  })
})