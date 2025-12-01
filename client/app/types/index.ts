// Core application types
export interface Product {
  id: string;
  name: string;
  genericName: string;
  category: string;
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
  images: string[]; // Changed from single image to array of images
  size: string;
  fdaId: string;
  genericName: string;
  description: string;
  category: string;
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

// Footer types
export interface Contact {
  type: string;
  value: string;
}

export interface Office {
  id: number;
  name: string;
  address: string;
  contact: Contact[];
  mapUrl?: string;
}

export interface Portal {
  id: number;
  name: string;
  url: string;
}

export interface SisterCompany {
  id: number;
  name: string;
  website?: string;
}

// Careers types
export interface Benefit {
  name: string;
  icon?: string;
  subtext?: string;
}

export interface ZyreBenefit {
  id: number;
  department: string;
  benefits: Benefit[];
}

export interface JobListing {
  id: string;
  documentId: string;
  slug: string;
  position: string;
  type: 'Full Time' | 'Part Time' | 'Contract';
  department: string;
  location: string;
  vacancies: number;
  salaryRange: string;
  description?: string;
  requirements?: string[];
  responsibilities?: string[];
  postedDate: string;
  applicants: number;
  active: boolean;
}

