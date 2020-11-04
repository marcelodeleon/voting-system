const tokenStorageKey = 'token';

export const getSessionToken = () => {
  return window.localStorage.getItem(tokenStorageKey);
};

export const setSessionToken = (token) => {
  window.localStorage.setItem(tokenStorageKey, token);
};

export const removeSessionToken = () => {
  window.localStorage.removeItem(tokenStorageKey);
};
