import { getLocaleFromURL } from '.'

import { allLocales } from './__fixtures__/get-locale-from-url-fixtures'

describe('getLocaleFromURL', () => {

  it('returns empty object if missing allLocale or activeLocale', () => {
    const result = getLocaleFromURL({ pathname: '/' })
    expect(result).toEqual({})
  })

  it('returns default locale if locale not found in the url', () => {
    const activeLocale = allLocales[ 0 ]
    const result = getLocaleFromURL({ allLocales, activeLocale, pathname: '/fake-page' })
    expect(result).toEqual(expect.objectContaining(activeLocale))
  })

  it('returns italian if /it found in url', () => {
    const activeLocale = allLocales[ 1 ]
    const result = getLocaleFromURL({ allLocales, activeLocale, pathname: '/it/favoriti' })
    expect(result).toEqual(expect.objectContaining(activeLocale))
  })
  
  it('returns english if /en found in url', () => {
    const activeLocale = allLocales[ 0 ]
    const result = getLocaleFromURL({ allLocales, activeLocale, pathname: '/en/favourites' })
    expect(result).toEqual(expect.objectContaining(activeLocale))
  })

})