'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Office, Portal, SisterCompany } from '../types';

interface FooterProps {
  offices: Office[];
  portals: Portal[];
  companies: SisterCompany[];
}

const socialLinks = [
  { name: 'Facebook', href: 'https://www.facebook.com', icon: 'facebook' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com', icon: 'linkedin' },
  { name: 'Instagram', href: 'https://www.instagram.com', icon: 'instagram' },
];

const navigationLinks = [
  { label: 'Who we are', href: '/' },
  { label: 'Our Products', href: '/products' },
  { label: 'Our Sisters', href: '/sisters' },
  { label: 'Careers', href: '/careers' },
  { label: 'Posts', href: '/posts' },
];

const legalLinks = [
  { label: 'Contact Us', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
];

const Footer: React.FC<FooterProps> = ({ offices, portals, companies }) => (
  <footer className="bg-secondary w-full flex flex-col lg:flex-row lg:items-center border">
    {/* Logo Section - Hidden on mobile, visible on lg+ */}
    <div className="hidden lg:flex items-center ml-2 xl:ml-4">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative lg:w-44 xl:w-48 aspect-square bg-white rounded-full flex flex-col justify-center items-center gap-1 p-4"
      >
        <div className="relative w-full max-w-[80px] aspect-square">
          <Image
            src={'/assets/zyre-logo.png'}
            alt="zyre-logo"
            fill
            className="object-contain"
            sizes="80px"
            priority
          />
        </div>
        <i className="block text-[10px] xl:text-[11px] font-bold text-primary text-center leading-tight">
          ZYRE PHARMACEUTICALS CORPORATION
        </i>
        <i className="block text-[10px] xl:text-[11px] font-semi-bold text-zyre-red leading-tight">
          Because Life Matters
        </i>
      </motion.div>
    </div>

    {/* Main Content */}
    <div className="w-full lg:px-6 xl:px-8">
      <div className="flex flex-col xl:flex-row justify-between gap-3 lg:gap-4 p-4 lg:p-6">
        {/* Offices Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col space-y-2"
        >
          <h4 className="font-bold uppercase text-sm lg:text-base xl:text-lg">
            Offices
          </h4>

          {offices.map((office, index) => (
            <motion.div
              key={office.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="space-y-0.5"
            >
              <Link
                href={office.mapUrl || 'https://www.google.com/maps'}
                className="text-xs lg:text-sm underline hover:text-white transition-colors"
              >
                {office.name}
              </Link>
              <div className="flex flex-col gap-1">
                <p className="text-[10px] lg:text-xs xl:text-sm max-w-md leading-tight">
                  {office.address}
                </p>
                <div className="flex flex-col gap-0">
                  {office.contact.map((contact, index) => (
                    <i
                      className="italic text-[10px] lg:text-xs leading-tight"
                      key={index}
                    >
                      {contact.type}: {contact.value}
                    </i>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex flex-col space-y-2">

          <div className="flex justify-between flex-row space-y-2">
            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="font-bold text-sm lg:text-base xl:text-lg uppercase mb-1">
                Quick Links
              </h4>
              <ul className="flex flex-col gap-0">
                {navigationLinks.map((navLink, index) => (
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-xs lg:text-sm hover:underline"
                    key={index}
                  >
                    <Link href={navLink.href}>{navLink.label}</Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Portals */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="font-bold text-sm lg:text-base xl:text-lg uppercase mb-1">
                Portals
              </h4>
              <ul className="flex flex-col gap-0">
                {portals.map((portal, index) => (
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-xs lg:text-sm hover:underline"
                    key={portal.id}
                  >
                    <Link href={portal.url}>{portal.name}</Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Companies */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="font-bold text-sm lg:text-base xl:text-lg uppercase mb-1">
              Companies
            </h4>
            <ul className="flex flex-col gap-0">
              {companies.map((company, index) => (
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-xs lg:text-sm whitespace-nowrap hover:underline"
                  key={company.id}
                >
                  <Link href={company.website || '#'}>{company.name}</Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-center border-t border-white py-3 px-4 gap-3 md:gap-0"
      >
        <div className="flex gap-3 order-2 md:order-1">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-white hover:text-primary transition-colors"
              aria-label={social.name}
            >
              {social.icon === 'facebook' && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 lg:w-6 lg:h-6"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              )}
              {social.icon === 'linkedin' && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 lg:w-6 lg:h-6"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              )}
              {social.icon === 'instagram' && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 lg:w-6 lg:h-6"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              )}
            </motion.a>
          ))}
        </div>
        <div className="flex gap-3 text-[10px] lg:text-xs order-3 md:order-3">
          {legalLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p className="text-[10px] lg:text-xs order-1 md:order-2 text-center">
          &copy; 2025 Zyre Pharmaceuticals Corporation. All Rights Reserved.
        </p>
      </motion.div>
    </div>
  </footer>
);

export default Footer;
