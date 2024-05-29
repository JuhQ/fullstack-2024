import { render, screen } from '@testing-library/react'
import LoginForm from './LoginForm'
import userEvent from '@testing-library/user-event'

test('<LoginForm /> can log in', async () => {
  const user = userEvent.setup()
  const successMockHandler = vi.fn()
  const errorMockHandler = vi.fn()

  render(<LoginForm onSuccess={successMockHandler} onError={errorMockHandler} />)

  const usernameInput = screen.getByPlaceholderText('Username')
  const passwordInput = screen.getByPlaceholderText('Password')
  const button = screen.getByText('Log in')

  await user.type(usernameInput, 'tunnus')
  await user.type(passwordInput, 'salasana')
  await user.click(button)

  expect(successMockHandler.mock.calls).toHaveLength(0)
})


test('snapshot', () => {
  const result = render(<LoginForm onSuccess={() => null} onError={() => null} />)

  expect(result.container).toMatchSnapshot()
})
