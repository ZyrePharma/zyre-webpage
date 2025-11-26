import type { StrapiApp } from '@strapi/strapi/admin';
import favicon from './extensions/favicon.ico';

export default {
    config: {
        locales: [],
        auth: {
            logo: '/assets/zyre-logo.png',
        },
        menu: {
            logo: '/assets/zyre-logo.png',
        },
        head: {
            favicon: favicon,
        },
        translations: {
            en: {
                'Auth.form.welcome.title': 'Welcome to Zyre!',
                'Auth.form.welcome.subtitle': 'Log in to your Zyre account',
                'app.components.LeftMenu.navbrand.title': 'Zyre Admin',
            },
        },
    },
    bootstrap(app: StrapiApp) {
        console.log(app);

        // Function to replace Strapi branding in title
        const updateTitle = () => {
            const title = document.title;
            // Replace any occurrence of "Strapi" with "Zyre"
            if (title.includes('Strapi')) {
                document.title = title.replace(/Strapi/g, 'Zyre');
            }
        };

        // Set initial title immediately
        updateTitle();

        // Run on DOM ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', updateTitle);
        }

        // Watch for title changes using MutationObserver
        const observer = new MutationObserver(updateTitle);
        const titleElement = document.querySelector('title');

        if (titleElement) {
            observer.observe(titleElement, {
                childList: true,
                characterData: true,
                subtree: true,
            });
        }

        // Also use setInterval as a fallback to catch any missed changes
        setInterval(updateTitle, 100);
    },
};
