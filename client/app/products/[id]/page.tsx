'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaHeart, FaShare } from 'react-icons/fa';
import Newsletter from '../../components/Newsletter';

// Dummy products data
const products = [
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
];

const ProductDetailPage = () => {
    const params = useParams();
    const productId = params.id as string;

    // Local state for UI
    const [activeImage, setActiveImage] = useState(0);
    const [isTableOpen, setIsTableOpen] = useState(false);

    // Memoize product lookup
    const product = useMemo(
        () => products.find((p) => p.id === productId),
        [productId]
    );

    // Memoize images array
    const images = useMemo(
        () => [
            product?.image || '/assets/product.png',
            '/assets/Med1.png',
            '/assets/Med2.png',
            '/assets/Med3.png',
        ],
        [product?.image]
    );

    // Memoize other products
    const otherProducts = useMemo(() => products.slice(0, 3), []);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                        Product Not Found
                    </h1>
                    <Link href="/products" className="text-primary hover:underline">
                        Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header Navigation */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex space-x-6">
                        <Link href="/" className="text-gray-600 hover:text-primary">
                            Home
                        </Link>
                        <Link href="/products" className="text-gray-600 hover:text-primary">
                            Products
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/products"
                            className="text-gray-600 hover:text-primary flex items-center space-x-2"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            <span>Back to Products</span>
                        </Link>
                        <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                            ENQUIRE
                        </button>
                    </div>
                </div>
            </div>

            {/* Breadcrumb Navigation */}
            <div className="max-w-7xl mx-auto px-6 py-4">
                <nav className="flex items-center space-x-2 text-sm text-gray-600">
                    <Link href="/" className="hover:text-primary">
                        Home
                    </Link>
                    <span>/</span>
                    <Link href="/products" className="hover:text-primary">
                        Products
                    </Link>
                    <span>/</span>
                    <span className="text-gray-800 font-medium">{product.name}</span>
                </nav>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column - Product Images & Quick Info */}
                    <div className="space-y-6">
                        {/* Main Product Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <Image
                                src={images[activeImage]}
                                alt={product.name}
                                width={500}
                                height={500}
                                className="w-full h-auto rounded-lg shadow-lg"
                            />
                        </motion.div>

                        {/* Image Thumbnails */}
                        <div className="flex space-x-4">
                            {images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveImage(index)}
                                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${activeImage === index ? 'border-primary' : 'border-gray-200'
                                        }`}
                                >
                                    <Image
                                        src={image}
                                        alt={`${product.name} view ${index + 1}`}
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <div className="flex space-x-3">
                                <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                                    <FaHeart className="w-4 h-4" />
                                    <span>Wishlist</span>
                                </button>
                                <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                                    <FaShare className="w-4 h-4" />
                                    <span>Share</span>
                                </button>
                            </div>
                        </div>

                        {/* Table of Contents */}
                        <div className="border border-gray-200 rounded-lg">
                            <button
                                onClick={() => setIsTableOpen(!isTableOpen)}
                                className="w-full bg-primary text-white py-3 px-4 rounded-lg flex items-center justify-between"
                            >
                                <span className="font-semibold">TABLE OF CONTENTS</span>
                                <svg
                                    className={`w-5 h-5 transition-transform ${isTableOpen ? 'rotate-180' : ''
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            {isTableOpen && (
                                <div className="p-4 space-y-2">
                                    <a
                                        href="#formulation"
                                        className="block text-gray-700 hover:text-primary"
                                    >
                                        Formulation
                                    </a>
                                    <a
                                        href="#indications"
                                        className="block text-gray-700 hover:text-primary"
                                    >
                                        Indications
                                    </a>
                                    <a
                                        href="#dosage"
                                        className="block text-gray-700 hover:text-primary"
                                    >
                                        Dosage & Administration
                                    </a>
                                    <a
                                        href="#overdosage"
                                        className="block text-gray-700 hover:text-primary"
                                    >
                                        Overdosage
                                    </a>
                                    <a
                                        href="#caution"
                                        className="block text-gray-700 hover:text-primary"
                                    >
                                        Caution
                                    </a>
                                    <a
                                        href="#availability"
                                        className="block text-gray-700 hover:text-primary"
                                    >
                                        Availability
                                    </a>
                                    <a
                                        href="#storage"
                                        className="block text-gray-700 hover:text-primary"
                                    >
                                        Storage
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Help Section */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-800">Help</h3>
                            <div className="space-y-2">
                                <Link
                                    href="/faqs"
                                    className="block text-gray-600 hover:text-primary"
                                >
                                    FAQ
                                </Link>
                                <Link
                                    href="/contact"
                                    className="block text-gray-600 hover:text-primary"
                                >
                                    Contact
                                </Link>
                            </div>
                        </div>

                        {/* Other Info */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-800">Other Info</h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-600">Manufacturer:</span>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                        <span className="text-gray-800">
                                            {product.manufacturer}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-600">Country:</span>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 bg-[var(--color-zyre-red)] rounded-full"></div>
                                        <span className="text-gray-800">{product.country}</span>
                                    </div>
                                </div>
                                {product.price && (
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-600">Price:</span>
                                        <span className="text-2xl font-bold text-primary">
                                            ${product.price.toFixed(2)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Product Details */}
                    <div className="space-y-8">
                        {/* Product Title */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex items-start justify-between"
                        >
                            <div>
                                <p className="text-sm text-gray-600 mb-2">
                                    {product.genericName.toUpperCase()}
                                </p>
                                <h1 className="text-4xl font-bold text-gray-800 mb-3">
                                    {product.name}
                                </h1>
                                <p className="text-gray-700 text-lg">{product.description}</p>
                            </div>
                            <div className="text-6xl font-bold text-primary opacity-20">
                                Rx
                            </div>
                        </motion.div>

                        {/* Formulation */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            id="formulation"
                            className="space-y-3"
                        >
                            <h2 className="text-2xl font-bold text-gray-800">FORMULATION</h2>
                            <p className="text-gray-700 leading-relaxed">
                                {product.formulation}
                            </p>
                        </motion.section>

                        {/* Indications */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            id="indications"
                            className="space-y-3"
                        >
                            <h2 className="text-2xl font-bold text-gray-800">INDICATIONS</h2>
                            <p className="text-gray-700 leading-relaxed">
                                {product.indications}
                            </p>
                        </motion.section>

                        {/* Dosage & Administration */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            id="dosage"
                            className="space-y-3"
                        >
                            <h2 className="text-2xl font-bold text-gray-800">
                                DOSAGE & ADMINISTRATION
                            </h2>
                            <ol className="list-decimal list-inside space-y-2 text-gray-700">
                                {product.dosage.map((item, index) => (
                                    <li key={index} className="leading-relaxed">
                                        {item}
                                    </li>
                                ))}
                            </ol>
                        </motion.section>

                        {/* Overdosage */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            id="overdosage"
                            className="space-y-3"
                        >
                            <h2 className="text-2xl font-bold text-gray-800">OVERDOSAGE</h2>
                            <p className="text-gray-700 leading-relaxed">
                                {product.overdosage}
                            </p>
                        </motion.section>

                        {/* Caution */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            id="caution"
                            className="space-y-3"
                        >
                            <h2 className="text-2xl font-bold text-gray-800">CAUTION</h2>
                            <p className="text-gray-700 leading-relaxed">{product.caution}</p>
                        </motion.section>

                        {/* Availability */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            id="availability"
                            className="space-y-3"
                        >
                            <h2 className="text-2xl font-bold text-gray-800">AVAILABILITY</h2>
                            <p className="text-gray-700 leading-relaxed">
                                {product.availability}
                            </p>
                        </motion.section>

                        {/* Storage */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.9 }}
                            id="storage"
                            className="space-y-3"
                        >
                            <h2 className="text-2xl font-bold text-gray-800">STORAGE</h2>
                            <p className="text-gray-700 leading-relaxed">{product.storage}</p>
                        </motion.section>

                        {/* SKU */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.0 }}
                            className="space-y-3"
                        >
                            <h2 className="text-2xl font-bold text-gray-800">SKU</h2>
                            <p className="text-gray-700 font-mono">{product.sku}</p>
                        </motion.section>
                    </div>
                </div>

                {/* Other Products Section */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                    className="mt-20"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                        OTHER PRODUCTS
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {otherProducts.map((prod) => (
                            <motion.div
                                key={prod.id}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-lg shadow-lg p-6 border border-gray-200"
                            >
                                <Image
                                    src={prod.image}
                                    alt={prod.name}
                                    width={200}
                                    height={200}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                                <button className="w-full bg-primary text-white py-2 rounded-lg mb-3 hover:bg-primary/90 transition-colors">
                                    ENQUIRE
                                </button>
                                <h3 className="font-semibold text-gray-800 mb-2">
                                    {prod.name}
                                </h3>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                                    {prod.description}
                                </p>
                                <Link
                                    href={`/products/${prod.id}`}
                                    className="text-primary hover:underline text-sm"
                                >
                                    Read more...
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Newsletter Section */}
                <div className="mt-20">
                    <Newsletter />
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;