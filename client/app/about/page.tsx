'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaGlobe, FaHandshake, FaIndustry, FaMicroscope } from 'react-icons/fa';
import Newsletter from '../components/Newsletter';
import About from '../components/About';

interface SisterCompany {
  id: number;
  name: string;
  description: string;
  specialties: string[];
  website?: string;
  icon: React.ReactNode;
}

const AboutPage = () => {
  const sisterCompanies: SisterCompany[] = [
    {
      id: 1,
      name: 'Company One',
      description:
        'Leading innovator in pharmaceutical research and development, dedicated to discovering breakthrough treatments that improve patient outcomes worldwide.',
      specialties: ['R&D', 'Innovation', 'Technology'],
      website: 'https://example.com',
      icon: <FaIndustry className="text-4xl" />,
    },
    {
      id: 2,
      name: 'Company Two',
      description:
        'Specializing in manufacturing and distribution of high-quality pharmaceutical products, ensuring accessibility and affordability across markets.',
      specialties: ['Manufacturing', 'Distribution', 'Quality Assurance'],
      website: 'https://example.com',
      icon: <FaHandshake className="text-4xl" />,
    },
    {
      id: 3,
      name: 'Company Three',
      description:
        'Global pharmaceutical solutions provider focused on expanding healthcare reach to underserved communities through strategic partnerships and innovative approaches.',
      specialties: ['Global Solutions', 'Partnerships', 'Healthcare Access'],
      website: 'https://example.com',
      icon: <FaGlobe className="text-4xl" />,
    },
    {
      id: 4,
      name: 'Company Four',
      description:
        'Premier laboratory and quality testing services provider specializing in rigorous analytical testing, validation, and regulatory compliance for pharmaceutical products.',
      specialties: [
        'Laboratory Services',
        'Quality Testing',
        'Regulatory Compliance',
      ],
      website: 'https://example.com',
      icon: <FaMicroscope className="text-4xl" />,
    },
  ];

  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.2,
        ease: 'easeOut',
      },
    }),
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  const iconVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: (i: number) => ({
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.2 + 0.2,
        ease: 'easeOut',
      },
    }),
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <>
      {/* Company Information Section */}
      <div className="w-full bg-gradient-to-br from-primary/5 via-white to-[var(--color-blue-50)] py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-l-4 border-primary"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-primary">About </span>
              <span className="text-[var(--color-zyre-red)]">
                Zyre Pharmaceuticals
              </span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-[var(--color-zyre-red)] mb-8"></div>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Zyre Pharmaceuticals Corporation is a medical importing and
              marketing company of high quality specialty human injectables,
              oral medicines, and other specialty pharmaceutical products. The
              company has established its reputation and operation catering high
              quality cephalosporins imported from leading tie-up pharmaceutical
              manufacturing companies from countries including Korea, India,
              Thailand and China.
            </p>
          </motion.div>
        </div>
      </div>

      {/* About component with Mission, Vision, and Timeline */}
      <About />

      {/* Company History Section */}
      <div className="w-full bg-gradient-to-br from-white via-[var(--color-blue-50)] to-primary/5 py-24 md:py-32 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-primary">Our </span>
              <span className="text-[var(--color-zyre-red)]">History</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-[var(--color-zyre-red)] mx-auto"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-l-4 border-[var(--color-zyre-red)] relative overflow-hidden"
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/5 to-[var(--color-zyre-red)]/5 rounded-full blur-3xl -z-0"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[var(--color-zyre-red)]/5 to-primary/5 rounded-full blur-3xl -z-0"></div>

            <div className="relative z-10 space-y-6">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg md:text-xl text-gray-700 leading-relaxed"
              >
                <span className="font-bold text-primary">
                  Zyre Pharmaceuticals Corporation
                </span>{' '}
                is a 100% Filipino-owned pharmaceutical importing and marketing
                company of superior quality hospital-based injectable products,
                specialty drugs and medicines. The company launched its
                operations in 2003 as a single proprietorship under the entity,
                Zyre Pharmaceuticals Supply, and was later incorporated in 2007.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg md:text-xl text-gray-700 leading-relaxed"
              >
                Following its inception in 2003, the company started marketing
                and promoting anti-infection and gastroenterology products to
                targeted doctors. The company's effective marketing strategies
                and operational success paved its way to partner with
                pharmaceutical manufacturers around the globe for the
                importation of a number of finished pharmaceutical products
                distributed, marketed, and promoted throughout the entire
                Philippines for the Filipino people.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-lg md:text-xl text-gray-700 leading-relaxed"
              >
                Today,{' '}
                <span className="font-bold text-[var(--color-zyre-red)]">
                  ZYRE PHARMACEUTICALS CORPORATION
                </span>{' '}
                is in full swing and specializes in products administered as
                anti-infectives, total parenteral nutrition (TPN), anesthesia
                and for gastroenterology.
              </motion.p>

              {/* Decorative bottom accent */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="w-full h-1 bg-gradient-to-r from-primary via-[var(--color-zyre-red)] to-primary mt-8 origin-left"
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Our Sister Companies Section */}
      <div className="w-full min-h-screen bg-gradient-to-b from-[var(--color-blue-50)] to-white py-16 px-4 md:px-8">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-primary">Our Sister </span>
              <span className="text-[var(--color-zyre-red)]">Companies</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-[var(--color-zyre-red)] mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Part of a family of pharmaceutical companies dedicated to
              improving healthcare outcomes through innovation, collaboration,
              and excellence.
            </p>
          </motion.div>
        </div>

        {/* Companies Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sisterCompanies.map((company, index) => (
            <motion.div
              key={company.id}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              custom={index}
              whileHover="hover"
              className="bg-white rounded-2xl shadow-lg overflow-hidden border-4 border-primary group cursor-pointer relative flex flex-col h-full"
            >
              {/* Decorative Top Bar */}
              <div className="h-2 bg-gradient-to-r from-primary via-[var(--color-zyre-red)] to-primary"></div>

              {/* Content */}
              <div className="p-8 flex flex-col h-full flex-1">
                {/* Icon */}
                <motion.div
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  custom={index}
                  whileHover="hover"
                  className="w-20 h-20 bg-gradient-to-br from-primary to-[var(--color-zyre-red)] rounded-full flex items-center justify-center text-white mb-6 mx-auto shadow-lg"
                >
                  {company.icon}
                </motion.div>

                {/* Company Name */}
                <h3 className="text-2xl font-bold text-primary text-center mb-4">
                  {company.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  {company.description}
                </p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {company.specialties.map((specialty, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                {/* Website Link */}
                {company.website && (
                  <motion.a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full mt-auto py-3 bg-primary text-white text-center rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Visit Website
                  </motion.a>
                )}
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-[var(--color-zyre-red)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-4xl mx-auto mt-20 text-center"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border-t-4 border-[var(--color-zyre-red)]">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Together We Make a Difference
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Through our interconnected network of sister companies, we
              synergize our expertise, resources, and passion to create a
              comprehensive healthcare ecosystem that delivers exceptional value
              to patients, healthcare providers, and communities worldwide.
            </p>
          </div>
        </motion.div>

        {/* Newsletter Section */}
        <div className="max-w-4xl mx-auto mt-20 px-4">
          <Newsletter />
        </div>
      </div>
    </>
  );
};

export default AboutPage;
