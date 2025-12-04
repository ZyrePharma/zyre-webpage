import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, UIState } from '../types';
import React from 'react';

// Store interface with better separation of concerns
interface AppStore {
  // Products state
  products: Product[];
  selectedProduct: Product | null;

  // UI state
  ui: UIState;


  // UI actions
  toggleSidebar: () => void;
  setTableOpen: (isOpen: boolean) => void;
  setActiveImage: (index: number) => void;
  setLoading: (loading: boolean) => void;
}



// Create the store with better performance and error handling
export const useStore = create<AppStore>()(
  persist(
    (set) => ({
      // Initial state
      products: [],
      selectedProduct: null,

      ui: {
        isSidebarOpen: false,
        isTableOpen: false,
        activeImage: 0,
        isLoading: false,
      },


      // UI actions
      toggleSidebar: () =>
        set((state) => ({
          ui: { ...state.ui, isSidebarOpen: !state.ui.isSidebarOpen },
        })),

      setTableOpen: (isOpen) =>
        set((state) => ({
          ui: { ...state.ui, isTableOpen: isOpen },
        })),

      setActiveImage: (index) =>
        set((state) => ({
          ui: { ...state.ui, activeImage: index },
        })),

      setLoading: (loading) =>
        set((state) => ({
          ui: { ...state.ui, isLoading: loading },
        })),
    }),
    {
      name: 'zyre-app-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useUI = () =>
  useStore((state) => ({
    ui: state.ui,
    toggleSidebar: state.toggleSidebar,
    setTableOpen: state.setTableOpen,
    setActiveImage: state.setActiveImage,
    setLoading: state.setLoading,
  }));

// Custom hook to handle hydration properly
export const useHydratedStore = () => {
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    // Mark as hydrated after component mounts
    setHydrated(true);
  }, []);

  return hydrated;
};



export const useSafeUI = () => {
  const hydrated = useHydratedStore();
  const ui = useStore((state) => ({
    ui: state.ui,
    toggleSidebar: state.toggleSidebar,
    setTableOpen: state.setTableOpen,
    setActiveImage: state.setActiveImage,
    setLoading: state.setLoading,
  }));

  if (!hydrated) {
    return {
      ui: {
        isSidebarOpen: false,
        isTableOpen: false,
        activeImage: 0,
        isLoading: false,
      },
      toggleSidebar: () => { },
      setTableOpen: () => { },
      setActiveImage: () => { },
      setLoading: () => { },
    };
  }

  return ui;
};
