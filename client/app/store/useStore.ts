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

  // Actions
  setProducts: (products: Product[]) => void;
  setSelectedProduct: (product: Product | null) => void;

  // UI actions
  toggleSidebar: () => void;
  setTableOpen: (isOpen: boolean) => void;
  setActiveImage: (index: number) => void;
  setLoading: (loading: boolean) => void;
}

// Initial data - moved to separate constants file in production
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Ziphanol',
    genericName: 'butorphanol tartrate',
    type: 'Opioid Analgesic',
    size: '1 mL x 10 Ampoules',
    description:
      'Ophthalmic Solution for irrigation of M.E.C. / 0.01% Sterile ophthalmic irrigating solution.',
    image: '/assets/product.png',
    fdaId: 'R-XX-123',
    formulation:
      'Each ml contains: Butorphanol Tartrate 0.01% in sterile ophthalmic solution.',
    indications:
      'Butorphanol is used to relieve moderate to severe pain. For pre-operative or pre-anesthetic medication as a supplement to balanced anesthesia. For relief of labor pain.',
    dosage: [
      'Pain: 1-2 mg IM or IV every 3-4 hours as needed',
      'Pre-operative: 2 mg IM 60-90 minutes before surgery',
      'Labor Pain: 1-2 mg IM or IV every 4 hours',
      'Children: 0.02-0.05 mg/kg IM or IV',
      'Elderly: Start with lower doses',
      'Renal/Hepatic Impairment: Dose adjustment may be required',
    ],
    overdosage:
      'Clinical manifestations include respiratory depression, somnolence, and coma. Management includes airway support and naloxone administration.',
    caution:
      'Forbid Drugs, Stimulant and Growth hormone products dispensing without prescription.',
    availability: '1 vial of 1 ml x 10 ampoules in a box.',
    storage:
      'Store at temperature not exceeding 30°C. KEEP MEDICINE OUT OF REACH OF CHILDREN.',
    sku: '480000004214',
    manufacturer: 'Henderson Pharmaceuticals, Inc.',
    country: 'South Korea',
    price: 45.99,
  },
  {
    id: '2',
    name: 'Neurodex',
    genericName: 'dexamethasone sodium phosphate',
    type: 'Corticosteroid',
    size: '2 mL x 5 Ampoules',
    description: '4mg/mL Injection (I.V/I.M)',
    image: '/assets/product.png',
    fdaId: 'R-XX-124',
    formulation:
      'Each ml contains: Dexamethasone Sodium Phosphate 4mg in sterile solution.',
    indications:
      'Anti-inflammatory and immunosuppressive agent for various conditions including allergic reactions, inflammatory disorders, and autoimmune diseases.',
    dosage: [
      'Initial dose: 0.5-9 mg daily',
      'Maintenance: 0.5-3 mg daily',
      'Acute conditions: 4-20 mg daily',
      'Children: 0.02-0.3 mg/kg daily',
      'Elderly: Start with lower doses',
      'Renal impairment: No adjustment needed',
    ],
    overdosage:
      'Monitor for signs of adrenal suppression, hyperglycemia, and increased susceptibility to infections. Adjust dose based on clinical response.',
    caution:
      'Use with caution in patients with diabetes, hypertension, osteoporosis, or active infections. Avoid in patients with systemic fungal infections.',
    availability: '2 mL x 5 ampoules in a box.',
    storage: 'Store at room temperature. Protect from light and heat.',
    sku: '480000004215',
    manufacturer: 'Henderson Pharmaceuticals, Inc.',
    country: 'South Korea',
    price: 32.5,
  },
  {
    id: '3',
    name: 'Painexol',
    genericName: 'tramadol hydrochloride',
    type: 'Analgesic',
    size: '1 mL x 10 Ampoules',
    description: '50mg/mL Injection for moderate to severe pain management.',
    image: '/assets/product.png',
    fdaId: 'R-XX-125',
    formulation:
      'Each ml contains: Tramadol Hydrochloride 50mg in sterile solution.',
    indications:
      'Management of moderate to moderately severe pain in adults. Post-operative pain relief and chronic pain management.',
    dosage: [
      'Adults: 50-100 mg every 4-6 hours as needed',
      'Maximum daily dose: 400 mg',
      'Elderly: Start with 25 mg every 4-6 hours',
      'Children: Not recommended under 12 years',
      'Renal impairment: Reduce dose by 50%',
      'Hepatic impairment: Use with caution',
    ],
    overdosage:
      'Symptoms include respiratory depression, seizures, and cardiovascular collapse. Administer naloxone if opioid effects present.',
    caution:
      'May cause seizures, especially in patients with epilepsy. Avoid alcohol and other CNS depressants.',
    availability: '1 mL x 10 ampoules in a box.',
    storage: 'Store at room temperature. Protect from light.',
    sku: '480000004216',
    manufacturer: 'Henderson Pharmaceuticals, Inc.',
    country: 'South Korea',
    price: 28.75,
  },
  {
    id: '4',
    name: 'Cardiolax',
    genericName: 'atenolol',
    type: 'Beta Blocker',
    size: '10 Tablets',
    description: '50mg Oral Tablets for cardiovascular conditions.',
    image: '/assets/product.png',
    fdaId: 'R-XX-126',
    formulation:
      'Each tablet contains: Atenolol 50mg in film-coated tablet form.',
    indications:
      'Treatment of hypertension, angina pectoris, and prevention of cardiovascular events.',
    dosage: [
      'Hypertension: 25-100 mg once daily',
      'Angina: 50-200 mg once daily',
      'Cardiovascular prevention: 50-100 mg once daily',
      'Elderly: Start with 25 mg daily',
      'Renal impairment: Reduce dose by 50%',
    ],
    overdosage:
      'Monitor for bradycardia, hypotension, and heart failure. Administer atropine if needed.',
    caution:
      'Use with caution in patients with asthma, heart failure, or diabetes. Do not stop abruptly.',
    availability: '10 tablets in blister pack.',
    storage: 'Store at room temperature. Keep dry.',
    sku: '480000004217',
    manufacturer: 'Henderson Pharmaceuticals, Inc.',
    country: 'South Korea',
    price: 15.99,
  },
  {
    id: '5',
    name: 'Mydrapine',
    genericName: 'atropine sulfate',
    type: 'Anticholinergic',
    size: '1 mL x 10 Ampoules',
    description: '1mg/mL Injection for various medical procedures.',
    image: '/assets/product.png',
    fdaId: 'R-XX-127',
    formulation: 'Each ml contains: Atropine Sulfate 1mg in sterile solution.',
    indications:
      'Pre-operative medication, treatment of bradycardia, and antidote for organophosphate poisoning.',
    dosage: [
      'Pre-operative: 0.4-0.6 mg IM/IV',
      'Bradycardia: 0.5-1 mg IV',
      'Antidote: 2-4 mg IV',
      'Children: 0.01-0.02 mg/kg',
      'Maximum dose: 3 mg',
    ],
    overdosage:
      'Monitor for anticholinergic effects. Administer physostigmine if severe.',
    caution:
      'Use with caution in patients with glaucoma, prostatic hypertrophy, or tachycardia.',
    availability: '1 mL x 10 ampoules in a box.',
    storage: 'Store at room temperature. Protect from light.',
    sku: '480000004218',
    manufacturer: 'Henderson Pharmaceuticals, Inc.',
    country: 'South Korea',
    price: 22.45,
  },
];

