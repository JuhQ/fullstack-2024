import { expect, test } from '@playwright/test'

test.describe('Note app', () => {

  test.beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/testing/reset")
    const response = await request.post("http://localhost:3001/api/users", {
      data: {
        name: 'testitunnus',
        username: 'root',
        password: 'sekret'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(
      page.getByText(
        'Note app, Department of Computer Science, University of Helsinki 2023'
      )
    ).toBeVisible()
  })

  test('login form can be opened', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click()

    const usernameInput = page.getByPlaceholder('Username')
    const passwordInput = page.getByPlaceholder('Password')

    await usernameInput.fill('root')
    await passwordInput.fill('sekret')
    await page.getByRole('button', { name: 'Log in' }).click()

    await expect(page.getByText('root logged in')).toBeVisible()
  })


  test('login fails with wrong password', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click()
    const usernameInput = page.getByPlaceholder('Username')
    const passwordInput = page.getByPlaceholder('Password')
    await usernameInput.fill('mluukkai')
    await passwordInput.fill('wrong')
    await page.getByRole('button', { name: 'Log in' }).click()

    await expect(page.getByText('Virhe!')).toBeVisible()
  })

  test.describe("when logged in", () => {
    test.beforeEach(async ({ page })=> {

      await page.getByRole('button', { name: 'Login' }).click()

      const usernameInput = page.getByPlaceholder('Username')
      const passwordInput = page.getByPlaceholder('Password')

      await usernameInput.fill('root')
      await passwordInput.fill('sekret')
      await page.getByRole('button', { name: 'Log in' }).click()

      await expect(page.getByText('root logged in')).toBeVisible()
    })

    test("a new note can be created", async ({page})=>{
      await page.getByRole("button", {name: 'Luo uusi muistiinpano'}).click()
      await page.getByRole("textbox").fill("note created by playwright")
      await page.getByRole("button", {name: 'save'}).click()

      await expect(page.getByText("note created by playwright")).toBeVisible()
    })
  })

})
