
// App Configuration
export const APP_NAME = 'Glow Calm';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Your personal breathing and wellness companion';


export const ELEVEN_LABS_API_KEY = ""










// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
  INVALID_INPUT: 'Please enter valid information.',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.'
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  BREATHING_SESSION_COMPLETED: 'Great job! Breathing session completed successfully.',
  SETTINGS_SAVED: 'Your settings have been saved.',
  PROFILE_UPDATED: 'Profile updated successfully.'
} as const;


export const ROUTES = {
  breathe : '/breathe',
  home: '/',
  explore: '/explore',
  exercises: '/exercises',
}


