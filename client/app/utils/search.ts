import { Product } from '@/types';

/**
 * Search products by query across multiple fields
 * @param products - Array of products to search
 * @param query - Search query string
 * @returns Filtered array of products
 */
export function searchProducts(products: Product[], query: string): Product[] {
  if (!query.trim()) {
    return products;
  }

  const searchTerm = query.toLowerCase().trim();

  return products.filter((product) => {
    const searchableFields = [
      product.name,
      product.genericName,
      product.type,
      product.description,
      product.manufacturer,
      product.country,
      product.sku,
    ];

    return searchableFields.some((field) =>
      field.toLowerCase().includes(searchTerm)
    );
  });
}

/**
 * Advanced search with multiple criteria
 * @param products - Array of products to search
 * @param criteria - Search criteria object
 * @returns Filtered array of products
 */
export function advancedSearch(
  products: Product[],
  criteria: {
    query?: string;
    type?: string;
    manufacturer?: string;
    priceRange?: { min: number; max: number };
  }
): Product[] {
  let filteredProducts = products;

  // Text search
  if (criteria.query) {
    filteredProducts = searchProducts(filteredProducts, criteria.query);
  }

  // Type filter
  if (criteria.type) {
    filteredProducts = filteredProducts.filter(
      (product) => product.type.toLowerCase() === criteria.type!.toLowerCase()
    );
  }

  // Manufacturer filter
  if (criteria.manufacturer) {
    filteredProducts = filteredProducts.filter((product) =>
      product.manufacturer
        .toLowerCase()
        .includes(criteria.manufacturer!.toLowerCase())
    );
  }

  // Price range filter
  if (criteria.priceRange) {
    filteredProducts = filteredProducts.filter((product) => {
      if (!product.price) return false;
      return (
        product.price >= criteria.priceRange!.min &&
        product.price <= criteria.priceRange!.max
      );
    });
  }

  return filteredProducts;
}

/**
 * Sort products by various criteria
 * @param products - Array of products to sort
 * @param sortBy - Sort criteria
 * @param order - Sort order (asc/desc)
 * @returns Sorted array of products
 */
export function sortProducts(
  products: Product[],
  sortBy: 'name' | 'price' | 'type' | 'manufacturer',
  order: 'asc' | 'desc' = 'asc'
): Product[] {
  const sortedProducts = [...products];

  sortedProducts.sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortBy) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'price':
        aValue = a.price || 0;
        bValue = b.price || 0;
        break;
      case 'type':
        aValue = a.type.toLowerCase();
        bValue = b.type.toLowerCase();
        break;
      case 'manufacturer':
        aValue = a.manufacturer.toLowerCase();
        bValue = b.manufacturer.toLowerCase();
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });

  return sortedProducts;
}

/**
 * Highlight search terms in text
 * @param text - Text to highlight
 * @param query - Search query
 * @returns Text with highlighted search terms
 */
export function highlightSearchTerms(text: string, query: string): string {
  if (!query.trim()) return text;

  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(
    regex,
    '<mark class="bg-yellow-200 px-1 rounded">$1</mark>'
  );
}

