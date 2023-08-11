import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import ShopifyFormat from '@shopify/i18next-shopify'
import resourcesToBackend from 'i18next-resources-to-backend'
import { match } from '@formatjs/intl-localematcher'
import { shouldPolyfill as shouldPolyfillLocale } from '@formatjs/intl-locale/should-polyfill'
import { shouldPolyfill as shouldPolyfillPluralRules } from '@formatjs/intl-pluralrules/should-polyfill'
import {
  DEFAULT_LOCALE as DEFAULT_POLARIS_LOCALE,
  SUPPORTED_LOCALES as SUPPORTED_POLARIS_LOCALES
} from '@shopify/polaris'
// import locale from "dayjs/locale/*";

/**
 * The default locale for the app.
 */
const DEFAULT_APP_LOCALE = 'en'

/**
 * The supported locales for the app.
 *
 * These should correspond with the JSON files in the `locales` folder.
 *
 * @example
 *   en.json
 *   de.json
 *   fr.json
 * @see Available Shopify Admin languages in the Shopify Help Center:
 * https://help.shopify.com/en/manual/your-account/languages#available-languages
 */
const SUPPORTED_APP_LOCALES = ['en', 'de', 'fr']

let _userLocale: any, _polarisTranslations: any

/**
 * Retrieves the user's locale from the `locale` request parameter and matches it to supported app locales.
 *
 * Returns the default app locale if the user locale is not supported.
 *
 * @see https://shopify.dev/docs/apps/best-practices/internationalization/getting-started#step-2-get-access-to-the-users-locale
 *
 * @returns {string} User locale
 */
export function getUserLocale () {
  if (_userLocale) {
    return _userLocale
  }
  const url = new URL(window.location.href)
  const locale = url.searchParams.get('locale') || DEFAULT_APP_LOCALE
  _userLocale = match([locale], SUPPORTED_APP_LOCALES, DEFAULT_APP_LOCALE)
  return _userLocale
}

/**
 * Returns Polaris translations that correspond to the user locale.
 *
 * Returns Polaris translations for the default locale if the user locale is not supported.
 *
 * @see https://polaris.shopify.com/components/utilities/app-provider#using-translations
 *
 * @returns {TranslationDictionary} Polaris translations
 */
export function getPolarisTranslations () {
  return _polarisTranslations
}

/**
 * @async
 * Asynchronously initializes i18next and loads Polaris translations.
 *
 * Intended to be called before rendering the app to ensure translations are present.
 */
export async function initI18n () {
  await loadIntlPolyfills()
  await Promise.all([initI18next(), fetchPolarisTranslations()])
}

/**
 * @private
 * @async
 * Asynchronously loads Intl polyfills for the default locale and user locale.
 */
async function loadIntlPolyfills () {
  if (shouldPolyfillLocale()) {
    await import('@formatjs/intl-locale/polyfill')
  }
  const promises = []
  if (shouldPolyfillPluralRules(DEFAULT_APP_LOCALE)) {
    await import('@formatjs/intl-pluralrules/polyfill-force')
    promises.push(loadIntlPluralRulesLocaleData(DEFAULT_APP_LOCALE))
  }
  if (
    DEFAULT_APP_LOCALE !== getUserLocale() &&
    shouldPolyfillPluralRules(getUserLocale())
  ) {
    promises.push(loadIntlPluralRulesLocaleData(getUserLocale()))
  }
  await Promise.all(promises)
}

/**
 * A subset of the available plural rules locales
 *  that match available Shopify Admin languages
 * @see Available Shopify Admin languages in the Shopify Help Center:
 * https://help.shopify.com/en/manual/your-account/languages#available-languages
 */
const PLURAL_RULES_LOCALE_DATA: Record<string, any> = {
  cs: async () => await import('@formatjs/intl-pluralrules/locale-data/cs'),
  da: async () => await import('@formatjs/intl-pluralrules/locale-data/da'),
  de: async () => await import('@formatjs/intl-pluralrules/locale-data/de'),
  en: async () => await import('@formatjs/intl-pluralrules/locale-data/en'),
  es: async () => await import('@formatjs/intl-pluralrules/locale-data/es'),
  fi: async () => await import('@formatjs/intl-pluralrules/locale-data/fi'),
  fr: async () => await import('@formatjs/intl-pluralrules/locale-data/fr'),
  it: async () => await import('@formatjs/intl-pluralrules/locale-data/it'),
  ja: async () => await import('@formatjs/intl-pluralrules/locale-data/ja'),
  ko: async () => await import('@formatjs/intl-pluralrules/locale-data/ko'),
  nb: async () => await import('@formatjs/intl-pluralrules/locale-data/nb'),
  nl: async () => await import('@formatjs/intl-pluralrules/locale-data/nl'),
  pl: async () => await import('@formatjs/intl-pluralrules/locale-data/pl'),
  pt: async () => await import('@formatjs/intl-pluralrules/locale-data/pt'),
  'pt-PT': async () => await import('@formatjs/intl-pluralrules/locale-data/pt-PT'),
  sv: async () => await import('@formatjs/intl-pluralrules/locale-data/sv'),
  th: async () => await import('@formatjs/intl-pluralrules/locale-data/th'),
  tr: async () => await import('@formatjs/intl-pluralrules/locale-data/tr'),
  vi: async () => await import('@formatjs/intl-pluralrules/locale-data/vi'),
  zh: async () => await import('@formatjs/intl-pluralrules/locale-data/zh')
}

