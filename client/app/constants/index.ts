// Navigation constants
export const NAV_LINKS = [
  { label: 'Who we are', href: '/' },
  { label: 'Our Products', href: '/products' },
  { label: 'Our Sisters', href: '/sisters' },
  { label: 'Careers', href: '/careers' },
  { label: 'Posts', href: '/posts' },
] as const;

// Animation constants
export const ANIMATION_DELAYS = {
  STAGGER_CHILD: 0.1,
  STAGGER_CONTAINER: 0.2,
  HOVER: 0.3,
  TAP: 0.1,
} as const;

export const ANIMATION_DURATIONS = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
  VERY_SLOW: 0.8,
} as const;

// Search constants
export const SEARCH_CONFIG = {
  DEBOUNCE_DELAY: 300,
  MIN_QUERY_LENGTH: 1,
  MAX_RESULTS: 100,
} as const;

// UI constants
export const UI_CONFIG = {
  SCROLL_THRESHOLD: 100,
  MOUSE_TIMEOUT: 2000,
  TEXT_ANIMATION_INTERVAL: 3000,
} as const;

// Product constants
export const PRODUCT_CONFIG = {
  ITEMS_PER_PAGE: 12,
  MAX_DESCRIPTION_LENGTH: 150,
  IMAGE_QUALITY: 85,
} as const;

// Breakpoints for responsive design
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// API endpoints
export const API_ENDPOINTS = {
  PRODUCTS: '/api/products',
  CONTACT: '/api/contact',
  CAREERS: '/api/careers',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  PRODUCT_NOT_FOUND: 'Product not found',
  SEARCH_FAILED: 'Search failed. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  CONTACT_SENT: 'Message sent successfully!',
  SEARCH_COMPLETED: 'Search completed successfully.',
} as const;
