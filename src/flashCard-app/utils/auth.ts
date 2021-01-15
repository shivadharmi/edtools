export function setDataLS(name: string, value: string) {
  window.localStorage.setItem(name, value);
}

export function getDataLS(name: string) {
  return window.localStorage.getItem(name);
}

export function removeDataLS(name: string) {
  window.localStorage.removeItem(name);
}

export function setAuthData(userId: string) {
  setDataLS("userId", userId);
  setDataLS("isAuthenticated", "true");
}

export function removeAuthData() {
  removeDataLS("userId");
  removeDataLS("isAuthenticated");
}

export function isAuthenticated() {
  if (getDataLS("userId")) {
    const auth = getDataLS("isAuthenticated");
    if (auth) {
      return Boolean(auth);
    }
  }
  return false;
}