async function loadIntlPluralRulesLocaleData (locale: any): Promise<any> {
  return (await PLURAL_RULES_LOCALE_DATA[locale]()).default
}

/**
 * @private
 * @async
 * Asynchronously initializes i18next.
 * @see https://www.i18next.com/overview/configuration-options
 * @returns Promise of initialized i18next instance
 */
async function initI18next () {
  return await i18next
    .use(initReactI18next)
    .use(ShopifyFormat)
    .use(localResourcesToBackend())
    .init({
      debug: process.env.NODE_ENV === 'development',
      lng: getUserLocale(),
      fallbackLng: DEFAULT_APP_LOCALE,
      supportedLngs: SUPPORTED_APP_LOCALES,
      interpolation: {
        // React escapes values by default
        escapeValue: false
      },
      react: {
        // Wait for the locales to be loaded before rendering the app
        // instead of using a Suspense component
        useSuspense: false
      }
    })
}

function localResourcesToBackend () {
  return resourcesToBackend(async (locale: any, _namespace: any) => {
    return (await import(`../locales/${locale}.json`)).default
  })
}

/**
 * @private
 * @async
 * Asynchronously loads Polaris translations that correspond to the user locale.
 *
 * Loads Polaris translations for the default locale if the user locale is not supported.
 * @returns {Promise<TranslationDictionary>} Promise of Polaris translations
 */
async function fetchPolarisTranslations () {
  if (_polarisTranslations) {
    return _polarisTranslations
  }
  // Get the closest matching default locale supported by Polaris
  const defaultPolarisLocale = match(
    [DEFAULT_APP_LOCALE],
    SUPPORTED_POLARIS_LOCALES,
    DEFAULT_POLARIS_LOCALE
  )
  // Get the closest matching user locale supported by Polaris
  const polarisLocale = match(
    [getUserLocale()],
    SUPPORTED_POLARIS_LOCALES,
    defaultPolarisLocale
  )
  _polarisTranslations = await loadPolarisTranslations(polarisLocale)
  return _polarisTranslations
}

/**
 * Polaris imports are declared explicitly because
 * dynamic imports with variables are only supported
 * for files with relative paths, not packages.
 * @see https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
 */
const POLARIS_LOCALE_DATA: Record<string, any> = {
  cs: async () => await import('@shopify/polaris/locales/cs.json'),
  da: async () => await import('@shopify/polaris/locales/da.json'),
  de: async () => await import('@shopify/polaris/locales/de.json'),
  en: async () => await import('@shopify/polaris/locales/en.json'),
  es: async () => await import('@shopify/polaris/locales/es.json'),
  fi: async () => await import('@shopify/polaris/locales/fi.json'),
  fr: async () => await import('@shopify/polaris/locales/fr.json'),
  it: async () => await import('@shopify/polaris/locales/it.json'),
  ja: async () => await import('@shopify/polaris/locales/ja.json'),
  ko: async () => await import('@shopify/polaris/locales/ko.json'),
  nb: async () => await import('@shopify/polaris/locales/nb.json'),
  nl: async () => await import('@shopify/polaris/locales/nl.json'),
  pl: async () => await import('@shopify/polaris/locales/pl.json'),
  'pt-BR': async () => await import('@shopify/polaris/locales/pt-BR.json'),
  'pt-PT': async () => await import('@shopify/polaris/locales/pt-PT.json'),
  sv: async () => await import('@shopify/polaris/locales/sv.json'),
  th: async () => await import('@shopify/polaris/locales/th.json'),
  tr: async () => await import('@shopify/polaris/locales/tr.json'),
  vi: async () => await import('@shopify/polaris/locales/vi.json'),
  'zh-CN': async () => await import('@shopify/polaris/locales/zh-CN.json'),
  'zh-TW': async () => await import('@shopify/polaris/locales/zh-TW.json')
}

async function loadPolarisTranslations (locale: any) {
  let result: any

  result = await POLARIS_LOCALE_DATA[locale]()
  return result.default
}
