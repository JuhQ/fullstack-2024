import { test, expect } from '@playwright/test'

test('omnia.fi', async ({ browserName }) => {
  test.skip(browserName.toLowerCase() === 'mobile safari', 'omnia.fi malliesimerkki', async ({ page }) => {
    await page.goto('https://www.omnia.fi/')
    await expect(page.getByRole('article')).toContainText('Ratkaisuja. Yhdessä. Kaikille.')
    await expect(page.getByRole('link', { name: 'Etusivu Omnia logo' })).toBeVisible()
    await page.getByRole('link', { name: 'English' }).click()
    await expect(page.getByRole('article')).toContainText('Solutions. Together. For all.')
    await page.getByRole('button', { name: 'Search the site' }).click()
    await page.getByLabel('Site search').click()
    await page.getByLabel('Site search').fill('kirkkokatu')
    await page.getByLabel('Site search').press('Enter')
    await page.getByRole('link', { name: 'Kirkkokatu 16 A - Contact' }).click()
    await expect(page.getByRole('article')).toContainText('kirkkokatu.vahtimestari@omnia.fi')
    await expect(page.getByRole('article')).toContainText('040 126 4870 (opens in a new window, goes to a different website)')
    await page.getByRole('link', { name: 'About Omnia' }).click()
    await page.getByRole('link', { name: 'Suomi' }).click()
    await page.getByRole('link', { name: 'Kestävä tulevaisuus' }).click()
    await expect(page.getByRole('article')).toContainText('Kestävän tulevaisuuden rakentaminen on toimintamme ydin. Tutustu Omnian tavoitteisiin ja tekoihin kestävämmän tulevaisuuden saavuttamiseksi.')
  })
})