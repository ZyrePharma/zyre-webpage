# Strapi Data Export Script

This script exports data from your local Strapi instance to your production Strapi deployment.

## Prerequisites

**Node.js 18 or newer** (for native fetch and FormData support)
- Check your version: `node --version`
- If needed, update from: https://nodejs.org/

**That's it!** No external dependencies needed. 🎉

## API Tokens

You need API tokens from both local and production Strapi instances.

## Getting API Tokens

### Local Strapi Token
1. Start your local Strapi: `npm run develop`
2. Go to: http://localhost:1337/admin/settings/api-tokens
3. Click "Create new API Token"
4. Name: `Export Script`
5. Token type: `Full access`
6. Token duration: `Unlimited`
7. Copy the generated token

### Production Strapi Token
1. Go to your production Strapi admin panel
2. Navigate to Settings → API Tokens
3. Click "Create new API Token"
4. Name: `Import Script`
5. Token type: `Full access`
6. Token duration: `Unlimited`
7. Copy the generated token

## Configuration

1. Open `scripts/export-to-production.js`
2. Find the CONFIGURATION section at the top
3. Replace the placeholder values:
   ```javascript
   const LOCAL_URL = 'http://localhost:1337';
   const LOCAL_TOKEN = 'paste-your-local-token-here';

   const PROD_URL = 'https://your-production-url.railway.app';
   const PROD_TOKEN = 'paste-your-production-token-here';
   ```

## Usage

Simply run the script from the server directory:

```bash
cd server
node scripts/export-to-production.js
```

## What Gets Exported

The script exports the following content types in order:
- Products
- Hero Items
- FAQs
- Job Listings
- Offices
- Zyre Benefits
- Company Galleries
- Articles
- Newsletter Subscribers
- Contact Messages
- Job Applications

## Features

✅ **File Handling**: Automatically uploads images and files to production  
✅ **Progress Tracking**: Shows real-time progress for each content type  
✅ **Error Handling**: Continues even if some items fail  
✅ **Summary Report**: Displays detailed results at the end  
✅ **Rate Limiting**: Includes delays to avoid overwhelming the server  

## Important Notes

⚠️ **Warning**: This script will CREATE new entries in production. It does not update existing entries or check for duplicates.

💡 **Tip**: Test with a small content type first to ensure everything works correctly.

🔒 **Security**: Never commit this script with your actual API tokens. Add it to `.gitignore` if needed.

## Example Output

```
============================================================
Strapi Data Export to Production
============================================================

✓ Configuration validated
ℹ Local URL: http://localhost:1337
ℹ Production URL: https://your-strapi.railway.app

============================================================
Exporting: products
============================================================
ℹ Fetching data from local Strapi...
✓ Found 25 items
Processing 25/25...
✓ Successfully exported 25 items

============================================================
Export Summary
============================================================
✓ products: 25 success, 0 failed
✓ hero-items: 6 success, 0 failed
✓ faqs: 12 success, 0 failed
...

Total: 68 items exported successfully, 0 failed
============================================================

✓ Export completed successfully! 🎉
```

## Troubleshooting

### "Please set LOCAL_TOKEN in the script configuration"
- Make sure you've replaced `YOUR_LOCAL_STRAPI_API_TOKEN_HERE` with your actual token

### "Failed to fetch X: 401 Unauthorized"
- Your API token is invalid or has expired
- Regenerate the token and update the script

### "Failed to upload file"
- Check that your production Strapi has enough storage space
- Verify the upload plugin is properly configured

### "fetch is not defined" or "FormData is not defined"
- You need Node.js 18 or newer
- Check your version: `node --version`
- Update Node.js from https://nodejs.org/

## Support

For issues or questions, check the Strapi documentation:
- https://docs.strapi.io/dev-docs/api/rest
- https://docs.strapi.io/user-docs/settings/API-tokens
