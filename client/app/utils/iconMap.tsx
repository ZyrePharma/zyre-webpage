/**
 * Icon Mapping Utility
 * Maps icon names from Strapi to actual React Icon components
 */

import { IconType } from 'react-icons';
import {
    MdHealthAndSafety,
    MdLocalHospital,
    MdAttachMoney,
    MdDirectionsCar,
    MdFlightTakeoff,
} from 'react-icons/md';
import { FaHandshake } from 'react-icons/fa';
import { HiCurrencyDollar } from 'react-icons/hi';
import { BsSend } from 'react-icons/bs';

// Icon mapping object
export const iconMap: Record<string, IconType> = {
    // Hero Icons
    HiCurrencyDollar,

    // Material Design Icons
    MdHealthAndSafety,
    MdLocalHospital,
    MdAttachMoney,
    MdDirectionsCar,
    MdFlightTakeoff,

    // Font Awesome Icons
    FaHandshake,

    // Bootstrap Icons
    BsSend,
};

/**
 * Get icon component by name
 * @param iconName - Name of the icon (e.g., "HiCurrencyDollar")
 * @returns Icon component or null if not found
 */
export const getIconByName = (iconName: string): IconType | null => {
    return iconMap[iconName] || null;
};

/**
 * Get all available icon names
 * @returns Array of icon names
 */
export const getAvailableIcons = (): string[] => {
    return Object.keys(iconMap);
};
