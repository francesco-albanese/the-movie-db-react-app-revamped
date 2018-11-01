import { isEmpty } from 'lodash-es'

/**
 * Retrieves the locale from the URL
 * 
 * @param allLocales {Array} of locales
 * @param activeLocale {Object} representing the current active locale
 * @param pathname {String} location.pathname
 * @returns {Object} with the locale to be updated
 */

export const getLocaleFromURL = ({ allLocales = [], activeLocale = {}, pathname= '' } = {}) => {
  if (isEmpty(allLocales) || isEmpty(activeLocale)) {
    return {}
  }

  const localeInURL = pathname.split('/')[ 1 ]
  const defaultLocale = allLocales.find(locale => locale.default)
  const localeToUpdate = allLocales.find(locale => locale.code === localeInURL)

  if (isEmpty(localeToUpdate)) {
    return defaultLocale
  }

  return localeToUpdate

}