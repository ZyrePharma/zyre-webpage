// Core application types
export interface Product {
  id: string;
  name: string;
  genericName: string;
  type: string;
  size: string;
  description: string;
  image: string;
  fdaId: string;
  formulation: string;
  indications: string;
  dosage: string[];
  overdosage: string;
  caution: string;
  availability: string;
  storage: string;
  sku: string;
  manufacturer: string;
  country: string;
  price?: number;
}

export interface UIState {
  isSidebarOpen: boolean;
  isTableOpen: boolean;
  activeImage: number;
  isLoading: boolean;
}

// Component prop types
export interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  size: string;
  fdaId: string;
  genericName: string;
  description: string;
  type: string;
  price?: number;
}

export interface ProductSearchProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  placeholder?: string;
  className?: string;
}

// Navigation types
export interface NavLink {
  label: string;
  href: string;
  icon?: React.ComponentType;
  children?: NavLink[];
}

// API response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Form types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Utility types
export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
}

// Animation variants
export interface AnimationVariants {
  initial: object;
  animate: object;
  exit?: object;
  hover?: object;
  tap?: object;
}
