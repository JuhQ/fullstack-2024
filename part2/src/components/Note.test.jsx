import { render, screen } from '@testing-library/react'
import Note from './Note'
import userEvent from '@testing-library/user-event'

test('renders content', () => {
  const note = {
    content: 'minun muistiinpano',
    important: true
  }

  const { container } = render(<Note note={note} />)


  const li = container.querySelector('.note')
  expect(li).toHaveTextContent('minun muistiinpano')
})

test('renders content with important value set to true', () => {
  const note = {
    content: 'minun muistiinpano',
    important: true
  }

  const { container } = render(<Note note={note} />)

  const li = container.querySelector('.note button:first-child')
  expect(li).toHaveTextContent('make not important')
})

test('renders content with important value set to false', () => {
  const note = {
    content: 'minun muistiinpano',
    important: false
  }

  const { container } = render(<Note note={note} />)

  const li = container.querySelector('.note button:first-child')
  expect(li).toHaveTextContent('make important')
})

test('Clicking delete button calls event handler once', async () => {
  const note = {
    content: 'minun muistiinpano',
    important: true
  }

  const mockHandler = vi.fn()

  render(<Note note={note} deleteNote={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('X')

  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})

test('Clicking importance button calls event handler once', async () => {
  const note = {
    content: 'minun muistiinpano',
    important: true
  }

  const mockHandler = vi.fn()

  render(<Note note={note} toggleImportance={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('make not important')

  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})

test('Clicking importance button does not call delete button event handler', async () => {
  const note = {
    content: 'minun muistiinpano',
    important: true
  }

  const mockImportanceHandler = vi.fn()
  const mockDeleteHandler = vi.fn()

  render(<Note
    note={note}
    toggleImportance={mockImportanceHandler}
    deleteNote={mockDeleteHandler}
  />)

  const user = userEvent.setup()
  const button = screen.getByText('make not important')

  await user.click(button)

  expect(mockImportanceHandler.mock.calls).toHaveLength(1)
  expect(mockDeleteHandler.mock.calls).toHaveLength(0)
})

test('Clicking delete button does not call toggle importance button event handler', async () => {
  const note = {
    content: 'minun muistiinpano',
    important: true
  }

  const mockImportanceHandler = vi.fn()
  const mockDeleteHandler = vi.fn()

  render(<Note
    note={note}
    toggleImportance={mockImportanceHandler}
    deleteNote={mockDeleteHandler}
  />)

  const user = userEvent.setup()
  const button = screen.getByText('X')

  await user.click(button)

  expect(mockImportanceHandler.mock.calls).toHaveLength(0)
  expect(mockDeleteHandler.mock.calls).toHaveLength(1)
})
