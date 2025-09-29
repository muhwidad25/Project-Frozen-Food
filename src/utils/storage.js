export function saveUserToStorage(user) {
  localStorage.setItem('activeUser', JSON.stringify(user));
}

export function loadUserFromStorage() {
  try {
    return JSON.parse(localStorage.getItem('activeUser'));
  } catch {
    return null;
  }
}