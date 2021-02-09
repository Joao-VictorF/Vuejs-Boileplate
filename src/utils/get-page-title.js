import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Vuejs Boilerplate'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
