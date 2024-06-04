import { expect, test } from '@playwright/test'
import { createNote, loginWith, resetTestState } from './helper'

test.describe('Note app', () => {

  test.beforeEach(resetTestState)

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

    await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible()
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

  test('user can log in', async ({ page }) => {
    await loginWith(page, 'root', 'sekret')
    await expect(page.getByText('root logged in')).toBeVisible()
  })

  test.describe('when logged in', () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, 'root', 'sekret')
    })

    test('a new note can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'Luo uusi muistiinpano' }).click()
      await page.getByRole('textbox').fill('note created by playwright')
      await page.getByRole('button', { name: 'save' }).click()

      await expect(page.getByText('note created by playwright')).toBeVisible()
    })
  })

  // TODO these tests do not work
  test.describe.skip('and several notes exists', () => {
    test.beforeEach(async ({ page }) => {
      await createNote(page, 'first note', true)
      await createNote(page, 'second note', true)
    })

    test('one of those can be made nonimportant', async ({ page }) => {
      const otherNoteElement = await page.getByText('first note')

      await otherNoteElement
        .getByRole('button', { name: 'make not important' }).click()
      await expect(otherNoteElement.getByText('make important')).toBeVisible()
    })
  })


  test.describe('codegenin avulla tehdyt testit', () => {

    test('test', async ({ page }) => {

      await page.goto('http://localhost:5173/')
      await page.getByRole('button', { name: 'Login' }).click()
      await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
      await expect(page.getByPlaceholder('Username')).toBeVisible()
      await expect(page.getByPlaceholder('Password')).toBeVisible()
      await page.getByPlaceholder('Username').click()
      await page.getByPlaceholder('Username').fill('root')
      await page.getByPlaceholder('Username').press('Tab')
      await page.getByPlaceholder('Password').fill('sekret')
      await page.getByPlaceholder('Password').press('Enter')
      await page.getByRole('button', { name: 'Luo uusi muistiinpano' }).click()
      await page.getByPlaceholder('write new note here').click()
      await page.getByPlaceholder('write new note here').fill('uusi muistiinpano')
      await page.getByPlaceholder('write new note here').press('Enter')
      await expect(page.getByRole('listitem')).toContainText('our awesome note: uusi muistiinpanomake not importantX')
    })
  })

})
