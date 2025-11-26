'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { ProductSearchProps } from '../types';
import { useDebouncedCallback } from '../hooks/useDebounce';
import {
  SEARCH_CONFIG,
  ANIMATION_DELAYS,
  ANIMATION_DURATIONS,
} from '../constants';

const ProductSearch: React.FC<ProductSearchProps> = ({
  onSearch,
  searchQuery,
  placeholder = 'Search products...',
  className = '',
}) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  // Use custom debounced callback hook
  const debouncedSearch = useDebouncedCallback(
    (value: string) => onSearch(value),
    SEARCH_CONFIG.DEBOUNCE_DELAY
  );

  // Sync local state with prop when it changes externally
  useEffect(() => {
    if (searchQuery !== localSearchQuery) {
      setLocalSearchQuery(searchQuery);
    }
  }, [searchQuery, localSearchQuery]);

  const handleClearSearch = () => {
    setLocalSearchQuery('');
    onSearch('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    // Debounce the actual search call
    debouncedSearch(value);
  };

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: ANIMATION_DURATIONS.NORMAL },
    },
  };

  const searchResultVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: ANIMATION_DURATIONS.FAST,
        delay: ANIMATION_DELAYS.STAGGER_CHILD,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className={`relative max-w-md mx-auto mb-8 ${className}`}
    >
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder={placeholder}
          value={localSearchQuery}
          onChange={handleInputChange}
          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200"
          aria-label="Search products"
        />
        {localSearchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label="Clear search"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        )}
      </div>

      {localSearchQuery && (
        <motion.div
          variants={searchResultVariants}
          initial="initial"
          animate="animate"
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-2"
        >
          <p className="text-sm text-gray-600 px-3 py-2">
            Searching for:{' '}
            <span className="font-semibold text-primary">
              &quot;{localSearchQuery}&quot;
            </span>
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProductSearch;
