import Cookies from 'js-cookie'

const TokenKey = 'Auth-Token'

export function getToken() {
  const data = JSON.parse(localStorage.getItem(process.env.LOCALSTORAGE))
  if (data) {
    return data.accessToken && !data.firstAccess
  }
  return null
  // return data !== null || data !== undefined ? data.accessToken : null
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