// Create the store with better performance and error handling
export const useStore = create<AppStore>()(
  persist(
    (set) => ({
      // Initial state
      products: initialProducts,
      selectedProduct: null,

      ui: {
        isSidebarOpen: false,
        isTableOpen: false,
        activeImage: 0,
        isLoading: false,
      },

      // Actions with better error handling
      setProducts: (products) => {
        try {
          set({ products });
        } catch (error) {
          console.error('Error setting products:', error);
        }
      },

      setSelectedProduct: (product) => {
        try {
          set({ selectedProduct: product });
        } catch (error) {
          console.error('Error setting selected product:', error);
        }
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
      name: 'zyre-pharma-store',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') {
          return localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      partialize: (state) => ({
        ui: state.ui,
      }),
      // Fix for Next.js SSR
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Ensure state consistency after rehydration
          if (!state.products || state.products.length === 0) {
            state.products = initialProducts;
          }
        }
      },
    }
  )
);

// Selector hooks for better performance
export const useProducts = () =>
  useStore((state) => ({
    products: state.products,
    selectedProduct: state.selectedProduct,
    setProducts: state.setProducts,
    setSelectedProduct: state.setSelectedProduct,
  }));

export const useUI = () =>
  useStore((state) => ({
    ui: state.ui,
    toggleSidebar: state.toggleSidebar,
    setTableOpen: state.setTableOpen,
    setActiveImage: state.setActiveImage,
    setLoading: state.setLoading,
  }));

export const useSelectedProduct = () =>
  useStore((state) => ({
    selectedProduct: state.selectedProduct,
    setSelectedProduct: state.setSelectedProduct,
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

// Safe selector hooks that only work after hydration
export const useSafeProducts = () => {
  const hydrated = useHydratedStore();
  const products = useStore((state) => ({
    products: state.products,
    selectedProduct: state.selectedProduct,
    setProducts: state.setProducts,
    setSelectedProduct: state.setSelectedProduct,
  }));

  if (!hydrated) {
    return {
      products: initialProducts,
      selectedProduct: null,
      setProducts: () => {},
      setSelectedProduct: () => {},
    };
  }

  return products;
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
      toggleSidebar: () => {},
      setTableOpen: () => {},
      setActiveImage: () => {},
      setLoading: () => {},
    };
  }

  return ui;
};
