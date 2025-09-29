// Simple localStorage utilities for user data

export function saveUserToStorage(user) {
  try {
    localStorage.setItem('activeUser', JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user to storage:', error);
  }
}

export function loadUserFromStorage() {
  try {
    const stored = localStorage.getItem('activeUser');
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading user from storage:', error);
    return null;
  }
}

export function removeUserFromStorage() {
  try {
    localStorage.removeItem('activeUser');
  } catch (error) {
    console.error('Error removing user from storage:', error);
  }
}