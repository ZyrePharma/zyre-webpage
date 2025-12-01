/**
 * Script to populate Business Partners data in Strapi
 * Run this after Strapi is running with: node scripts/populate-business-partners.js
 */

const businessPartners = [
    { order: 1, name: 'Myungmoon Pharma' },
    { order: 2, name: 'Zazen Pharma' },
    { order: 3, name: 'ZIM Lab' },
    { order: 4, name: 'Brawn Lab' },
    { order: 5, name: 'Daewon' },
    { order: 6, name: 'Norris Med' },
    { order: 7, name: 'Celon Labs' },
    { order: 8, name: 'Aju Pharma' },
    { order: 9, name: 'NCPC' },
    { order: 10, name: 'Scott Edil' },
    { order: 11, name: 'Aculife' },
    { order: 12, name: 'Albert David' },
];

async function populateBusinessPartners() {
    const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
    const API_TOKEN = "9a1a848ff12e58b4b96bcedd3697a310ad7b512603307105ed78a2cd7ac563bcb39456b537ec1d3349f7b6fb6e6d0759f04670404d1362f182fcfce7e8e679f7df1ab7df98f218ded5e60071c970fb640dc53f583e02bde4754b142824987f1ef985dda8e23dcccd9fa87f99fa0efd3530a87403dfe2e229e23ad0d2d5452b18";

    if (!API_TOKEN) {
        console.error('❌ Error: STRAPI_API_TOKEN environment variable is required');
        console.log('Please set it in your .env file or pass it as an environment variable');
        console.log('Example: STRAPI_API_TOKEN=your_token_here node scripts/populate-business-partners.js');
        process.exit(1);
    }

    console.log(`🚀 Starting to populate business partners to ${STRAPI_URL}...`);
    console.log(`📊 Total partners to add: ${businessPartners.length}\n`);

    let successCount = 0;
    let errorCount = 0;

    for (const partner of businessPartners) {
        try {
            const response = await fetch(`${STRAPI_URL}/api/business-partners`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_TOKEN}`,
                },
                body: JSON.stringify({
                    data: partner
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error(`❌ Failed to add "${partner.name}":`, errorData);
                errorCount++;
            } else {
                const result = await response.json();
                console.log(`✅ Added: ${partner.name} (Order: ${partner.order})`);
                successCount++;
            }
        } catch (error) {
            console.error(`❌ Error adding "${partner.name}":`, error.message);
            errorCount++;
        }
    }

    console.log('\n' + '='.repeat(50));
    console.log(`✨ Population complete!`);
    console.log(`✅ Success: ${successCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log('='.repeat(50));
}

// Run the script
populateBusinessPartners().catch(error => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
});
