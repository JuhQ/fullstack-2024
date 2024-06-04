const loginWith = async (page, username, password) => {
  await page.getByRole('button', { name: 'Login' }).click()

  const usernameInput = page.getByPlaceholder('Username')
  const passwordInput = page.getByPlaceholder('Password')

  await usernameInput.fill(username)
  await passwordInput.fill(password)
  await page.getByRole('button', { name: 'Log in' }).click()
}

const resetTestState = async ({ page, request }) => {
  await request.post('/api/testing/reset')
  await request.post('/api/users', {
    data: {
      name: 'testitunnus',
      username: 'root',
      password: 'sekret'
    }
  })

  await page.goto('http://localhost:5173')
}


const createNote = async (page, content) => {
  await page.getByRole('button', { name: 'new note' }).click()
  await page.getByRole('textbox').fill(content)
  await page.getByRole('button', { name: 'save' }).click()
}

export { loginWith, resetTestState, createNote }