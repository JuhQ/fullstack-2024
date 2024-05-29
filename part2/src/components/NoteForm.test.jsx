import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NoteForm from './NoteForm'


test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createNoteMockHandler = vi.fn()
  const errorHandlerMock = vi.fn()

  render(<NoteForm onCreate={createNoteMockHandler} onError={errorHandlerMock} />)


  //const input = screen.getByRole('textbox')
  const input = screen.getByPlaceholderText('write new note here')
  const button = screen.getByText('save')

  await user.type(input, 'jotain hauskaa')
  await user.click(button)

  expect(createNoteMockHandler.mock.calls).toHaveLength(1)
  expect(createNoteMockHandler.mock.calls[0][0].content).toBe('jotain hauskaa')
})