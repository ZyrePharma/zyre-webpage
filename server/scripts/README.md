# Business Partners Population Script

## Quick Start

### Step 1: Get Your Strapi API Token

1. Open Strapi admin panel: http://localhost:1337/admin
2. Log in with your admin credentials
3. Go to **Settings** (⚙️ icon in sidebar) → **API Tokens**
4. Click **Create new API Token**
5. Configure:
   - **Name**: `Business Partners Script`
   - **Token duration**: `Unlimited`
   - **Token type**: `Full access` (or custom with read/write permissions for business-partners)
6. Click **Save**
7. **Copy the token immediately** (it won't be shown again!)

### Step 2: Run the Population Script

Open a terminal in the `server` directory and run:

```bash
# Windows (Command Prompt)
set STRAPI_API_TOKEN=your_token_here && node scripts/populate-business-partners.js

# Windows (PowerShell)
$env:STRAPI_API_TOKEN="your_token_here"; node scripts/populate-business-partners.js

# Linux/Mac
STRAPI_API_TOKEN=your_token_here node scripts/populate-business-partners.js
```

Replace `your_token_here` with the actual token you copied from Strapi.

### Step 3: Verify

Check the Strapi admin panel:
- Go to **Content Manager** → **Business Partners**
- You should see all 12 partners listed

Or check via API:
- Open: http://localhost:1337/api/business-partners

## What the Script Does

The script will:
- ✅ Add 12 business partners to your Strapi database
- ✅ Set the correct order for each partner
- ✅ Show progress as it adds each partner
- ✅ Display a summary at the end

## Troubleshooting

**Error: STRAPI_API_TOKEN is required**
- Make sure you set the environment variable before running the script

**Error: Unauthorized**
- Check that your API token has the correct permissions
- Make sure the token hasn't expired

**Error: Cannot connect**
- Ensure Strapi is running on http://localhost:1337
- Check that `npm run dev` is running in the server directory
